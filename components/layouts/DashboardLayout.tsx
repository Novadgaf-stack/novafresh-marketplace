'use client';

import React, { useEffect, useState } from 'react';
import { useUser, UserRole } from '@/context/user-context';
import { Loader2, LayoutDashboard, ShoppingBag, Truck, BarChart3, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout, switchRole } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Role switching handled entirely purely in UI now
  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020408]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!user) {
    return null; // Fallback
  }

  const navLinks = [
    ...(user.role === 'customer' ? [
      { href: '/', icon: <ShoppingBag className="w-6 h-6" />, label: 'Marketplace' },
    ] : []),
    ...(user.role === 'vendor' ? [
      { href: '/vendor/dashboard', icon: <LayoutDashboard className="w-6 h-6" />, label: 'Dashboard' },
      { href: '/vendor/orders', icon: <ShoppingBag className="w-6 h-6" />, label: 'Orders' },
    ] : []),
    ...(user.role === 'admin' ? [
      { href: '/admin/dashboard', icon: <Truck className="w-6 h-6" />, label: 'Logistics' },
      { href: '/admin/analytics', icon: <BarChart3 className="w-6 h-6" />, label: 'Analytics' },
    ] : []),
  ];

  return (
    <div className="flex h-screen bg-nova-darker text-slate-300 font-sans overflow-hidden">
      {/* Sidebar Rail */}
      <aside className="w-20 bg-nova-surface border-r border-cyan-900/30 flex-col items-center py-8 gap-10 shrink-0 hidden md:flex">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] mb-4">
          <span className="text-black font-black text-xl">N</span>
        </div>
        <nav className="flex flex-col gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} title={link.label}>
                <div className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  isActive ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 'text-slate-500 hover:text-cyan-400'
                }`}>
                  {link.icon}
                </div>
              </Link>
            );
          })}
          <Link href="/settings" title="Settings" className="mt-auto">
            <div className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  pathname === '/settings' ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 'text-slate-500 hover:text-cyan-400'
                }`}>
              <Settings className="w-6 h-6" />
            </div>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header / Context Switching */}
        <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-cyan-900/10 bg-nova-darker/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              className="md:hidden text-cyan-500 hover:text-cyan-400 p-2 -ml-2 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex w-8 h-8 flex-shrink-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              <span className="text-black font-black text-sm">N</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold tracking-tight text-white flex items-center flex-wrap gap-2">
                NovaFresh Marketplace
                <span className="text-[10px] md:text-xs text-cyan-500 font-mono uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">v1.1.0</span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block mt-0.5">Infrastructure: Prime Assets Architecture</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <div className="hidden lg:flex bg-black/40 rounded-full p-1 border border-white/5">
              <button onClick={() => handleRoleSwitch('customer')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'customer' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:text-white'}`}>Customer</button>
              <button onClick={() => handleRoleSwitch('vendor')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'vendor' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:text-white'}`}>Vendor</button>
              <button onClick={() => handleRoleSwitch('admin')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'admin' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:text-white'}`}>Admin</button>
            </div>
            <div className="hidden lg:block h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3 cursor-pointer group relative">
              <Link href="/settings" className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium text-white group-hover:text-cyan-400 transition-colors">{user.email.split('@')[0]}</p>
                  <p className="text-[10px] text-cyan-500 font-mono uppercase">PRO_{user.role}_99</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 p-0.5 group-hover:border-cyan-400 transition-colors">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xs text-white uppercase group-hover:bg-slate-700 transition-colors">
                    {user.email.substring(0, 2)}
                  </div>
                </div>
              </Link>
              <button onClick={logout} className="ml-2 text-xs text-rose-400 hover:text-rose-300 font-mono" title="Terminate Session">
                [EXIT]
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-nova-darker flex flex-col relative z-0">
          {children}
        </div>

        {/* Bottom Status Bar */}
        <footer className="relative z-10 h-10 bg-nova-surface border-t border-cyan-900/20 px-6 flex items-center justify-between text-[10px] font-mono shrink-0">
          <div className="flex gap-6">
            <span className="text-cyan-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-pulse"></div> NETWORK_STATUS: ENCRYPTED</span>
            <span className="text-slate-600 hidden sm:block">DATABASE: MONGO_CLUSTER_0</span>
          </div>
          <div className="text-slate-600 flex items-center gap-4">
            <span className="hidden md:inline text-cyan-800">Engineered by Isaac Akinkunmi (Nova)</span>
            <span>© 2024 PRIME ASSETS CORP // GHOST_MODE_ACTIVE</span>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Drawer Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-nova-surface border-r border-cyan-900/30 z-50 flex flex-col py-8 px-6 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]">
               <span className="text-black font-black text-lg">N</span>
             </div>
             <span className="text-white font-bold tracking-tight">Prime Assets</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-500 hover:text-white p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsSidebarOpen(false)}>
                <div className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-cyan-500/20' : 'text-slate-400 hover:text-cyan-400 hover:bg-white/5'
                }`}>
                  {link.icon}
                  <span className="font-medium text-sm">{link.label}</span>
                </div>
              </Link>
            );
          })}
          
          <div className="mt-6 pt-6 border-t border-cyan-900/20 flex flex-col gap-2">
             <Link href="/settings" onClick={() => setIsSidebarOpen(false)}>
                <div className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                      pathname === '/settings' ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-cyan-500/20' : 'text-slate-400 hover:text-cyan-400 hover:bg-white/5'
                    }`}>
                  <Settings className="w-6 h-6" />
                  <span className="font-medium text-sm">Settings</span>
                </div>
              </Link>
          </div>
        </nav>

        <div className="pt-6 border-t border-cyan-900/20 mt-auto">
          <div className="flex items-center gap-3 relative group">
             <Link href="/settings" className="flex items-center gap-3 flex-1" onClick={() => setIsSidebarOpen(false)}>
               <div className="w-10 h-10 rounded-full border border-cyan-500/30 p-0.5 group-hover:border-cyan-400 transition-colors">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xs text-white uppercase group-hover:bg-slate-700 transition-colors">
                    {user.email.substring(0, 2)}
                  </div>
                </div>
                <div className="flex flex-col flex-1 truncate">
                  <span className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">{user.email.split('@')[0]}</span>
                  <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest">{user.role}</span>
                </div>
             </Link>
             <button onClick={() => { setIsSidebarOpen(false); logout(); }} className="text-xs text-rose-400 hover:text-rose-300 font-mono flex-shrink-0" title="Terminate Session">
                [EXIT]
             </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
