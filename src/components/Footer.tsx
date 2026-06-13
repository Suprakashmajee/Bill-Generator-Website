import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Receipt, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [contactMessage, setContactMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;

    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSuccess(false), 3000);
    }, 1200);
  };

  return (
    <footer id="contact-us" className="bg-gray-950 text-white pt-16 pb-12 border-t border-sky-400/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Contact Us + Quick Form top block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand + Contact details columns (5 cols width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400 text-gray-950 shadow-md">
                <Receipt className="h-5.5 w-5.5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Bill_Store<span className="text-sky-400">.</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-semibold">
              Create and download beautiful country-specific audit-ready billing proofs within 60 seconds. Our advanced client-side architecture keeps your business parameters secure and private.
            </p>

            {/* Support Credentials listed */}
            <div className="space-y-3.5 pt-2">
              <a
                href="mailto:support@billstore.com"
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-sky-400 transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sky-400 border border-gray-800 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Email Support Ticket</span>
                  <span className="font-semibold">support@billstore.com</span>
                </div>
              </a>

              <a
                href="tel:9564327643"
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-sky-400 transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sky-400 border border-gray-800 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Direct Call Hot Line</span>
                  <span className="font-semibold">+91 95643 27643</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sky-500 border border-gray-800 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Corporate Headquarters</span>
                  <span className="font-semibold text-gray-400">BTM Layout, 6th Stage, Bangalore, Karnataka, 560076</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support messaging box (7 cols width) */}
          <div className="lg:col-span-7 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/80">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-sky-400" />
              Have Questions? Contact Us Instantly
            </h4>
            <p className="text-xs text-gray-450 leading-relaxed mb-4 font-semibold">
              Fill out the message request below. Our billing specialists will review and follow up within 2 hours.
            </p>

            {contactSuccess && (
              <div className="mb-4 flex items-center gap-2 text-xs font-bold bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded-xl animate-fade-in" id="contact-success">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Message Dispatched! Thank you for contacting Bill_Store Support.</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-3" id="contact-footer-form">
              <div>
                <input
                  id="contact-email-input"
                  type="email"
                  placeholder="Your Work Email (e.g. accounting@company.com)"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full h-10 bg-gray-950 border border-gray-800 rounded-xl px-3 text-xs text-white focus:outline-hidden focus:border-sky-400"
                  required
                />
              </div>

              <div>
                <textarea
                  id="contact-message-input"
                  rows={2}
                  placeholder="Explain your regulatory compliance needs or custom invoice template requirements..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-hidden focus:border-sky-400"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={contactLoading}
                className="h-10 px-5 bg-sky-400 text-gray-955 hover:bg-sky-500 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {contactLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-gray-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Lower Links details & Copyright */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mt-12 text-xs">
          <div>
            <h5 className="font-extrabold text-white text-xs mb-3 uppercase tracking-wider">Company Info</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about-us" className="hover:text-sky-400 transition">About US</a></li>
              <li><a href="#hero" className="hover:text-sky-400 transition">Our Vision</a></li>
              <li><button onClick={() => alert('Access credentials check: Global server status online.')} className="hover:text-sky-400 transition cursor-pointer text-left">Internal Status</button></li>
              <li><button onClick={() => alert('Feature release log v2.6 unlocked inside active workspace.')} className="hover:text-sky-400 transition cursor-pointer text-left font-bold text-sky-500">Release Changelogs</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs mb-3 uppercase tracking-wider">Resources</h5>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => alert('Official corporate blog release pipeline in roadmap.')} className="hover:text-sky-400 transition cursor-pointer text-left">Blog Updates</button></li>
              <li><a href="#billing-engine" className="hover:text-sky-400 transition">Invoice Generator</a></li>
              <li><a href="#pricing" className="hover:text-sky-400 transition">Starter Pricing</a></li>
              <li><button onClick={() => alert('Help support tutorials catalog loaded.')} className="hover:text-sky-400 transition cursor-pointer text-left">Self Help Center</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs mb-3 uppercase tracking-wider">Legal Terms</h5>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => alert('Official Corporate Terms and Conditions: User assets protected locally.')} className="hover:text-sky-400 transition cursor-pointer text-left">Terms & Conditions</button></li>
              <li><button onClick={() => alert('Privacy compliance: No consumer cookies or private details cached online.')} className="hover:text-sky-400 transition cursor-pointer text-left">Privacy & Policy</button></li>
              <li><button onClick={() => alert('Commercial utilization limits align with physical region parameters.')} className="hover:text-sky-400 transition cursor-pointer text-left">Usage Policy</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-white text-xs mb-3 uppercase tracking-wider">Major Regions</h5>
            <ul className="space-y-2 text-gray-400">
              <li><span className="text-gray-500">United States (USD)</span></li>
              <li><span className="text-gray-550">India GST (INR)</span></li>
              <li><span className="text-gray-550">United Kingdom (GBP)</span></li>
              <li><span className="text-gray-550">European Union (EUR)</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright notice row */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p id="copyright-notice">© 2026 Bill_Store. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => alert('Encryption keys evaluated standard.')} className="hover:underline cursor-pointer">Local Sandbox SSL Secure</button>
            <span>|</span>
            <span>Created for Global Commerce</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
