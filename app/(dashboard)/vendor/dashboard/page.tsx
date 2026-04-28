'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const VendorView = dynamic(
  () => import('@/components/views/VendorView').then((mod) => mod.VendorView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    ),
  }
);

export default function VendorDashboardPage() {
  return <VendorView />;
}
