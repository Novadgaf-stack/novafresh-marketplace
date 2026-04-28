'use client';

import React from 'react';
import { Package, DollarSign, Activity } from 'lucide-react';

export function VendorView() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Vendor Control Panel</h1>
        <p className="text-slate-500 mt-1">Manage listings and track revenue metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Revenue" value="$45,231.89" icon={<DollarSign className="h-5 w-5" />} trend="+12.5%" />
        <MetricCard label="Active Listings" value="124" icon={<Package className="h-5 w-5" />} trend="+3" />
        <MetricCard label="Conversion Rate" value="3.4%" icon={<Activity className="h-5 w-5" />} trend="-0.2%" />
      </div>

      <div className="bg-[#05070a] border border-cyan-900/20 rounded-2xl overflow-hidden">
        <div className="border-b border-cyan-900/10 px-6 py-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Recent Orders</h2>
          <button className="text-xs text-cyan-500 font-medium hover:text-cyan-400 transition-colors">
            View All →
          </button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="bg-black/20 text-[10px] font-mono uppercase text-slate-500 border-b border-cyan-900/20">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-cyan-900/10 hover:bg-cyan-900/5 transition-colors last:border-0 group">
                  <td className="px-6 py-4 font-mono text-cyan-400 text-xs">#NF-{1000 + i * 42}</td>
                  <td className="px-6 py-4 text-slate-300 group-hover:text-white transition-colors">client_{i}@corp.net</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                      Fulfilled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-white">${(i * 145.5).toFixed(2)}</td>
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
     <div className="bg-[#05070a] border border-cyan-900/20 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
       <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
       <div className="flex items-center justify-between mb-2">
         <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
         <div className="text-cyan-500">{icon}</div>
       </div>
       <h2 className="text-3xl font-bold text-white">{value}</h2>
       <p className={`text-[10px] mt-2 font-mono ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
         {trend} FROM PREV_CYCLE
       </p>
     </div>
  );
}
