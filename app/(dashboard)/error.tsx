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
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-10 shadow-sm relative overflow-hidden">
         <div className="relative z-10 bg-white/5 p-4 rounded-full mb-6 border border-white/10">
           <AlertTriangle className="w-8 h-8 text-white" />
         </div>
         
         <h2 className="relative z-10 text-xl font-semibold tracking-tight text-white mb-3">
           Application Error
         </h2>
         <p className="relative z-10 text-sm text-slate-400 mb-8 leading-relaxed">
           {error.message || 'An unexpected error occurred while loading the dashboard.'}
         </p>
         
         <button
           onClick={() => reset()}
           className="relative z-10 flex items-center justify-center gap-2 w-full rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-slate-200 focus:outline-none transition-colors"
         >
           <RefreshCcw className="w-4 h-4" /> Try Again
         </button>
      </div>
    </div>
  );
}
