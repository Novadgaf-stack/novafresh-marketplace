export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Analytics</h1>
        <p className="text-slate-500 mt-1">Global market trends and platform usage.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#05070a] border border-cyan-900/20 rounded-2xl p-6 h-64 flex items-center justify-center">
            <span className="text-slate-500 text-sm">CHART_DATA_UNAVAILABLE</span>
        </div>
        <div className="bg-[#05070a] border border-cyan-900/20 rounded-2xl p-6 h-64 flex items-center justify-center">
             <span className="text-slate-500 text-sm">CHART_DATA_UNAVAILABLE</span>
        </div>
      </div>
    </div>
  );
}
