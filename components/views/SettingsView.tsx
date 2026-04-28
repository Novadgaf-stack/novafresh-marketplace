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
    
    // Execute simulated PUT request for persistence
    if (user?.id) {
       await persistUserToDB(user.id, formData.email, formData.name, user.role as string);
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToast('USER_PREFERENCES_SYNCED: System parameters successfully updated.', 'success');
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Preferences</h1>
        <p className="text-slate-500 mt-1">Configure identity, security, and operational settings.</p>
      </div>

      <form onSubmit={updateUserPreferences} className="space-y-8">
        
        {/* Profile Management */}
        <section className="bg-[#05070a] border border-cyan-900/20 rounded-2xl overflow-hidden group">
          <div className="px-6 py-4 border-b border-cyan-900/10 flex items-center gap-3">
             <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
               <UserIcon className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Identity Profile</h2>
          </div>
          <div className="p-6 space-y-6 bg-black/20">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-full border-2 border-cyan-500/30 bg-black/40 flex items-center justify-center relative cursor-pointer hover:border-cyan-400 transition-colors overflow-hidden group/avatar">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://picsum.photos/seed/user1/200" alt="Avatar" className="w-full h-full object-cover opacity-60 group-hover/avatar:opacity-30 transition-opacity" />
                 <Camera className="w-6 h-6 text-white absolute opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
               </div>
               <div>
                  <h3 className="text-white font-medium">Clearance Avatar</h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">JPG, PNG MAX 2MB</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-2">Display Designation</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-cyan-900/30 bg-black/40 px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-2">Comms Address (Email)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-cyan-900/30 bg-black/40 px-4 py-2.5 text-white/50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-[#05070a] border border-cyan-900/20 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-cyan-900/10 flex items-center gap-3">
             <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
               <Shield className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Access Security</h2>
          </div>
          <div className="p-6 space-y-6 bg-black/20">
            <div className="flex items-center justify-between p-4 rounded-xl border border-cyan-900/20 bg-[#05070a]">
              <div>
                <h3 className="text-sm font-medium text-white mb-0.5">Multi-Factor Authentication (MFA)</h3>
                <p className="text-[11px] text-slate-500">Require an additional cryptographic token upon initialization.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="twoFactorEnabled" checked={formData.twoFactorEnabled} onChange={handleInputChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-2">Current Cipher</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-cyan-900/30 bg-black/40 px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-2">New Cipher</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-cyan-900/30 bg-black/40 px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="bg-[#05070a] border border-cyan-900/20 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-cyan-900/10 flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
               <Briefcase className="w-4 h-4" />
             </div>
             <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Agency Branding</h2>
          </div>
          <div className="p-6 bg-black/20">
             <div className="flex items-start justify-between p-4 rounded-xl border border-cyan-900/20 bg-[#05070a]">
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-medium text-white mb-2">Prime Assets Compliance Mode</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Enforces strict visual guidelines in accordance with Prime Assets corporate identity standards. Disabling this may result in unrecognized deployment signatures.
                </p>
                {formData.usePrimeBranding && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Branding Synchronized
                  </div>
                )}
              </div>
              <div className="pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="usePrimeBranding" checked={formData.usePrimeBranding} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#020408] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                 <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                 SYNCING...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                COMMIT CHANGES
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
