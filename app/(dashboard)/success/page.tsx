'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [txHash] = useState(() => Math.random().toString(16).slice(2, 10).toUpperCase());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center z-10 relative">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl z-0"></div>
       
       <div className="relative z-10 flex flex-col items-center space-y-6 max-w-lg mx-auto bg-black/40 border border-cyan-900/40 p-10 rounded-2xl backdrop-blur-sm">
         <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] mb-4">
           <CheckCircle2 className="w-10 h-10 text-cyan-400" />
         </div>
         
         <h1 className="text-3xl font-bold tracking-tight text-white">Acquisition Verified</h1>
         <p className="text-slate-400">
           The asset transaction has been securely processed and committed to the Prime Assets ledger. Logistics will dispatch further instructions.
         </p>

         <div className="bg-[#05070a] border border-cyan-900/30 rounded-lg p-4 w-full mt-4 font-mono text-[10px] sm:text-xs text-left">
           <div className="flex justify-between items-center border-b border-cyan-900/30 pb-2 mb-2 text-slate-500">
             <span>TX_HASH:</span>
             <span className="text-cyan-500">0x{txHash || 'PENDING...'}...</span>
           </div>
           <div className="flex justify-between items-center text-slate-500">
             <span>NETWORK_STATUS:</span>
             <span className="text-emerald-500">CONFIRMED</span>
           </div>
         </div>

         <div className="w-full pt-6 border-t border-cyan-900/30 flex flex-col items-center gap-4">
           <p className="text-xs text-slate-500 font-mono">Redirecting to marketplace in {countdown}s...</p>
           <Link 
             href="/"
             className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
           >
             RETURN TO TERMINAL <ArrowRight className="w-4 h-4" />
           </Link>
         </div>
       </div>
    </div>
  );
}
