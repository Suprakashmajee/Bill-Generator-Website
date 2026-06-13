import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, name: string) => void;
  initialTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in check fields.');
      return;
    }
    if (tab === 'signup' && !name) {
      setError('Please provide your name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        const usersJson = localStorage.getItem('billstore_users') || '[]';
        const users = JSON.parse(usersJson) as { name: string; email: string; password?: string }[];
        
        const lowerEmail = email.toLowerCase().trim();
        
        if (tab === 'signup') {
          const exists = users.find(u => u.email.toLowerCase() === lowerEmail);
          if (exists) {
            setError('This email is already registered. Please sign in instead.');
            setLoading(false);
            return;
          }
          
          const newUser = { name: name.trim(), email: lowerEmail, password };
          users.push(newUser);
          localStorage.setItem('billstore_users', JSON.stringify(users));
          
          // Seed master customer profile
          const initialProfile = {
            name: name.trim(),
            email: lowerEmail,
            phone: '',
            businessName: name.trim() + ' Services',
            businessAddress: '',
            taxId: '',
            state: '',
            zipCode: '',
          };
          localStorage.setItem(`profile_${lowerEmail}`, JSON.stringify(initialProfile));
          
          setLoading(false);
          setSuccess('Account created successfully! Welcome to Bill_Store.');
          setTimeout(() => {
            onSuccess(lowerEmail, name.trim());
            onClose();
          }, 1500);
          
        } else {
          // Login Flow
          const user = users.find(u => u.email.toLowerCase() === lowerEmail);
          if (!user) {
            // Standard pass-through logic for testing ease, creates account automatically if they try to log in
            const defaultName = lowerEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const newUser = { name: defaultName, email: lowerEmail, password };
            users.push(newUser);
            localStorage.setItem('billstore_users', JSON.stringify(users));
            
            // Seed profile
            const initialProfile = {
              name: defaultName,
              email: lowerEmail,
              phone: '',
              businessName: defaultName + ' Services',
              businessAddress: '',
              taxId: '',
              state: '',
              zipCode: '',
            };
            localStorage.setItem(`profile_${lowerEmail}`, JSON.stringify(initialProfile));

            setLoading(false);
            setSuccess('Welcome! Account created and logged in successfully.');
            setTimeout(() => {
              onSuccess(lowerEmail, defaultName);
              onClose();
            }, 1500);
          } else {
            if (user.password && user.password !== password) {
              setLoading(false);
              setError('Incorrect password. Please verify settings.');
              return;
            }
            
            setLoading(false);
            setSuccess('Welcome back! Logged in successfully.');
            setTimeout(() => {
              onSuccess(lowerEmail, user.name || lowerEmail.split('@')[0]);
              onClose();
            }, 1500);
          }
        }
      } catch (err) {
        setLoading(false);
        setError('Error completing login operation.');
        console.error(err);
      }
    }, 1000);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div id="auth-modal-content" className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300">
        
        {/* Close Button */}
        <button
          id="auth-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {tab === 'login' ? 'Welcome to Bill_Store' : 'Create an Account'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {tab === 'login' ? 'Generate professional bills instantly' : 'Get access to custom countries & templates free'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 mb-6" id="auth-tabs">
          <button
            id="tab-btn-login"
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
            className={`w-1/2 py-2.5 text-center font-medium text-sm border-b-2 transition-all cursor-pointer ${
              tab === 'login'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            id="tab-btn-signup"
            onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}
            className={`w-1/2 py-2.5 text-center font-medium text-sm border-b-2 transition-all cursor-pointer ${
              tab === 'signup'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign Up Free
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600" id="auth-error">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-600" id="auth-success">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  id="auth-name-input"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-sky-500 focus:outline-hidden"
                  required={tab === 'signup'}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="auth-email-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:border-sky-500 focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-600">Password</label>
              {tab === 'login' && (
                <button
                  type="button"
                  id="auth-forgot-password"
                  onClick={() => alert('Instruction email for resetting password has been dispatched!')}
                  className="text-[10px] text-sky-600 hover:underline cursor-pointer font-medium"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="auth-password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-8 text-sm focus:border-sky-500 focus:outline-hidden"
                required
              />
              <button
                type="button"
                id="auth-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            disabled={loading}
            className="w-full h-11 bg-sky-400 text-gray-950 rounded-lg hover:bg-sky-500 cursor-pointer font-bold flex items-center justify-center transition-all disabled:opacity-50 mt-6 shadow-xs"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              tab === 'login' ? 'Let\'s Go' : 'Create Free Account'
            )}
          </button>
        </form>

        {/* Mode Toggle footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="auth-mode-switch"
            onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
            className="font-bold text-sky-600 hover:underline cursor-pointer"
          >
            {tab === 'login' ? 'Sign Up Free' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
