'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const SettingsView = dynamic(
  () => import('@/components/views/SettingsView').then((mod) => mod.SettingsView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    ),
  }
);

export default function SettingsPage() {
  return <SettingsView />;
}
