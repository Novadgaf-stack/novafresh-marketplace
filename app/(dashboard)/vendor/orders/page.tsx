export default function VendorOrdersPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Order Management</h1>
        <p className="text-slate-400 mt-2 text-sm">Review and fulfill active shipments.</p>
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64 shadow-sm">
        <span className="text-slate-400 text-sm font-medium">No pending orders detected</span>
      </div>
    </div>
  );
}
