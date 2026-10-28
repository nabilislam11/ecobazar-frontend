import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import * as orderService from '../services/orderService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const paymentMethods = ['Cash on Delivery', "Aamarpay(Online Payment"];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const skipEmptyCartRedirect = useRef(false);
  const [payment, setPayment] = useState(paymentMethods[0]);

  // 🔥 Delivery Zone State 
  const [deliveryZone, setDeliveryZone] = useState('inner');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || ""
    }
  });

  // 🔥 Shipping Calculation Logic
  let shipping = 0;
  if (subtotal > 1000) {
    shipping = 0; // ১০০০ এর বেশি হলে ফ্রি
  } else {
    shipping = deliveryZone === 'inner' ? 70 : 140; // ইনার হলে ৭০, আউটার হলে ১৪০
  }

  const total = subtotal + shipping;

  // const onSubmit = async (data) => {
  //   console.log("CHECKOUT SUBMIT DATA:", data);
  //   console.log("CHECKOUT USER:", user);
  //   console.log("CHECKOUT USER ID:", user?._id || user?.id);
  //   setSubmitting(true);
  //   try {
  //     const paymentPayload = {
  //       userId: user?._id || user?.id,

  //       cus_name: `${data.firstName} ${data.lastName}`.trim(),
  //       cus_phone: data.phone,
  //       cus_email: data.email,

  //       cus_add1: data.address,
  //       cus_add2: "",
  //       cus_city: "Dhaka",
  //       cus_state: "Dhaka",
  //       cus_postcode: "1000",

  //       orderNotes: data.orderNotes || "",
  //       deliveryZone,
  //       shippingCost: shipping,
  //     };
  //     console.log("PAYMENT REQUEST STARTING...");
  //     console.log("PAYMENT PAYLOAD:", paymentPayload);
  //     const response = await api.post("/auth/payment", paymentPayload)
  //     console.log("PAYMENT RESPONSE:", response.data);
  //     if (response.data?.payment_url) {
  //       console.log("REDIRECTING TO AAMARPAY...");

  //       window.location.assign(response.data.payment_url);
  //       return;
  //     }

  //     toast.error("Payment URL was not received. Please try again.");

  //   } catch (error) {
  //     console.error("Payment initiation error:", error);
  //     toast.error('Failed to initiate payment!');
  //     setSubmitting(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const paymentPayload = {
        userId: user?._id || user?.id,

        cus_name: `${data.firstName} ${data.lastName}`.trim(),
        cus_phone: data.phone,
        cus_email: data.email,

        cus_add1: data.address,
        cus_add2: "",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",

        orderNotes: data.orderNotes || "",
        deliveryZone,
        shippingCost: shipping,
      };

      if (!paymentPayload.userId) {
        throw new Error("Please log in before placing your order.");
      }

      // 1. Cash on Delivery: create a normal order
      if (payment === "Cash on Delivery") {
        const response = await api.post(
          "/auth/orders/cod",
          paymentPayload
        );

        const result = response.data;
        const order = result?.data;

        if (!result?.success || !order?.tranId) {
          throw new Error(
            result?.message || "Could not place your COD order."
          );
        }

        // The backend has saved the order and cleared its cart.
        skipEmptyCartRedirect.current = true;
        clearCart();

        navigate(
          `/order-success?payment=cod&tranId=${encodeURIComponent(
            order.tranId
          )}`,
          { replace: true }
        );

        return;
      }

      // 2. Aamarpay: start online payment
      if (payment === "Aamarpay (Online Payment)") {
        const response = await api.post(
          "/auth/payment",
          paymentPayload
        );

        if (response.data?.payment_url) {
          window.location.assign(response.data.payment_url);
          return;
        }

        throw new Error(
          response.data?.message ||
          "Payment URL was not received. Please try again."
        );
      }

      throw new Error("Please select a valid payment method.");
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to place your order."
      );

      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!items.length) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, navigate]);

  if (!items.length) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (formErrors) => {
      console.log("CHECKOUT VALIDATION ERRORS:", formErrors);
      toast.error("Please fill in all required fields");
    })} className="container-page grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Customer Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              placeholder={user?.firstName || "First Name"}
              {...register("firstName", { required: true })}
              error={errors.firstName && "Required"}
            />
            <Input label="Last Name" {...register('lastName', { required: true })} error={errors.lastName && 'Required'} />
            <Input label="Email" type="email" {...register('email', { required: true })} error={errors.email && 'Required'} />
            <Input label="Phone" type="tel" {...register('phone', { required: true })} error={errors.phone && 'Required'} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Shipping Details</h2>
          <div className="space-y-4">
            <Input label="Full Address" {...register('address', { required: true })} error={errors.address && 'Required'} />

            {/* 🔥 Delivery Zone Options 🔥 */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Zone</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer rounded border border-gray-100 p-3 text-small w-full sm:w-auto">
                  <input
                    type="radio"
                    name="zone"
                    checked={deliveryZone === 'inner'}
                    onChange={() => setDeliveryZone('inner')}
                    className="accent-success"
                  />
                  <span>Inner Dhaka (৳70)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer rounded border border-gray-100 p-3 text-small w-full sm:w-auto">
                  <input
                    type="radio"
                    name="zone"
                    checked={deliveryZone === 'outer'}
                    onChange={() => setDeliveryZone('outer')}
                    className="accent-success"
                  />
                  <span>Outer Dhaka (৳140)</span>
                </label>
              </div>
            </div>

            {/* Optional Order Notes */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
              <textarea
                {...register('orderNotes')}
                rows="3"
                placeholder="Any special instructions for delivery?"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-success focus:outline-none focus:ring-1 focus:ring-success"
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Payment Method</h2>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((m) => (
              <label key={m} className="flex items-center gap-3 rounded border border-gray-100 p-3 text-small cursor-pointer">
                <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} className="accent-success" />
                {m}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="h-fit rounded-lg border border-gray-100 p-6 sticky top-24">
        <h2 className="mb-4 text-medium font-semibold text-gray-900">Order Summary</h2>
        <div className="max-h-60 overflow-y-auto pr-2">
          {items.map((i) => (
            <div key={i._id || i.id} className="flex justify-between py-2 text-small text-gray-700 border-b border-gray-50 last:border-0">
              <span className="truncate pr-4">{i.product?.title || i.name} × {i.quantity}</span>
              <span className="whitespace-nowrap">${((i.product?.price || i.price) * i.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-small">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping {subtotal > 1000 && <span className="text-success text-xs bg-green-50 px-2 py-0.5 rounded ml-1">Over ৳1000</span>}</span>
            <span>{shipping === 0 ? <span className="text-success font-medium">Free</span> : `৳${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3 text-medium font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
          {submitting ? 'Placing Order…' : `Place Order (৳${total.toFixed(2)})`}
        </Button>
      </div>
    </form>
  );
}