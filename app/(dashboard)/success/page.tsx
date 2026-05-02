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
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl z-0"></div>
       
       <div className="relative z-10 flex flex-col items-center space-y-6 max-w-lg mx-auto bg-white/[0.02] border border-white/5 p-10 rounded-3xl backdrop-blur-sm">
         <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
           <CheckCircle2 className="w-10 h-10 text-white" />
         </div>
         
         <h1 className="text-3xl font-semibold tracking-tight text-white">Order Confirmed</h1>
         <p className="text-slate-400 text-sm leading-relaxed">
           Your acquisition has been securely processed and successfully recorded.
         </p>

         <div className="bg-black/40 border border-white/5 rounded-xl p-4 w-full mt-4 font-mono text-xs text-left">
           <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3 text-slate-500">
             <span>TX_HASH:</span>
             <span className="text-white">0x{txHash || 'PENDING...'}...</span>
           </div>
           <div className="flex justify-between items-center text-slate-500">
             <span>NETWORK_STATUS:</span>
             <span className="text-emerald-400">CONFIRMED</span>
           </div>
         </div>

         <div className="w-full pt-8 border-t border-white/5 flex flex-col items-center gap-6">
           <p className="text-sm text-slate-500">Redirecting to marketplace in {countdown}s...</p>
           <Link 
             href="/"
             className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-200 text-black text-sm font-semibold rounded-full transition-colors"
           >
             Continue Shopping <ArrowRight className="w-4 h-4 ml-1" />
           </Link>
         </div>
       </div>
    </div>
  );
}
