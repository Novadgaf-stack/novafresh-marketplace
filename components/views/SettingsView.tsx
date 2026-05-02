'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/user-context';
import { useToast } from '@/context/toast-context';
import { persistUserToDB } from '@/services/dbService';
import { Save, User as UserIcon, Shield, Briefcase, Camera } from 'lucide-react';

export function SettingsView() {
  const { user } = useUser();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    twoFactorEnabled: false,
    usePrimeBranding: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateUserPreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (user?.id) {
       await persistUserToDB(user.id, formData.email, formData.name, user.role as string);
    }
    
    addToast('Preferences successfully updated.', 'success');
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">System Settings</h1>
        <p className="text-slate-400 mt-2 text-sm">Manage your profile, security, and preferences.</p>
      </div>

      <form onSubmit={updateUserPreferences} className="space-y-8">
        
        {/* Profile Management */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden group">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
             <div className="p-2 bg-white/5 rounded-lg text-white">
               <UserIcon className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold text-white">Identity Profile</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-full border border-white/10 bg-black/40 flex items-center justify-center relative cursor-pointer hover:border-white/30 transition-colors overflow-hidden group/avatar">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://picsum.photos/seed/user1/200" alt="Avatar" className="w-full h-full object-cover opacity-80 group-hover/avatar:opacity-40 transition-opacity" />
                 <Camera className="w-6 h-6 text-white absolute opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
               </div>
               <div>
                  <h3 className="text-white font-medium">Profile Image</h3>
                  <p className="text-xs text-slate-500 mt-1">JPG or PNG. Max 2MB.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white/50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
             <div className="p-2 bg-white/5 rounded-lg text-white">
               <Shield className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold text-white">Access Security</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="twoFactorEnabled" checked={formData.twoFactorEnabled} onChange={handleInputChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
             <div className="p-2 bg-white/5 rounded-lg text-white">
               <Briefcase className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold text-white">Preferences</h2>
          </div>
          <div className="p-6">
             <div className="flex items-start justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-medium text-white mb-2">Premium Experience</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Enable high-fidelity animations and advanced visual features. May affect performance on older devices.
                </p>
                {formData.usePrimeBranding && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Enabled
                  </div>
                )}
              </div>
              <div className="pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="usePrimeBranding" checked={formData.usePrimeBranding} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                 <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                 Saving...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
