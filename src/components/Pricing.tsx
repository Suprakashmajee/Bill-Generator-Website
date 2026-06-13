import React, { useState } from 'react';
import { Check, Flame, Shield, Star, CreditCard, Sparkles, X } from 'lucide-react';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; cost: string } | null>(null);
  const [paymentStep, setPaymentStep] = useState<'checkout' | 'success'>('checkout');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleBuyNow = (planName: string, planCost: string) => {
    setSelectedPlan({ name: planName, cost: planCost });
    setPaymentStep('checkout');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setPaymentStep('success');
    }, 1500);
  };

  const TIERS = [
    {
      name: "Free Tier",
      cost: "0",
      description: "Ideal for individual creators needing fast basic receipts.",
      features: [
        "Create up to 2 Bills per month",
        "Standard layout template",
        "Multi-country manual support",
        "Standard client-side storage",
        "Download vectors ready PDF"
      ],
      popular: false,
      ctaLabel: "Active Free"
    },
    {
      name: "Starter Tier",
      cost: "499",
      description: "Best for freelance experts or global developers servicing clients.",
      features: [
        "Create up to 50 Bills per month",
        "Unlock all 4 premium design templates",
        "Add custom Logo and Authorized signatures",
        "Live Indian GST automated states CGST/SGST/IGST mapping",
        "Access dynamic payment UPI QR codes",
        "Full support logs backup"
      ],
      popular: true,
      ctaLabel: "Buy Now"
    },
    {
      name: "Premium Tier",
      cost: "999",
      description: "Premium enterprise package supporting multiple merchant entities.",
      features: [
        "Create up to 101 Bills per month",
        "Complete structural layout controls",
        "Dedicated corporate ledger analytics dashboard",
        "Priority VIP server PDF rendering channels",
        "No Bill_Store brand signatures listed",
        "24/7 dedicated support representative text hotline"
      ],
      popular: false,
      ctaLabel: "Buy Now"
    }
  ];

  return (
    <section id="pricing" className="bg-gradient-to-b from-sky-50 to-white py-16 md:py-24 border-t border-sky-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Metric header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1.5 rounded-full border border-sky-250">
            Subscription pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-4 tracking-tight">
            Flexible Plans for Growing Storefronts
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-500 font-medium">
            Choose the plan that suits your client billing frequency. Save hours of manual accounting compliance with automatic regional calculations.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {TIERS.map((tier, index) => (
            <div
              key={index}
              id={`pricing-card-${index}`}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                tier.popular
                  ? 'bg-white border-2 border-sky-400 shadow-xl scale-102 z-10'
                  : 'bg-white/80 backdrop-blur-xs border-sky-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular custom indicator */}
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4.5 py-1 text-[11px] font-black tracking-widest uppercase text-white bg-gradient-to-r from-sky-650 to-sky-500 rounded-full shadow-md">
                  <Flame className="h-3.5 w-3.5 fill-white" />
                  Most Popular
                </span>
              )}

              <div>
                {/* Plan Info Heading */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-950 uppercase tracking-wide">{tier.name}</h3>
                  {tier.popular ? (
                    <Star className="h-5 w-5 text-sky-550 fill-sky-500 text-sky-550" />
                  ) : (
                    <Shield className="h-5 w-5 text-gray-300" />
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-sm font-bold text-gray-400">Rs.</span>
                  <span className="text-4xl font-black text-gray-950 tracking-tight ml-1">{tier.cost}</span>
                  <span className="text-xs text-gray-400 ml-2">/one-time purchase</span>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-100" />

                {/* Features List */}
                <ul className="space-y-3">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-650 leading-snug">
                      <div className="bg-sky-50 text-sky-600 p-0.5 rounded-md mt-0.5 shrink-0 border border-sky-100">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-semibold text-gray-700">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action purchase trigger */}
              <button
                id={`buy-plan-btn-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleBuyNow(tier.name, tier.cost)}
                className={`mt-8 w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  tier.popular
                    ? 'bg-sky-400 hover:bg-sky-500 text-gray-955 shadow-md hover:shadow-lg hover:scale-101'
                    : 'bg-gray-100 hover:bg-sky-50 text-gray-700 hover:text-sky-850'
                }`}
              >
                {tier.ctaLabel}
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Modern Checkout Simulation Modal */}
      {selectedPlan && (
        <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div id="checkout-modal-content" className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-950 to-gray-850 text-white p-6 relative">
              <button
                id="checkout-close"
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400 text-gray-950">
                  <CreditCard className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-black text-lg text-white">Secure Storefront Checkout</h3>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Upgrade details for Account plan {selectedPlan.name}</p>
            </div>

            {/* Content Wizard */}
            {paymentStep === 'checkout' ? (
              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4" id="checkout-form">
                
                {/* Order Summary details */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-500 block">Upgrade Specification:</span>
                    <strong className="text-gray-900 font-extrabold">{selectedPlan.name}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block">Executing Charge:</span>
                    <strong className="text-sm font-black text-sky-700">Rs. {selectedPlan.cost}</strong>
                  </div>
                </div>

                {selectedPlan.cost === "0" ? (
                  <div className="text-center py-6 space-y-3">
                    <Sparkles className="h-10 w-10 text-sky-500 mx-auto animate-bounce" />
                    <div>
                      <h4 className="font-bold text-gray-950">Free Tier Sign-In Required</h4>
                      <p className="text-xs text-gray-500 px-4 mt-1">Activate the Free tier immediately without submitting payment information.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wider uppercase">Name on Card</label>
                      <input
                        id="checkout-card-name"
                        type="text"
                        placeholder="John Doe"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full h-9 border border-gray-200 rounded-lg px-2.5 text-xs focus:border-sky-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wider uppercase">Card Number</label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        placeholder="4111 2288 9931 0022"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        className="w-full h-9 border border-gray-200 rounded-lg px-2.5 text-xs font-mono focus:border-sky-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wider uppercase">Expiry (MM/YY)</label>
                        <input
                          id="checkout-expiry"
                          type="text"
                          placeholder="12/28"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full h-9 border border-gray-200 rounded-lg px-2.5 text-xs font-mono focus:border-sky-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wider uppercase">Security CVV</label>
                        <input
                          id="checkout-cvv"
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full h-9 border border-gray-200 rounded-lg px-2.5 text-xs font-mono focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Upgrade Button */}
                <button
                  type="submit"
                  id="checkout-submit-btn"
                  disabled={checkoutLoading}
                  className="w-full h-11 bg-sky-400 text-gray-955 font-black rounded-xl hover:bg-sky-500 flex items-center justify-center transition disabled:opacity-50 text-xs tracking-wider uppercase"
                >
                  {checkoutLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validating Secure Bank Token...
                    </span>
                  ) : (
                    selectedPlan.cost === "0" ? 'Activate Free Plan' : `Authenticate Rs. ${selectedPlan.cost}`
                  )}
                </button>
              </form>
            ) : (
              // Success state callback page
              <div className="p-8 text-center space-y-4" id="checkout-success-view">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-7 w-7 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-gray-900">Payment Processed Successfully!</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    Your Bill_Store account is upgraded to **{selectedPlan.name}**. Custom invoice template templates and regional mapping tools are unlocked!
                  </p>
                </div>
                <button
                  id="checkout-success-close-btn"
                  onClick={() => setSelectedPlan(null)}
                  className="w-full py-3 bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
