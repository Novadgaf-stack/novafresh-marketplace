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
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/5 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-slate-400 hover:text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:w-1/2 relative bg-[#111111]">
          <div className="absolute inset-0 flex items-center justify-center p-8">
             <div className="w-full relative aspect-square border border-white/5 rounded-2xl overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                <Image 
                  src={asset.image} 
                  alt={asset.name} 
                  fill
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                />
             </div>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-white/10 border border-white/5 text-white text-xs font-semibold tracking-wide rounded-full uppercase">
               {asset.category}
             </span>
             <span className="text-slate-500 font-mono text-[10px]">ID: {asset.id}</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">{asset.name}</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
            {asset.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
              <span className="text-xs text-slate-500 font-medium block mb-1">Available Stock</span>
              <span className="text-lg font-semibold text-white">{asset.inventory} Units</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
              <span className="text-xs text-slate-500 font-medium block mb-1">Rating</span>
              <span className="text-lg font-semibold text-white">{asset.rating} / 5.0</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Price</p>
              <p className="text-3xl font-semibold text-white">${asset.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => {
                onAcquire(asset);
                onClose();
              }}
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors shadow-sm active:scale-95 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
