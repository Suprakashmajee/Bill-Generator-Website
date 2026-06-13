import { ArrowRight, Globe, Shield, Sparkles } from 'lucide-react';

export default function Hero() {
  const handleScrollToGenerator = () => {
    const generator = document.getElementById('billing-engine');
    if (generator) {
      generator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
      {/* Decorative Blur Background Bulbs */}
      <div className="absolute top-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-yellow-250 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-amber-200 opacity-25 blur-3xl"></div>

      {/* Floating Tag */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 border border-yellow-300 px-4 py-1.5 text-xs font-bold text-yellow-800 mb-6 shadow-xs">
        <Sparkles className="h-4.5 w-4.5 text-yellow-600 animate-spin" style={{ animationDuration: '3s' }} />
        <span>Instant PDF Invoice Engine V2.6</span>
      </div>

      {/* Hero Headings */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-950 max-w-4xl leading-tight">
        Generate Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Invoices Globally</span>
      </h1>
      
      <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-650 max-w-2xl font-medium leading-relaxed">
        Create country-specific compliant bills for every country on Earth instantly. Fully supports US Sales Tax, UK VAT, India GST rules, UPI QR payment codes, and beautiful customizable templates.
      </p>

      {/* Primary CTA */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <button
          id="hero-cta-btn"
          onClick={handleScrollToGenerator}
          className="group flex items-center gap-2 rounded-2xl bg-gray-950 px-8 py-4 text-base font-bold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
        >
          Start Generating Free
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
        
        <a
          href="#pricing"
          className="text-sm font-bold text-gray-700 hover:text-yellow-650 transition-colors py-3 px-4 rounded-xl hover:bg-yellow-50/50"
        >
          View Pricing Plans
        </a>
      </div>

      {/* Highlight Features Metrics */}
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl px-4">
        {[
          { icon: <Globe className="h-5 w-5 text-amber-600" />, title: "Country-Specific", desc: "US Tax, India GST, UK VAT templates" },
          { icon: <Shield className="h-5 w-5 text-amber-600" />, title: "Secure & Cloud-Ready", desc: "No registration required to start" },
          { icon: <Sparkles className="h-5 w-5 text-amber-600" />, title: "Live PDF Preview", desc: "See your dynamic bill as you type" },
          { icon: <span className="text-base font-black text-amber-600">PDF</span>, title: "Instant Download", desc: "Printers & accountant friendly vector design" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white p-5 rounded-2xl border border-yellow-250/50 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 mb-3 border border-yellow-105">
              {item.icon}
            </div>
            <h3 className="font-bold text-gray-950 text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
