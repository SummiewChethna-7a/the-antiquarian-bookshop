import { XCircle } from "lucide-react";

interface Props {
  onNavigate: (page: string) => void;
}

export function CheckoutCancelPage({ onNavigate }: Props) {
  return (
    <div
      className="max-w-lg mx-auto px-4 py-20 text-center"
      data-ocid="checkout.cancel_state"
    >
      <XCircle size={64} className="text-amber-500 mx-auto mb-6" />
      <h1 className="font-serif text-3xl font-bold text-stone-800 mb-3">
        Order Cancelled
      </h1>
      <p className="text-stone-500 mb-8">
        No worries &#8212; your cart is waiting for you whenever you&#39;re
        ready.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => onNavigate("catalog")}
          className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-3 rounded-full font-serif transition-colors"
          data-ocid="checkout.browse_button"
        >
          Back to Catalog
        </button>
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="border border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-full font-serif transition-colors"
          data-ocid="checkout.home_button"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
