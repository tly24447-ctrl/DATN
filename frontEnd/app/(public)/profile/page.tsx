'use client';

import { updateUserProfileAction } from '@/src/presentation/action/user.action';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import {
  Building2,
  Camera,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  User
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const ProfilePage = () => {
  const { currUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    avatar: ''
  });

  useEffect(() => {
    if (currUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: currUser.name || '',
        email: currUser.email || '',
        phone: currUser.phone?.toString() || '',
        address: currUser.address || '',
        city: currUser.city || '',
        avatar: currUser.avatar || ''
      });
    }
  }, [currUser]);

  // --- Base64 Conversion Logic ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation: limit size to 2MB to keep Base64 strings manageable
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image must be less than 2MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, avatar: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!currUser?._id) return;

    setIsSubmitting(true);
    setMessage(null);

    const result = await updateUserProfileAction(currUser._id, {
      ...formData,
      phone: formData.phone ? Number(formData.phone) : undefined
    });

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      window.location.reload();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsSubmitting(false);
  };

  if (!currUser) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your personal information and address</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="relative group mb-4">
                {/* Change currUser?.avatar to formData.avatar */}
                {formData.avatar ? (
                  <Image
                    className="object-cover" // Removed h-full w-full as 'fill' handles this
                    src={formData.avatar}
                    alt={formData.name || 'Avatar'}
                    unoptimized // Keep this for Base64 strings
                    width={120}
                    height={120}
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200 flex items-center justify-center text-slate-500">
                    <User size={120} />
                  </div>
                )}

                {/* Hidden Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95 z-10"
                >
                  <Camera size={18} />
                </button>
              </div>

              <h2 className="font-bold text-xl text-slate-900">{formData.name || 'User'}</h2>
              <p className="text-sm text-slate-400 font-medium mb-4">{formData.email}</p>

              <div className="w-full pt-4 border-t border-slate-50">
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-2 rounded-lg">
                  {currUser.isAdmin ? 'Administrator' : 'Standard Account'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-slate-400" /> Full Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-2 opacity-60">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Email Address
                  </label>
                  <input disabled value={formData.email} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" /> Phone Number
                  </label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0123 456 789"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Building2 size={16} className="text-slate-400" /> City
                  </label>
                  <input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ho Chi Minh"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" /> Shipping Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
              </div>

              {message && (
                <div className={`mt-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                  {message.text}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  disabled={isSubmitting}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all disabled:bg-slate-300 active:scale-95 shadow-xl shadow-slate-200"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;