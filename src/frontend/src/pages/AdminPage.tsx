import { CheckCircle, Key, Settings } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function AdminPage() {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { actor } = useActor();
  const [stripeKey, setStripeKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSaveStripe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripeKey.trim() || !actor) return;
    setSaving(true);
    setError("");
    try {
      await actor.setStripeConfiguration({
        secretKey: stripeKey,
        allowedCountries: ["US", "GB", "CA", "AU", "IN", "DE", "FR"],
      });
      setSaved(true);
      setStripeKey("");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Make sure you are logged in as admin.");
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <Settings
          size={48}
          className="text-amber-400 mx-auto mb-4 opacity-60"
        />
        <h2 className="font-serif text-2xl font-bold text-stone-700 mb-2">
          Admin Access Required
        </h2>
        <p className="text-stone-500 mb-6">
          Please sign in to access the admin panel.
        </p>
        <button
          type="button"
          onClick={login}
          className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-3 rounded-full font-serif transition-colors"
          data-ocid="admin.login_button"
        >
          Sign In with Internet Identity
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10" data-ocid="admin.page">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={24} className="text-amber-700" />
        <h1 className="font-serif text-3xl font-bold text-stone-800">
          Admin Panel
        </h1>
      </div>

      {/* Stripe Configuration */}
      <div className="bg-[#FAF3E0] border border-amber-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Key size={18} className="text-amber-700" />
          <h2 className="font-serif text-xl font-semibold text-stone-800">
            Stripe Configuration
          </h2>
        </div>
        <p className="text-stone-500 text-sm mb-4">
          Enter your Stripe secret key to enable checkout functionality. Get it
          from your{" "}
          <a
            href="https://dashboard.stripe.com"
            target="_blank"
            rel="noreferrer"
            className="text-amber-700 hover:underline"
          >
            Stripe Dashboard
          </a>
          .
        </p>
        <form onSubmit={handleSaveStripe} className="space-y-4">
          <input
            type="password"
            placeholder="sk_live_... or sk_test_..."
            value={stripeKey}
            onChange={(e) => setStripeKey(e.target.value)}
            className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white text-stone-700"
            data-ocid="admin.stripe_key_input"
          />
          {error && (
            <p className="text-red-600 text-sm" data-ocid="admin.error_state">
              {error}
            </p>
          )}
          {saved && (
            <p
              className="text-emerald-700 text-sm flex items-center gap-1"
              data-ocid="admin.success_state"
            >
              <CheckCircle size={14} /> Stripe key saved successfully!
            </p>
          )}
          <button
            type="submit"
            disabled={saving || !stripeKey}
            className="bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-amber-50 px-6 py-2.5 rounded-full font-serif transition-colors"
            data-ocid="admin.add_book.submit_button"
          >
            {saving ? "Saving..." : "Save Stripe Key"}
          </button>
        </form>
      </div>
    </div>
  );
}
