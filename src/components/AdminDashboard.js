// LSGD Admin Dashboard - Eco-Smart Kerala

const { useState } = React;
import LeafletMapView from './LeafletMapView.js';
import GeneticAlgorithmModal from './GeneticAlgorithmModal.js';
import { LSGD_METRICS } from '../data/mockData.js';

export default function AdminDashboard({
  bins,
  depot,
  households,
  payments,
  grievances,
  activeRoute,
  onApplyRoute,
  onClearRoute,
  onEmptyBin,
  onResolveGrievance,
  onShowToast
}) {
  const [showGAModal, setShowGAModal] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [selectedWard, setSelectedWard] = useState('All Wards');

  // Compute live metrics from current state
  const redBins = bins.filter(b => b.status === 'red');
  const hazardBins = bins.filter(b => b.status === 'hazard');
  const yellowBins = bins.filter(b => b.status === 'yellow');
  const greenBins = bins.filter(b => b.status === 'green');

  const totalFeeRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0) + LSGD_METRICS.userFeeCollectedMonth;
  const totalWasteTodayKg = households
    .filter(h => h.attendanceStatus === 'Collected' && h.segregatedLog)
    .reduce((acc, h) => {
      const s = h.segregatedLog;
      return acc + (s.wetKg + s.plasticKg + s.glassKg + s.eWasteKg);
    }, 18400); // 18.4 tonnes baseline in kg

  return (
    <div className="space-y-6 pb-12">
      {/* LSGD Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-800/60 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-200">
              <span>🏛️ Local Self Government Department (LSGD)</span> • <span>Suchitwa Mission</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Smart Waste Command & AI Routing Center
            </h1>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl">
              Real-time IoT telemetry, Haritha Karma Sena field supervision, and Genetic Algorithm vehicle route optimization for Kozhikode Municipal Corporation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowGAModal(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>⚡ Calculate GA Collection Route</span>
            </button>
            {activeRoute && (
              <button
                onClick={onClearRoute}
                className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs border border-white/20 transition"
              >
                Clear Route
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Waste Collected */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Waste Today</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              ⚖️
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {(totalWasteTodayKg / 1000).toFixed(1)} <span className="text-xs font-medium text-slate-500">Tonnes</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ +8.4%</span>
            <span className="text-slate-400 font-normal">vs daily target</span>
          </div>
        </div>

        {/* Smart Bin Status */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">IoT Smart Bins</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
              📡
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {bins.length} <span className="text-xs font-medium text-slate-500">Total</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{redBins.length} Red</span>
            <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">{hazardBins.length} Hazard</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{greenBins.length} Normal</span>
          </div>
        </div>

        {/* HKS Workforce */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">HKS Field Workforce</span>
            <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
              👷‍♀️
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {LSGD_METRICS.activeHKSWorkers} <span className="text-xs font-medium text-slate-500">Active</span>
          </div>
          <div className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <span>✓ 94.2%</span>
            <span className="text-slate-400 font-normal">Doorstep coverage</span>
          </div>
        </div>

        {/* User Fee Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">User Fee Revenue</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              🪙
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(totalFeeRevenue / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
            <span>✓ 100% digital</span>
            <span className="text-slate-400 font-normal">Direct to Sena</span>
          </div>
        </div>

        {/* Carbon Offset */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Carbon Offset</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              🍃
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {LSGD_METRICS.carbonOffsetKg} <span className="text-xs font-medium text-slate-500">kg CO₂e</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>🌿 Net Positive</span>
            <span className="text-slate-400 font-normal">Kerala Green Fund</span>
          </div>
        </div>
      </div>

      {/* GA Active Route Highlight Bar */}
      {activeRoute && (
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-emerald-900 text-white p-5 rounded-3xl shadow-lg border border-indigo-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
              🚚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base">Active GA Optimized Collection Route Dispatched</h4>
                <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                  -{activeRoute.savingsPercent}% Distance Cut
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Connecting Central MCF Depot ➔ {activeRoute.optimizedStops.length} High-Priority Smart Bins ➔ MCF Return ({activeRoute.optimizedDistanceKm} km total)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="opacity-75">Fuel Saved:</span> <strong className="text-emerald-300">{activeRoute.fuelSavedLiters} Liters</strong>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="opacity-75">CO₂ Cut:</span> <strong className="text-emerald-300">{activeRoute.co2SavedKg} kg</strong>
            </div>
            <button
              onClick={() => setShowGAModal(true)}
              className="px-4 py-2 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition"
            >
              Re-optimize
            </button>
          </div>
        </div>
      )}

      {/* Live Map & Telemetry Control Center */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">Corporation Smart Bin IoT Telemetry & Routing Map</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Live Sensor Mesh
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive map displaying bin fill levels (Green, Yellow, Red, Hazard) with active truck routing overlay.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Bins' },
                { id: 'red', label: `🚨 Critical (${redBins.length})` },
                { id: 'hazard', label: `☣️ Hazard (${hazardBins.length})` },
                { id: 'yellow', label: `⚠️ Yellow (${yellowBins.length})` },
                { id: 'green', label: `🟢 Green (${greenBins.length})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMapFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    mapFilter === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGAModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <span>🧬 Genetic Algorithm Route</span>
            </button>
          </div>
        </div>

        {/* Leaflet Map */}
        <LeafletMapView
          bins={bins}
          depot={depot}
          activeRoute={activeRoute}
          filterStatus={mapFilter}
          selectedBinId={selectedBinId}
          onSelectBin={(id) => setSelectedBinId(id)}
          onEmptyBin={onEmptyBin}
          height="520px"
          showRoute={true}
        />
      </div>

      {/* Smart Bins Telemetry Table & Ward Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Bins Telemetry Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">IoT Smart Bin Live Telemetry Table</h3>
              <p className="text-xs text-slate-500">Ultrasonic fill sensors, weight load cells, and LoRaWAN connectivity</p>
            </div>
            <span className="text-xs font-bold text-slate-500">{bins.length} Sensors Online</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Bin ID / Location</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Fill Level</th>
                  <th className="p-3">Battery / Sensor</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bins.map(bin => (
                  <tr key={bin.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          bin.status === 'green' ? 'bg-emerald-500' :
                          bin.status === 'yellow' ? 'bg-amber-500' :
                          bin.status === 'red' ? 'bg-red-600 animate-pulse' :
                          'bg-purple-700'
                        }`}></span>
                        <div>
                          <strong className="text-slate-900 block font-bold">{bin.name}</strong>
                          <span className="text-[11px] text-slate-500">{bin.id} • {bin.ward}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {bin.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <strong className="text-slate-800">{bin.fillLevel}%</strong>
                          <span className="text-slate-400">{bin.currentLoadKg}kg</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              bin.status === 'green' ? 'bg-emerald-500' :
                              bin.status === 'yellow' ? 'bg-amber-500' :
                              bin.status === 'red' ? 'bg-red-600' : 'bg-purple-600'
                            }`}
                            style={{ width: `${bin.fillLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] text-slate-700 font-medium block">🔋 {bin.battery}%</span>
                      <span className="text-[10px] text-slate-400">{bin.sensorStatus}</span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedBinId(bin.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition"
                      >
                        Locate
                      </button>
                      <button
                        onClick={() => onEmptyBin(bin.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition shadow-sm"
                      >
                        Empty
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grievances & Redressal Panel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Public Grievances</h3>
              <p className="text-xs text-slate-500">Citizen reports via Haritha Mitra</p>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {grievances.length} Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {grievances.map(g => (
              <div key={g.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{g.type}</strong>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    {g.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{g.description}</p>
                <div className="text-[10px] text-slate-500">
                  <span>📍 {g.location} ({g.ward})</span>
                  <span className="block text-slate-400 mt-0.5">Reported by: {g.reportedBy} • {g.timestamp}</span>
                </div>
                <div className="pt-2 flex justify-end gap-1.5">
                  <button
                    onClick={() => {
                      if (onResolveGrievance) onResolveGrievance(g.id);
                      if (onShowToast) onShowToast(`Grievance ${g.id} marked resolved! Quick squad dispatched.`, 'success');
                    }}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition"
                  >
                    ✓ Resolve & Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Genetic Algorithm Modal */}
      <GeneticAlgorithmModal
        isOpen={showGAModal}
        onClose={() => setShowGAModal(false)}
        depot={depot}
        bins={bins}
        onApplyRoute={onApplyRoute}
      />
    </div>
  );
}
