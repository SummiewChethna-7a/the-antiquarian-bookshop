import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-800 mb-3">
          Contact Us
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Have a question about a book, an order, or just want to chat about
          literature? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <MapPin size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 font-serif">
                  Our Bookshop
                </p>
                <p className="text-stone-500 text-sm mt-1">
                  123 Parchment Lane
                  <br />
                  Old Quarter, Literary City
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Phone size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 font-serif">Phone</p>
                <p className="text-stone-500 text-sm mt-1">+1 (555) 012-3456</p>
                <p className="text-stone-400 text-xs">Mon–Sat, 9am–6pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Mail size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-stone-800 font-serif">Email</p>
                <p className="text-stone-500 text-sm mt-1">
                  hello@antiquarianbookshop.com
                </p>
                <p className="text-stone-400 text-xs">
                  We reply within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-amber-900/10 border border-amber-200 rounded-2xl">
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">
              Opening Hours
            </h3>
            <div className="space-y-1.5 text-sm text-stone-600">
              {[
                ["Monday – Friday", "9:00 am – 6:00 pm"],
                ["Saturday", "10:00 am – 5:00 pm"],
                ["Sunday", "Closed"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className="font-medium text-amber-800">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6">
            Send a Message
          </h2>
          {submitted ? (
            <div
              className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              data-ocid="contact.success_state"
            >
              <div className="text-4xl mb-3">📬</div>
              <h3 className="font-serif text-xl font-bold text-green-800 mb-2">
                Message Sent!
              </h3>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We'll get back to you within 24
                hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setSubmitted(false);
                }}
                className="mt-4 text-sm text-amber-700 hover:text-amber-900 underline font-serif"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.form"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-stone-700 mb-1 font-serif"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Austen"
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white"
                  data-ocid="contact.name_input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-stone-700 mb-1 font-serif"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white"
                  data-ocid="contact.email_input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-stone-700 mb-1 font-serif"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Book inquiry, order question..."
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white"
                  data-ocid="contact.subject_input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-stone-700 mb-1 font-serif"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white resize-none"
                  data-ocid="contact.message_textarea"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-600 text-white font-serif font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                data-ocid="contact.submit_button"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
