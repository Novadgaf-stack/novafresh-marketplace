'use client';

import React from 'react';
import { Truck, AlertTriangle, Users } from 'lucide-react';

export function AdminView() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Logistics Command Center</h1>
        <p className="text-slate-400 mt-2 text-sm">System oversight and fulfillment monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="Pending Shipments" count={42} priority="high" />
        <StatusCard title="Active Vendors" count={89} priority="normal" />
        <StatusCard title="System Alerts" count={3} priority="critical" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
             <h3 className="text-sm font-semibold tracking-wide text-white">Fulfillment Nodes</h3>
           </div>
           <div className="space-y-4">
             {['Node Alpha (EU)', 'Node Beta (NA)', 'Node Gamma (APAC)'].map((node, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                 <span className="text-sm font-medium text-white/90">{node}</span>
                 <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                   <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                   Operational
                 </span>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-2 h-2 rounded-full bg-slate-400"></div>
             <h3 className="text-sm font-semibold tracking-wide text-white">System Logs</h3>
           </div>
           <div className="space-y-4 font-mono text-xs">
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
      case 'critical': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      case 'high': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      default: return 'text-white border-white/20 bg-white/10';
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col items-start hover:border-white/20 transition-all duration-300">
      <span className="text-sm font-medium text-slate-400 mb-6">{title}</span>
      <div className="flex items-end justify-between w-full">
         <span className="text-4xl lg:text-5xl font-semibold tracking-tight text-white">{count}</span>
         <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgeColor()}`}>
           {priority.charAt(0).toUpperCase() + priority.slice(1)}
         </span>
      </div>
    </div>
  );
}

function LogEntry({ time, event, type }: { time: string; event: string; type: 'info' | 'warning' | 'critical' }) {
  const getBorderColor = () => {
    switch (type) {
      case 'critical': return 'border-rose-500/50';
      case 'warning': return 'border-amber-400/50';
      default: return 'border-white/10';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'critical': return 'text-rose-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-slate-300';
    }
  }

  return (
    <div className={`p-3 bg-white/[0.01] border-l-2 ${getBorderColor()} hover:bg-white/[0.03] transition-colors`}>
      <p className="text-slate-500 mb-1">{time}</p>
      <p className={getTextColor()}>{event}</p>
    </div>
  );
}
