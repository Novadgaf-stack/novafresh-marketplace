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
        <Loader2 className="h-8 w-8 animate-spin text-white/50" />
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
    <div className="flex h-screen bg-[#0A0A0A] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar Rail */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-white/10 flex-col py-6 shrink-0 hidden md:flex transition-all duration-300">
        <div className="px-6 flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-black font-black text-lg">N</span>
          </div>
          <span className="text-white font-semibold tracking-tight text-lg">NovaFresh</span>
        </div>
        <nav className="flex flex-col gap-2 px-4 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} title={link.label}>
                <div className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                  isActive ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 mt-auto">
          <Link href="/settings" title="Settings">
            <div className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                  pathname === '/settings' ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Settings</span>
            </div>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0A0A]">
        {/* Header / Context Switching */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              className="md:hidden text-slate-400 hover:text-white p-2 -ml-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex w-8 h-8 flex-shrink-0 bg-white rounded items-center justify-center">
              <span className="text-black font-black text-sm">N</span>
            </div>
            <h1 className="text-base md:text-lg font-medium text-white/90 truncate max-w-[200px] sm:max-w-none">
              Overview
            </h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <div className="hidden lg:flex bg-white/5 rounded-full p-1 border border-white/5">
              <button onClick={() => handleRoleSwitch('customer')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'customer' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Customer</button>
              <button onClick={() => handleRoleSwitch('vendor')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'vendor' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Vendor</button>
              <button onClick={() => handleRoleSwitch('admin')} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'admin' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Admin</button>
            </div>
            <div className="hidden lg:block h-6 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3 cursor-pointer group relative">
              <Link href="/settings" className="flex items-center gap-3 focus:outline-none rounded-full focus:ring-2 focus:ring-white/20 p-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-xs font-medium text-white shadow-sm border border-white/10 group-hover:border-white/30 transition-colors">
                  {user.email.substring(0, 2).toUpperCase()}
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto flex flex-col relative z-0">
          {children}
        </div>
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
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#111111] border-r border-white/5 z-50 flex flex-col py-6 px-4 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
               <span className="text-black font-black text-lg">N</span>
             </div>
             <span className="text-white font-semibold tracking-tight text-lg">NovaFresh</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsSidebarOpen(false)} className="w-full">
                <div className={`px-4 py-3 rounded-lg flex items-center gap-3 w-full cursor-pointer transition-colors ${
                  isActive ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Role Demo</p>
            <div className="flex flex-wrap gap-2 px-2">
              <button 
                onClick={() => { handleRoleSwitch('customer'); setIsSidebarOpen(false); }} 
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'customer' ? 'bg-white text-black' : 'text-slate-400 bg-white/5'}`}
              >
                Customer
              </button>
              <button 
                onClick={() => { handleRoleSwitch('vendor'); setIsSidebarOpen(false); }} 
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'vendor' ? 'bg-white text-black' : 'text-slate-400 bg-white/5'}`}
              >
                Vendor
              </button>
              <button 
                onClick={() => { handleRoleSwitch('admin'); setIsSidebarOpen(false); }} 
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${user.role === 'admin' ? 'bg-white text-black' : 'text-slate-400 bg-white/5'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
