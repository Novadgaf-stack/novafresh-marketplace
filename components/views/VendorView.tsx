'use client';

import React from 'react';
import { Package, DollarSign, Activity } from 'lucide-react';

export function VendorView() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Vendor Control Panel</h1>
        <p className="text-slate-400 mt-2 text-sm">Manage listings and track revenue metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Revenue" value="$45,231.89" icon={<DollarSign className="h-5 w-5" />} trend="+12.5%" />
        <MetricCard label="Active Listings" value="124" icon={<Package className="h-5 w-5" />} trend="+3" />
        <MetricCard label="Conversion Rate" value="3.4%" icon={<Activity className="h-5 w-5" />} trend="-0.2%" />
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
        <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-white">Recent Orders</h2>
          <button className="text-xs text-slate-400 font-medium hover:text-white transition-colors border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
            View All
          </button>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400 min-w-[600px]">
            <thead className="bg-white/[0.02] text-xs font-semibold text-slate-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0 group">
                  <td className="px-6 py-4 text-white text-sm font-medium">#NF-{1000 + i * 42}</td>
                  <td className="px-6 py-4 text-slate-400 group-hover:text-slate-300 transition-colors">client_{i}@corp.net</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      Fulfilled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">${(i * 145.5).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, trend }: { label: string; value: string; icon: React.ReactNode; trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
     <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all duration-300">
       <div className="flex items-center justify-between mb-4">
         <p className="text-sm font-medium text-slate-400">{label}</p>
         <div className="text-white p-2 bg-white/5 rounded-lg">{icon}</div>
       </div>
       <h2 className="text-3xl font-semibold text-white tracking-tight">{value}</h2>
       <p className={`text-sm mt-3 ${isPositive ? 'text-emerald-400' : 'text-rose-400'} flex items-center gap-1`}>
         {trend} <span className="text-slate-500">from last month</span>
       </p>
     </div>
  );
}
