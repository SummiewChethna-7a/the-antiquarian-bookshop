import { BookOpen, CheckCircle } from "lucide-react";

interface Props {
  onNavigate: (page: string) => void;
}

export function CheckoutSuccessPage({ onNavigate }: Props) {
  return (
    <div
      className="max-w-lg mx-auto px-4 py-20 text-center"
      data-ocid="checkout.success_state"
    >
      <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
      <h1 className="font-serif text-3xl font-bold text-stone-800 mb-3">
        Order Confirmed!
      </h1>
      <p className="text-stone-500 mb-2">Thank you for your purchase.</p>
      <p className="text-stone-400 text-sm mb-8">
        Your books will be on their way soon. Happy reading!
      </p>
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mx-auto bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-3 rounded-full font-serif transition-colors"
        data-ocid="checkout.continue_button"
      >
        <BookOpen size={16} /> Continue Browsing
      </button>
    </div>
  );
}
