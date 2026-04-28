'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020408] text-slate-300 flex items-center justify-center min-h-screen p-6`}>
        <div className="max-w-md w-full bg-[#05070a] border border-cyan-900/30 p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
          <h2 className="text-xl font-bold text-white mb-4">CRITICAL SYSTEM FAILURE</h2>
          <p className="text-sm font-mono text-slate-500 mb-8 whitespace-pre-wrap">
            {error.message || "A fatal error occurred within the application runtime."}
          </p>
          <button
            onClick={() => reset()}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
          >
            REINITIALIZE KERNEL
          </button>
        </div>
      </body>
    </html>
  );
}
