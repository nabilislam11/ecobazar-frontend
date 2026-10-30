
import { Link } from "react-router-dom";

export default function PaymentFailed() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center rounded-xl border border-gray-200 p-8 shadow-sm">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl">
                    ✕
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Payment Failed!
                </h1>

                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment could not be completed.
                    Please try again or choose another payment method.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/checkout"
                        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
                    >
                        Try Again
                    </Link>

                    <Link
                        to="/cart"
                        className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Back to Cart
                    </Link>

                    <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-green-600"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
