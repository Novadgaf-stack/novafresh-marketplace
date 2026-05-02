'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, TrendingUp } from 'lucide-react';
import { assetData } from '@/data/assets';
import { useToast } from '@/context/toast-context';
import { useUser } from '@/context/user-context';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { fetchAllAssetsFromDB, seedAssetsOnce } from '@/services/dbService';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

export interface Asset {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  rating: number;
  image: string;
}

export function CustomerView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Implementation of scalable tech marketplace infrastructure for Prime Assets.
        await seedAssetsOnce(assetData);
        const dbAssets = await fetchAllAssetsFromDB();
        setAssets(dbAssets as Asset[]);
      } catch (error) {
        console.error('Failed to parse asset data stream:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAcquire = (asset: Asset) => {
    addToast('Processing Transaction: Establishing secure connection...', 'info');
    setTimeout(() => {
      router.push('/success');
    }, 800);
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Marketplace</h1>
            <p className="text-slate-500 mt-1">Discover fresh assets and premium goods.</p>
           </div>
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search inventory..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full rounded-2xl border border-cyan-900/20 bg-[#05070a] py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors shadow-inner"
             />
           </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Available Assets</h3>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col h-[320px] animate-pulse">
                  <div className="h-40 w-full bg-slate-800/50 rounded-lg mb-4"></div>
                  <div className="h-5 bg-slate-800 w-3/4 rounded mb-2"></div>
                  <div className="h-3 bg-slate-800/50 w-full rounded mb-1"></div>
                  <div className="h-3 bg-slate-800/50 w-5/6 rounded mb-4"></div>
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-cyan-900/20">
                     <div className="h-4 bg-slate-800 w-16 rounded"></div>
                     <div className="h-8 bg-slate-800 w-20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="group bg-white/5 border border-white/5 rounded-xl p-4 hover:border-cyan-500/30 transition-colors relative overflow-hidden flex flex-col cursor-pointer"
                     onClick={() => {
                       setSelectedAsset(asset);
                       setIsModalOpen(true);
                     }}>
                  <div className="h-40 w-full bg-slate-800/50 rounded-lg relative overflow-hidden mb-4 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 z-20">{asset.id}</div>
                    <Image 
                       src={asset.image} 
                       alt={asset.name}
                       fill
                       unoptimized
                       className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                       referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-medium text-white mb-1">{asset.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                    {asset.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto border-t border-cyan-900/20 pt-4 relative z-20">
                    <span className="text-cyan-400 font-mono text-sm">${asset.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcquire(asset);
                      }}
                      className="text-[10px] uppercase font-bold tracking-wider bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 px-3 py-1.5 rounded transition-colors"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredAssets.length === 0 && (
                <div className="col-span-full py-20 text-center text-slate-500 font-mono border border-dashed border-cyan-900/30 rounded-xl bg-black/20">
                  NO_MATCHING_ASSETS_FOUND
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asset={selectedAsset}
        onAcquire={handleAcquire}
      />
    </>
  );
}
