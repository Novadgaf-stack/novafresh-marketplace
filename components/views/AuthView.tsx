'use client';

import React, { useState, useEffect } from 'react';
import { useUser, UserRole } from '@/context/user-context';
import { useToast } from '@/context/toast-context';
import { Store, UserCircle, ShieldAlert, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AuthView() {
  const { user, loginWithGoogle, handleEmailLogin, handleEmailRegister } = useUser();
  const { addToast } = useToast();
  const [role, setRole] = useState<UserRole>('customer');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isPasswordValid = password.length >= 6;

  useEffect(() => {
    if (user) {
      if (user.role === 'customer') {
        router.push('/marketplace');
      } else if (user.role === 'vendor') {
        router.push('/vendor/dashboard');
      } else if (user.role === 'admin') {
        router.push('/admin/dashboard');
      }
    }
  }, [user, router]);

  const handleGoogleAuth = async () => {
    if (!role) return;
    try {
      await loginWithGoogle(role);
    } catch (error: any) {
      if (error?.code === 'auth/popup-blocked') {
        addToast('Sign-in popup blocked. Please allow popups or open the app in a new tab.', 'error');
      } else {
        addToast('Google Auth failed. Please try again.', 'error');
      }
    }
  };

  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !isEmailValid || !isPasswordValid) {
       addToast('Please ensure all fields are correctly filled.', 'error');
       return;
    }

    try {
      if (isLogin) {
        await handleEmailLogin(email, password);
      } else {
        await handleEmailRegister(email, password, name, role);
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        addToast('Invalid credentials. Please verify your clearance.', 'error');
      } else if (error.code === 'auth/email-already-in-use') {
        addToast('Identity already exists in Prime Assets DB.', 'error');
      } else if (error.code === 'auth/invalid-credential') {
        addToast('Invalid credentials. Please verify your clearance.', 'error');
      } else if (error.code === 'auth/operation-not-allowed') {
        addToast('Email/Password provider is not enabled in Firebase Console. Please enable it to use this feature.', 'error');
      } else {
        addToast(error.message || 'Authentication layer failure', 'error');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020408] p-4 text-slate-300">
      <div className="w-full max-w-md rounded-2xl border border-cyan-900/20 bg-[#05070a] p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
        <div className="mb-6 text-center relative z-10">
          <div className="mx-auto mb-4 flex h-14 w-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <span className="text-2xl font-black text-black">N</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">Prime Assets Access</h2>
          <p className="text-sm text-slate-500 mt-2 font-mono uppercase tracking-wider text-[10px]">Session // Init</p>
        </div>

        <div className="flex gap-2 p-1 bg-black/40 border border-cyan-900/30 rounded-xl mb-6 relative z-10">
          <button 
             type="button"
             onClick={() => setIsLogin(true)} 
             className={`flex-1 text-xs font-mono py-2 rounded-lg transition-colors ${isLogin ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            AUTHORIZE
          </button>
          <button 
             type="button"
             onClick={() => setIsLogin(false)} 
             className={`flex-1 text-xs font-mono py-2 rounded-lg transition-colors ${!isLogin ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleEmailAuthSubmit} className="space-y-4 relative z-10">
          {!isLogin && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Designation Label</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-cyan-900/30 bg-black/40 pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                  placeholder="Isaac Akinkunmi"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Secure Comms (Email)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border bg-black/40 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 transition-colors ${email.length > 0 && !isEmailValid ? 'border-amber-500/50 focus:border-amber-500 focus:ring-amber-500' : 'border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500'}`}
                placeholder="operator@primeassets.corp"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Secure Cipher (Password)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-xl border bg-black/40 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 transition-colors ${password.length > 0 && !isPasswordValid ? 'border-amber-500/50 focus:border-amber-500 focus:ring-amber-500' : 'border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500'}`}
                placeholder="••••••••"
              />
            </div>
            {password.length > 0 && !isPasswordValid && (
              <p className="text-[10px] text-amber-500/80 mt-1 pl-1">Cipher must contain at least 6 characters.</p>
            )}
          </div>

          {!isLogin && (
            <div className="pt-2">
               <label className="block text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-3">
                Clearance Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                 <RoleCard 
                   icon={<UserCircle className="w-5 h-5 mb-2" />} 
                   label="Customer" 
                   selected={role === 'customer'} 
                   onClick={() => setRole('customer')} 
                 />
                 <RoleCard 
                   icon={<Store className="w-5 h-5 mb-2" />} 
                   label="Vendor" 
                   selected={role === 'vendor'} 
                   onClick={() => setRole('vendor')} 
                 />
                 <RoleCard 
                   icon={<ShieldAlert className="w-5 h-5 mb-2" />} 
                   label="Admin" 
                   selected={role === 'admin'} 
                   onClick={() => setRole('admin')} 
                 />
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#020408] outline-none"
            >
              {isLogin ? 'ESTABLISH CONNECTION' : 'REGISTER CLEARANCE'}
            </button>
            
            <div className="relative py-2 flex items-center">
               <div className="flex-grow border-t border-cyan-900/30"></div>
               <span className="flex-shrink-0 mx-4 text-slate-500 text-[10px] uppercase tracking-widest font-mono">OR</span>
               <div className="flex-grow border-t border-cyan-900/30"></div>
            </div>
            
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full rounded-xl bg-black/60 border border-cyan-500/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors focus:outline-none flex justify-center items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              AUTHENTICATE VIA OAUTH
            </button>
            <p className="text-[10px] text-center text-slate-500 font-mono">If popup is blocked, use Email/Password or open app in a new tab.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

function RoleCard({ icon, label, selected, onClick }: { icon: React.ReactNode; label: string; selected: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
        selected 
          ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
          : 'bg-black/40 border-cyan-900/30 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400'
      }`}
    >
      {icon}
      <span className="text-[10px] font-mono font-medium">{label}</span>
    </div>
  );
}
