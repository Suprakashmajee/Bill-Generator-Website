import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BillingEngine from './components/BillingEngine';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (tab: 'login' | 'signup') => {
    setAuthInitialTab(tab);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (email: string) => {
    setCurrentUserEmail(email);
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
  };

  return (
    <div id="app-root-wrapper" className="min-h-screen bg-[#F0F9FF] text-gray-900 selection:bg-sky-200 selection:text-sky-950 font-sans antialiased">
      
      {/* Dynamic Navigation Header */}
      <Navbar 
        userEmail={currentUserEmail} 
        onOpenAuth={handleOpenAuth} 
        onLogout={handleLogout} 
      />

      {/* Hero Welcome banner */}
      <div id="hero" className="scroll-mt-20">
        <Hero />
      </div>

      {/* Main Core Invoice Maker section block */}
      <div id="billing-engine-section" className="relative">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE] -z-10" />
        <BillingEngine />
      </div>

      {/* Brand Context block */}
      <div id="about-us-section" className="scroll-mt-16">
        <AboutUs />
      </div>

      {/* SaaS plans pricing display */}
      <div id="pricing-section" className="scroll-mt-16">
        <Pricing />
      </div>

      {/* Informational Columns & Direct Contacts */}
      <Footer />

      {/* Global Signup / Login dialog */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
        initialTab={authInitialTab}
      />

    </div>
  );
}
