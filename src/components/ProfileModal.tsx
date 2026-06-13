import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building, MapPin, Hash, CheckCircle, X, Shield, 
  Sparkles, Award, Receipt, ArrowRight
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { email: string; name: string } | null;
  onUpdateUser: (newName: string) => void;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
  taxId: string;
  state: string;
  zipCode: string;
  logoUrl?: string;
}

export default function ProfileModal({ isOpen, onClose, user, onUpdateUser }: ProfileModalProps) {
  const [profile, setProfile] = useState<UserProfileData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    taxId: '',
    state: '',
    zipCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Hydrate profile data when user is loaded or modal opens
  useEffect(() => {
    if (isOpen && user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        businessName: '',
        businessAddress: '',
        taxId: '',
        state: '',
        zipCode: '',
      });

      try {
        const savedProfile = localStorage.getItem(`profile_${user.email.toLowerCase()}`);
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile);
          setProfile(prev => ({
            ...prev,
            ...parsed,
            email: user.email, // Always enforce correct email
          }));
        } else {
          // If no existing saved profile, seed it with the name from Auth state
          const seeded = {
            name: user.name,
            email: user.email,
            phone: '',
            businessName: user.name + ' Services',
            businessAddress: '',
            taxId: '',
            state: '',
            zipCode: '',
          };
          setProfile(seeded);
          localStorage.setItem(`profile_${user.email.toLowerCase()}`, JSON.stringify(seeded));
        }
      } catch (err) {
        console.error('Error hydrating profile details:', err);
      }
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setProfile(p => ({
      ...p,
      [field]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!profile.name.trim()) {
      setError('Full Name is required.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const cleanedProfile = {
          ...profile,
          name: profile.name.trim(),
          email: user.email.toLowerCase().trim(),
        };

        // Save profile
        localStorage.setItem(`profile_${user.email.toLowerCase()}`, JSON.stringify(cleanedProfile));

        // Update name in registered_users array as well
        const usersJson = localStorage.getItem('billstore_users') || '[]';
        const users = JSON.parse(usersJson) as { name: string; email: string; password?: string }[];
        const updatedUsers = users.map(u => {
          if (u.email.toLowerCase().trim() === user.email.toLowerCase().trim()) {
            return { ...u, name: profile.name.trim() };
          }
          return u;
        });
        localStorage.setItem('billstore_users', JSON.stringify(updatedUsers));

        // Inform parent of Name update for Navbar sync
        onUpdateUser(profile.name.trim());

        setLoading(false);
        setSuccess('Profile updated successfully!');
        
        setTimeout(() => {
          setSuccess('');
          onClose();
        }, 1500);

      } catch (err) {
        setLoading(false);
        setError('Failed to persist profile settings.');
        console.error(err);
      }
    }, 800);
  };

  // Compute profile progress score to excite the customer
  const getProfileProgress = () => {
    let fields = [profile.name, profile.phone, profile.businessName, profile.businessAddress, profile.taxId, profile.state, profile.zipCode];
    let filled = fields.filter(f => f && f.trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  };

  const progress = getProfileProgress();

  return (
    <div id="profile-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div id="profile-modal-content" className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all duration-300">
        
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500" />

        {/* Close Button */}
        <button
          id="profile-modal-close"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 shadow-xs">
            <User className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">My Customer Profile</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-250 uppercase tracking-wider">
                <Shield className="h-3 w-3" /> Live
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Configure your master profile parameters to auto-fill vendor and billing information instantly.
            </p>
          </div>
        </div>

        {/* Profile Progress Widget */}
        <div className="mb-6 p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-800">Profile Completion Status</span>
            </div>
            <p className="text-[10px] text-gray-550">Completeness unlocks faster checkout and dynamic auto-population.</p>
          </div>
          <div className="w-full sm:w-1/2 flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sky-400 to-sky-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-black text-sky-850 shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-650" id="profile-error">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-650 flex items-center gap-2" id="profile-success">
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            {success}
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6" id="profile-edit-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Column 1: Core Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Personal Identity
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-gray-650 mb-1">Full Customer Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    id="profile-name-input"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs font-semibold focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-650 mb-1">Account Mail (Immutable)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full rounded-xl border border-gray-100 py-2.5 pl-9 pr-4 text-xs font-semibold bg-gray-50 text-gray-400 cursor-not-allowed focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-650 mb-1">Contact Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="+91 XXXXX XXXXX / +1 XXX XXX XXXX"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs font-semibold focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Business & Settlement Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Business Settings
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-gray-650 mb-1">Business / Brand Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Building className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Acme Consulting Services"
                    value={profile.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs font-semibold focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-650 mb-1">Tax Registration ID / GSTIN / PAN</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Hash className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 29AAACZ1234A1Z5 / US-22-XXX"
                    value={profile.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs font-semibold focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-650 mb-1">State / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. California / KA"
                    value={profile.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 text-xs font-medium focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-650 mb-1">Zip / Postal Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 560045"
                    value={profile.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 px-3 text-xs font-medium focus:border-sky-500 focus:outline-hidden text-gray-900"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Master HQ Address Block */}
          <div>
            <label className="block text-[11px] font-bold text-gray-650 mb-1">Business HQ Address</label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <MapPin className="h-4 w-4" />
              </span>
              <textarea
                rows={3}
                placeholder="Full Street, Suite, City, Country"
                value={profile.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs font-medium focus:border-sky-500 focus:outline-hidden text-gray-900"
              />
            </div>
          </div>

          {/* Core Info Prompt */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-2.5 text-[11px] text-indigo-850 leading-relaxed">
            <span className="text-indigo-600 block shrink-0 select-none mt-0.5 font-bold">💡 Seamless Integration:</span>
            <span>
              By setting up your Brand profile above, you can load your company parameters with a single-click directly inside the <strong>Billing Generator</strong>, ensuring lightning-fast error-free billing!
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              id="profile-cancel-btn"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="profile-save-btn"
              disabled={loading}
              className="flex-1 h-12 rounded-xl bg-sky-400 hover:bg-sky-500 text-gray-950 text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
            >
              {loading ? 'Storing Changes...' : 'Save & Sync Details'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
