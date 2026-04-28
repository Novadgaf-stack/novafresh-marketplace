export default function VendorOrdersPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Order Management</h1>
        <p className="text-slate-500 mt-1">Review and fulfill active shipments.</p>
      </div>
      <div className="bg-[#05070a] border border-cyan-900/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64">
        <span className="text-slate-500 text-sm">NO PENDING ORDERS DETECTED</span>
      </div>
    </div>
  );
}
