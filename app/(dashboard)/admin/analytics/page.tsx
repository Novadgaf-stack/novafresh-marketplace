export default function AdminAnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">System Analytics</h1>
        <p className="text-slate-400 mt-2 text-sm">Global market trends and platform usage.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-64 flex items-center justify-center shadow-sm hover:border-white/10 transition-colors">
            <span className="text-slate-400 text-sm font-medium">Chart data unavailable</span>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-64 flex items-center justify-center shadow-sm hover:border-white/10 transition-colors">
             <span className="text-slate-400 text-sm font-medium">Chart data unavailable</span>
        </div>
      </div>
    </div>
  );
}
