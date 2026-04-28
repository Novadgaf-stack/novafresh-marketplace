'use client';

import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Asset {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  rating: number;
  image: string;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onAcquire: (asset: Asset) => void;
}

export function QuickViewModal({ isOpen, onClose, asset, onAcquire }: QuickViewModalProps) {
  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#05070a] border border-cyan-900/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-slate-400 hover:text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:w-1/2 relative bg-black/50">
          <div className="absolute inset-0 flex items-center justify-center p-8">
             <div className="w-full relative aspect-square border border-cyan-900/30 rounded-xl overflow-hidden shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent z-10" />
                <Image 
                  src={asset.image} 
                  alt={asset.name} 
                  fill
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
             </div>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
             <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest rounded-md">
               {asset.category}
             </span>
             <span className="text-slate-500 font-mono text-[10px]">ID: {asset.id}</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{asset.name}</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {asset.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/40 border border-cyan-900/20 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">Stock Volatility</span>
              <span className="text-lg font-mono text-white">{asset.inventory} Units</span>
            </div>
            <div className="bg-black/40 border border-cyan-900/20 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">Trust Metric</span>
              <span className="text-lg font-mono text-emerald-400">{asset.rating} / 5.0</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-cyan-900/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Acquisition Cost</p>
              <p className="text-3xl font-mono text-cyan-400 font-medium">${asset.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => {
                onAcquire(asset);
                onClose();
              }}
              className="flex items-center gap-2 px-8 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Acquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
