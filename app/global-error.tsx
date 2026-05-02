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
      <body className={`${inter.className} bg-[#0A0A0A] text-slate-300 flex items-center justify-center min-h-screen p-6`}>
        <div className="max-w-md w-full bg-white/[0.02] border border-white/10 p-8 rounded-3xl text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
          <h2 className="text-xl font-semibold text-white mb-3">System Failure</h2>
          <p className="text-sm text-slate-400 mb-8 whitespace-pre-wrap leading-relaxed">
            {error.message || "A fatal error occurred within the application runtime."}
          </p>
          <button
            onClick={() => reset()}
            className="w-full bg-white hover:bg-slate-200 text-black font-medium py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  );
}
