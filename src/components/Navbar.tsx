import { Receipt, LogOut, Menu, X, UserCheck } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  userEmail: string | null;
  onOpenAuth: (tab: 'login' | 'signup') => void;
  onLogout: () => void;
}

export default function Navbar({ userEmail, onOpenAuth, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav id="app-navbar" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-200/50 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand/Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400 text-gray-950 shadow-md">
              <Receipt className="h-5.5 w-5.5" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-950">
              Bill_Store<span className="text-sky-500">.</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button id="nav-home" onClick={() => scrollToSection('hero')} className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer">
              Home
            </button>
            <button id="nav-features" onClick={() => scrollToSection('billing-engine')} className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer">
              Billing Generator
            </button>
            <button id="nav-about" onClick={() => scrollToSection('about-us')} className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer">
              About Us
            </button>
            <button id="nav-pricing" onClick={() => scrollToSection('pricing')} className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer">
              Pricing
            </button>
            <button id="nav-contact" onClick={() => scrollToSection('contact-us')} className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer">
              Contact
            </button>
          </div>

          {/* Desktop Right Side Auth Controls */}
          <div className="hidden md:flex items-center gap-4">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-sky-100 border border-sky-200 text-sky-800 px-3 py-1.5 rounded-full">
                  <UserCheck className="h-3.5 w-3.5" />
                  {userEmail}
                </span>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-bold text-gray-700 hover:text-sky-600 transition-colors cursor-pointer px-3 py-2"
                >
                  Log In
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-bold text-gray-950 transition-all hover:bg-sky-500 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Sign UP Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-3">
            {userEmail && (
              <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-200 max-w-[120px] truncate">
                {userEmail}
              </span>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-navbar-panel" className="absolute top-16 left-0 w-full bg-white border-b border-sky-200 px-4 py-6 shadow-xl space-y-4 md:hidden">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToSection('hero')} className="text-left py-2 font-bold text-gray-800 hover:text-sky-600">Home</button>
            <button onClick={() => scrollToSection('billing-engine')} className="text-left py-2 font-bold text-gray-800 hover:text-sky-600">Billing Generator</button>
            <button onClick={() => scrollToSection('about-us')} className="text-left py-2 font-bold text-gray-800 hover:text-sky-600">About Us</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left py-2 font-bold text-gray-800 hover:text-sky-600">Pricing</button>
            <button onClick={() => scrollToSection('contact-us')} className="text-left py-2 font-bold text-gray-800 hover:text-sky-600">Contact</button>
          </div>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-3 py-2">
            {userEmail ? (
              <button
                id="mobile-logout"
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-center text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : (
              <>
                <button
                  id="mobile-login"
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-55"
                >
                  Log In
                </button>
                <button
                  id="mobile-signup"
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full rounded-xl bg-sky-400 py-2.5 text-center text-sm font-bold text-gray-955 hover:bg-sky-500 shadow-xs"
                >
                  Sign UP Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
