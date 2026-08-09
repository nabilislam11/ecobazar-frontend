import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import * as orderService from '../services/orderService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const paymentMethods = ['Cash on Delivery', 'PayPal', 'Amazon Pay'];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  const onSubmit = async (data) => {
    setSubmitting(true);
    const order = await orderService.createOrder({
      customer: `${data.firstName} ${data.lastName}`,
      total,
      items: items.map((i) => ({ productId: i.id, name: i.name, price: i.price, quantity: i.quantity, subtotal: i.price * i.quantity })),
      shipping: { name: `${data.firstName} ${data.lastName}`, address: data.address, email: data.email, phone: data.phone },
      paymentMethod: payment,
    });
    clearCart();
    setSubmitting(false);
    toast.success('Order placed!');
    navigate('/order-success', { state: { orderId: order.id } });
  };

  if (!items.length) {
    navigate('/cart');
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-page grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Customer Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="First Name" {...register('firstName', { required: true })} error={errors.firstName && 'Required'} />
            <Input label="Last Name" {...register('lastName', { required: true })} error={errors.lastName && 'Required'} />
            <Input label="Email" type="email" {...register('email', { required: true })} error={errors.email && 'Required'} />
            <Input label="Phone" {...register('phone', { required: true })} error={errors.phone && 'Required'} />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Shipping Address</h2>
          <Input label="Address" {...register('address', { required: true })} error={errors.address && 'Required'} />
        </div>
        <div>
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Payment Method</h2>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((m) => (
              <label key={m} className="flex items-center gap-3 rounded border border-gray-100 p-3 text-small">
                <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} className="accent-success" />
                {m}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="h-fit rounded-lg border border-gray-100 p-6">
        <h2 className="mb-4 text-medium font-semibold text-gray-900">Order Summary</h2>
        {items.map((i) => (
          <div key={i.id} className="flex justify-between py-1.5 text-small text-gray-700">
            <span>{i.name} × {i.quantity}</span>
            <span>${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-small">
          <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-700"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between border-t border-gray-100 pt-2 text-medium font-semibold text-gray-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
        <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
          {submitting ? 'Placing Order…' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
}
