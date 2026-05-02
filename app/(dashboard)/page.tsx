'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const CustomerView = dynamic(
  () => import('@/components/views/CustomerView').then((mod) => mod.CustomerView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    ),
  }
);

export default function MarketplacePage() {
  return <CustomerView />;
}
