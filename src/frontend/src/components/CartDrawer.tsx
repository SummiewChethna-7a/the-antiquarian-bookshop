import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const { actor } = useActor();

  const handleCheckout = async () => {
    if (items.length === 0 || !actor) return;
    try {
      const shoppingItems = items.map((item) => ({
        productName: item.book.title,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.book.price * 100)),
        productDescription: item.book.author,
      }));
      const successUrl = `${window.location.origin}/#/checkout/success`;
      const cancelUrl = `${window.location.origin}/#/checkout/cancel`;
      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );
      clearCart();
      window.location.href = sessionUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      alert(
        "Checkout unavailable. Please configure Stripe in the admin panel.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close cart"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FAF3E0] shadow-2xl z-50 flex flex-col"
        data-ocid="cart.panel"
      >
        <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-amber-900">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-200" />
            <h2 className="font-serif text-lg font-bold text-amber-50">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            className="text-amber-200 hover:text-white p-1"
            onClick={() => setIsOpen(false)}
            data-ocid="cart.close_button"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-3 text-stone-500"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag size={48} className="opacity-30" />
            <p className="font-serif text-lg">Your cart is empty</p>
            <p className="text-sm text-stone-400">
              Add some books to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.book.id}
                  className="flex gap-3 bg-white/60 rounded-lg p-3 border border-amber-100"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-12 h-16 object-cover rounded shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-semibold text-stone-800 leading-tight line-clamp-2">
                      {item.book.title}
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      {item.book.author}
                    </p>
                    <p className="text-sm font-bold text-amber-900 mt-1">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-amber-300 hover:bg-amber-100 text-stone-700"
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity - 1)
                        }
                        data-ocid={`cart.quantity_minus.${idx + 1}`}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-medium text-stone-700 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-amber-300 hover:bg-amber-100 text-stone-700"
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity + 1)
                        }
                        data-ocid={`cart.quantity_plus.${idx + 1}`}
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-red-600 hover:text-red-800"
                        onClick={() => removeFromCart(item.book.id)}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 p-4 bg-amber-50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-base text-stone-700">
                  Subtotal
                </span>
                <span className="font-serif text-xl font-bold text-amber-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="w-full bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold py-3 rounded-lg transition-colors font-serif text-base"
                onClick={handleCheckout}
                data-ocid="cart.checkout_button"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
