'use client';

import React from 'react';
import { Truck, AlertTriangle, Users } from 'lucide-react';

export function AdminView() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Logistics Command Center</h1>
        <p className="text-slate-500 mt-1">System oversight and fulfillment monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="Pending Shipments" count={42} priority="high" />
        <StatusCard title="Active Vendors" count={89} priority="normal" />
        <StatusCard title="System Alerts" count={3} priority="critical" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#05070a] border border-cyan-900/20 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
             <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Fulfillment Nodes</h3>
           </div>
           <div className="space-y-4">
             {['Node Alpha (EU)', 'Node Beta (NA)', 'Node Gamma (APAC)'].map((node, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/20 hover:border-cyan-500/20 transition-colors">
                 <span className="text-sm font-medium text-white">{node}</span>
                 <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                   <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                   OPERATIONAL
                 </span>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-[#05070a] border border-cyan-900/20 p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-2 h-2 rounded-full bg-amber-500"></div>
             <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">System Logs</h3>
           </div>
           <div className="space-y-4 font-mono text-[11px]">
             <LogEntry time="10:42:04" event="RATE_LIMIT: Vendor [V-992] exceeded allowance." type="warning" />
             <LogEntry time="09:15:55" event="BATCH_JOB: Automated payout sync completed." type="info" />
             <LogEntry time="08:00:12" event="SYSTEM_CHECK: Block storage integrity verified." type="info" />
             <LogEntry time="04:22:01" event="AUTH_FAIL: Unauthorized cluster access attempt." type="critical" />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, count, priority }: { title: string; count: number; priority: 'normal' | 'high' | 'critical' }) {
  const getBadgeColor = () => {
    switch (priority) {
      case 'critical': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'high': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default: return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    }
  };

  return (
    <div className="bg-[#05070a] border border-cyan-900/20 p-6 rounded-2xl flex flex-col items-start relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{title}</span>
      <div className="flex items-end justify-between w-full">
         <span className="text-3xl font-bold text-white">{count}</span>
         <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getBadgeColor()}`}>
           {priority.toUpperCase()}
         </span>
      </div>
    </div>
  );
}

function LogEntry({ time, event, type }: { time: string; event: string; type: 'info' | 'warning' | 'critical' }) {
  const getBorderColor = () => {
    switch (type) {
      case 'critical': return 'border-rose-500';
      case 'warning': return 'border-amber-400';
      default: return 'border-slate-700';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'critical': return 'text-rose-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-white';
    }
  }

  return (
    <div className={`p-3 bg-black/30 border-l-2 ${getBorderColor()} hover:bg-black/50 transition-colors`}>
      <p className="text-slate-500 mb-1">{time}</p>
      <p className={getTextColor()}>{event}</p>
    </div>
  );
}
