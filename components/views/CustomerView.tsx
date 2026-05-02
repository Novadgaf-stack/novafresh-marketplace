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

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
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
    addToast('Processing order securely...', 'info');
    setTimeout(() => {
      router.push('/success');
    }, 200); // Shorter timeout for much snappier feel
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Marketplace</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">Discover premium goods and elegant lifestyle assets.</p>
           </div>
           <div className="relative w-full md:max-w-md shrink-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search collection..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 hover:border-white/20 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all shadow-sm"
             />
           </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400 border-b border-white/5 w-full pb-3 uppercase">Featured Collection</h3>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col h-[340px] animate-pulse">
                  <div className="h-44 w-full bg-slate-800/50 rounded-xl mb-6"></div>
                  <div className="h-5 bg-slate-800/80 w-3/4 rounded mb-3"></div>
                  <div className="h-4 bg-slate-800/50 w-full rounded mb-2"></div>
                  <div className="h-4 bg-slate-800/50 w-5/6 rounded mb-auto"></div>
                  <div className="flex justify-between items-center pt-5 mt-4 border-t border-white/5">
                     <div className="h-5 bg-slate-800 w-16 rounded"></div>
                     <div className="h-8 bg-slate-800 w-24 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col cursor-pointer"
                     onClick={() => {
                       setSelectedAsset(asset);
                       setIsModalOpen(true);
                     }}>
                  <div className="h-48 sm:h-44 w-full bg-[#111] rounded-xl relative overflow-hidden mb-5 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300"></div>
                    <Image 
                       src={asset.image} 
                       alt={asset.name}
                       fill
                       unoptimized
                       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
                       referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h4 className="font-semibold text-white/90 text-base mb-1.5">{asset.name}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
                      {asset.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <span className="text-white font-medium">${asset.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcquire(asset);
                        }}
                        className="text-xs font-semibold bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-full transition-colors shadow-sm"
                      >
                        Acquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAssets.length === 0 && (
                <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <p className="text-slate-400 font-medium">No items found matching your criteria</p>
                  <button onClick={() => setSearchQuery('')} className="mt-4 text-sm text-white hover:underline focus:outline-none">Clear search</button>
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
