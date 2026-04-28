'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Marketplace Infrastructure Error:', error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-nova-darker p-6 text-center">
      <div className="flex flex-col items-center max-w-md bg-nova-surface border border-cyan-900/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl z-0"></div>
         
         <div className="relative z-10 bg-rose-500/20 p-4 rounded-full mb-6 border border-rose-500/50">
           <AlertTriangle className="w-8 h-8 text-rose-500" />
         </div>
         
         <h2 className="relative z-10 text-xl font-bold tracking-tight text-white mb-2">
           Terminal Error
         </h2>
         <p className="relative z-10 text-sm text-slate-400 mb-8 font-mono">
           {error.message || 'Failed to sync with Prime Assets database nodes.'}
         </p>
         
         <button
           onClick={() => reset()}
           className="relative z-10 flex items-center justify-center gap-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus:outline-none transition-colors"
         >
           <RefreshCcw className="w-4 h-4" /> REBOOT SUBROUTINE
         </button>
      </div>
    </div>
  );
}
