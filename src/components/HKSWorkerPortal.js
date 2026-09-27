// Haritha Karma Sena (HKS) Field Worker Portal

const { useState } = React;
import LeafletMapView from './LeafletMapView.js';
import { HKS_WORKER_PROFILE } from '../data/mockData.js';

export default function HKSWorkerPortal({
  bins,
  depot,
  households,
  payments,
  onUpdateHouseholdStatus,
  onUpdateHouseholdWaste,
  onAddPayment,
  onEmptyBin,
  onShowToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannedHouse, setScannedHouse] = useState(null);

  // Waste logging form state
  const [wetKg, setWetKg] = useState(2.0);
  const [plasticKg, setPlasticKg] = useState(1.5);
  const [glassKg, setGlassKg] = useState(0.5);
  const [eWasteKg, setEWasteKg] = useState(0);

  // Filter households
  const filteredHouseholds = households.filter(h => {
    const matchesSearch =
      h.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.houseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.consumerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.doorNo.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (attendanceFilter === 'all') return true;
    if (attendanceFilter === 'pickup') return h.attendanceStatus === 'Pickup Required';
    if (attendanceFilter === 'closed') return h.attendanceStatus === 'House Closed';
    if (attendanceFilter === 'collected') return h.attendanceStatus === 'Collected';
    if (attendanceFilter === 'pending_pay') return h.paymentStatus === 'Pending';
    return true;
  });

  // Handle direct attendance toggle
  const handleQuickStatusChange = (houseId, status) => {
    if (onUpdateHouseholdStatus) {
      onUpdateHouseholdStatus(houseId, status);
      if (onShowToast) {
        onShowToast(`House marked as "${status}"`, 'info');
      }
    }
  };

  // Open Segregated Waste Logger
  const handleOpenCollectModal = (house) => {
    setSelectedHouse(house);
    setWetKg(house.segregatedLog?.wetKg || 2.0);
    setPlasticKg(house.segregatedLog?.plasticKg || 1.5);
    setGlassKg(house.segregatedLog?.glassKg || 0);
    setEWasteKg(house.segregatedLog?.eWasteKg || 0);
    setShowCollectModal(true);
  };

  // Save Waste Collection Log
  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!selectedHouse) return;

    const segregatedLog = {
      wetKg: parseFloat(wetKg) || 0,
      plasticKg: parseFloat(plasticKg) || 0,
      glassKg: parseFloat(glassKg) || 0,
      eWasteKg: parseFloat(eWasteKg) || 0
    };

    if (onUpdateHouseholdWaste) {
      onUpdateHouseholdWaste(selectedHouse.id, segregatedLog);
    }
    if (onUpdateHouseholdStatus) {
      onUpdateHouseholdStatus(selectedHouse.id, 'Collected');
    }

    setShowCollectModal(false);
    if (onShowToast) {
      const totalKg = (segregatedLog.wetKg + segregatedLog.plasticKg + segregatedLog.glassKg + segregatedLog.eWasteKg).toFixed(1);
      onShowToast(`Recorded ${totalKg} kg segregated waste from ${selectedHouse.houseName}!`, 'success');
    }
  };

  // Simulate QR Code Scanner
  const handleStartQRScan = () => {
    setShowQRScanModal(true);
    setScanning(true);
    setScannedHouse(null);

    // Pick a household that has pending payment or first house
    const target = households.find(h => h.paymentStatus === 'Pending') || households[0];

    setTimeout(() => {
      setScanning(false);
      setScannedHouse(target);
    }, 1200);
  };

  // Confirm Scanned Payment
  const handleConfirmScanPayment = (mode = 'UPI') => {
    if (!scannedHouse) return;

    const txnId = `TXN-HKS-${Math.floor(90000 + Math.random() * 10000)}`;
    const newPayment = {
      txnId,
      consumerNo: scannedHouse.consumerNo,
      ownerName: scannedHouse.ownerName,
      houseName: scannedHouse.houseName,
      amount: scannedHouse.userFee || 50,
      mode: mode === 'UPI' ? 'UPI (QR Scan)' : 'Cash to HKS Worker',
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      workerId: HKS_WORKER_PROFILE.id,
      workerName: HKS_WORKER_PROFILE.name,
      status: 'Success',
      receiptNo: `HKS-REC-2026-${Math.floor(90000 + Math.random() * 10000)}`
    };

    if (onAddPayment) onAddPayment(newPayment);
    setShowQRScanModal(false);
    if (onShowToast) {
      onShowToast(`Collected ₹${newPayment.amount} from ${scannedHouse.ownerName}. Digital receipt logged!`, 'success');
    }
  };

  // Compute daily totals
  const totalHouses = households.length;
  const collectedCount = households.filter(h => h.attendanceStatus === 'Collected').length;
  const closedCount = households.filter(h => h.attendanceStatus === 'House Closed').length;
  const pickupReqCount = households.filter(h => h.attendanceStatus === 'Pickup Required').length;
  const todayTotalCollectedFee = payments
    .filter(p => p.timestamp.includes('Today') || p.timestamp.includes('2026-09-22') || p.timestamp.includes('AM') || p.timestamp.includes('PM'))
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Field Worker Header Card */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-3xl shadow-inner">
              👷‍♀️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Haritha Karma Sena Field Lead
                </span>
                <span className="text-xs text-emerald-200">ID: {HKS_WORKER_PROFILE.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                {HKS_WORKER_PROFILE.name} & Team
              </h1>
              <p className="text-emerald-100/80 text-xs mt-0.5">
                {HKS_WORKER_PROFILE.ward} • Assigned: {HKS_WORKER_PROFILE.assignedVehicle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartQRScan}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-sm shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>📷 Scan Household QR Fee</span>
            </button>
          </div>
        </div>

        {/* Daily Progress Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-600/30">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-emerald-200 uppercase">Coverage Today</span>
            <div className="text-xl font-black text-white mt-0.5">
              {collectedCount + closedCount} / {totalHouses} <span className="text-xs font-normal opacity-80">Houses</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${Math.round(((collectedCount + closedCount) / totalHouses) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-emerald-200 uppercase">Pending Pickups</span>
            <div className="text-xl font-black text-amber-300 mt-0.5">
              {pickupReqCount} <span className="text-xs font-normal opacity-80">Remaining</span>
            </div>
            <span className="text-[10px] text-emerald-100/70 block mt-1">Active collection round</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-emerald-200 uppercase">Segregated Waste</span>
            <div className="text-xl font-black text-teal-200 mt-0.5">
              {HKS_WORKER_PROFILE.wasteCollectedTodayKg} <span className="text-xs font-normal opacity-80">kg</span>
            </div>
            <span className="text-[10px] text-emerald-100/70 block mt-1">Cleaned & Baled</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-emerald-200 uppercase">User Fees Logged</span>
            <div className="text-xl font-black text-emerald-300 mt-0.5">
              ₹{todayTotalCollectedFee} <span className="text-xs font-normal opacity-80">Today</span>
            </div>
            <span className="text-[10px] text-emerald-100/70 block mt-1">Direct Bank Remittance</span>
          </div>
        </div>
      </div>

      {/* Daily Household Attendance Management */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">Ward Household Attendance & Collection Register</h2>
              <span className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                Ward 12
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Toggle attendance status, record segregated weights, and collect monthly user fees.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search House / Owner / Consumer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium w-64 focus:bg-white transition"
              />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="all">All Houses ({households.length})</option>
              <option value="pickup">Pickup Required ({pickupReqCount})</option>
              <option value="closed">House Closed ({closedCount})</option>
              <option value="collected">Collected ({collectedCount})</option>
              <option value="pending_pay">Payment Pending</option>
            </select>
          </div>
        </div>

        {/* Households Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Household & Consumer ID</th>
                <th className="p-3.5">Today's Attendance Status</th>
                <th className="p-3.5">Segregated Waste Log</th>
                <th className="p-3.5">User Fee</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHouseholds.map(h => (
                <tr key={h.id} className="hover:bg-slate-50/80 transition">
                  {/* Household Details */}
                  <td className="p-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 mt-0.5">
                        🏠
                      </div>
                      <div>
                        <strong className="text-slate-900 text-sm font-bold block">{h.houseName}</strong>
                        <span className="text-slate-600 block">{h.ownerName} • Door: {h.doorNo}</span>
                        <span className="font-mono text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {h.consumerNo}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Attendance Toggle Buttons */}
                  <td className="p-3.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'Pickup Required')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'Pickup Required'
                            ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>🟢</span> Pickup Required
                      </button>

                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'House Closed')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'House Closed'
                            ? 'bg-slate-800 text-white shadow-sm ring-2 ring-slate-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>🚪</span> Closed
                      </button>

                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'Collected')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'Collected'
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>✓</span> Collected
                      </button>
                    </div>
                  </td>

                  {/* Segregated Log */}
                  <td className="p-3.5">
                    {h.segregatedLog ? (
                      <div className="space-y-0.5 text-[11px]">
                        <span className="text-slate-700 font-medium">
                          Wet: <strong>{h.segregatedLog.wetKg}kg</strong> | Plastic: <strong>{h.segregatedLog.plasticKg}kg</strong>
                        </span>
                        {h.segregatedLog.glassKg > 0 && (
                          <span className="block text-slate-500">Glass: {h.segregatedLog.glassKg}kg</span>
                        )}
                        {h.segregatedLog.eWasteKg > 0 && (
                          <span className="block text-purple-700 font-semibold">☣️ E-Waste: {h.segregatedLog.eWasteKg}kg</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Not logged</span>
                    )}
                  </td>

                  {/* Fee Status */}
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                      h.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800 animate-pulse'
                    }`}>
                      {h.paymentStatus === 'Paid' ? '✓ Paid (₹' + h.userFee + ')' : '⚠️ Due: ₹' + h.userFee}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenCollectModal(h)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200 text-xs transition"
                    >
                      ⚖️ Log Waste
                    </button>
                    {h.paymentStatus === 'Pending' && (
                      <button
                        onClick={() => {
                          setScannedHouse(h);
                          setShowQRScanModal(true);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-sm"
                      >
                        💳 Collect ₹{h.userFee}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated QR Code Payment Log for HKS Workers */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">HKS User Fee Collection Log & Digital Ledger</h2>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                KSPCB / Suchitwa Mission Audited
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live synchronized UPI QR transactions and instant receipts issued by Ward 12 team.
            </p>
          </div>

          <button
            onClick={handleStartQRScan}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
          >
            <span>📱 New QR Code Scan</span>
          </button>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Txn ID / Receipt</th>
                <th className="p-3">Consumer & House</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Date & Timestamp</th>
                <th className="p-3">Collector</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {payments.map(p => (
                <tr key={p.txnId} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <strong className="font-mono text-slate-900 block">{p.txnId}</strong>
                    <span className="text-[10px] text-slate-500">{p.receiptNo}</span>
                  </td>
                  <td className="p-3">
                    <strong className="text-slate-800 block">{p.houseName}</strong>
                    <span className="text-slate-500 text-[11px]">{p.ownerName} ({p.consumerNo})</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-black text-emerald-700">₹{p.amount}.00</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {p.mode}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{p.timestamp}</td>
                  <td className="p-3 text-slate-700 font-medium">{p.workerName || 'Bindu Sajeev'}</td>
                  <td className="p-3 text-right">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      ✓ {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ward Smart Bins Map Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Ward Community Smart Bins Status</h2>
            <p className="text-xs text-slate-500">Monitor bins for critical overflow or hazardous waste alerts on your route</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{bins.length} Active Sensors</span>
        </div>

        <LeafletMapView
          bins={bins}
          depot={depot}
          onEmptyBin={onEmptyBin}
          height="400px"
          showRoute={false}
        />
      </div>

      {/* Waste Collection Modal */}
      {showCollectModal && selectedHouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Log Segregated Waste</h3>
                <p className="text-xs text-slate-500">{selectedHouse.houseName} ({selectedHouse.consumerNo})</p>
              </div>
              <button
                onClick={() => setShowCollectModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                  <label className="block font-bold text-emerald-900 mb-1">🟢 Wet / Organic (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={wetKg}
                    onChange={(e) => setWetKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-emerald-300 font-bold text-sm bg-white"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                  <label className="block font-bold text-amber-900 mb-1">🟡 Dry Plastic (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={plasticKg}
                    onChange={(e) => setPlasticKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-amber-300 font-bold text-sm bg-white"
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
                  <label className="block font-bold text-blue-900 mb-1">🔵 Glass / Metal (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={glassKg}
                    onChange={(e) => setGlassKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-blue-300 font-bold text-sm bg-white"
                  />
                </div>

                <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                  <label className="block font-bold text-purple-900 mb-1">☣️ E-Waste / Hazard (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={eWasteKg}
                    onChange={(e) => setEWasteKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-purple-300 font-bold text-sm bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-700">Total Segregated Weight:</span>
                <strong className="text-base font-black text-emerald-800">
                  {((parseFloat(wetKg) || 0) + (parseFloat(plasticKg) || 0) + (parseFloat(glassKg) || 0) + (parseFloat(eWasteKg) || 0)).toFixed(1)} kg
                </strong>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCollectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
                >
                  ✓ Confirm & Mark Collected
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Scanner & Fee Collection Modal */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">HKS User Fee QR Scanner</h3>
                <p className="text-xs text-slate-500">Haritha Mitra Consumer QR Verification</p>
              </div>
              <button
                onClick={() => setShowQRScanModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative w-full h-56 bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-emerald-500 shadow-inner">
              {scanning ? (
                <>
                  <div className="w-40 h-40 border-2 border-emerald-400 rounded-xl relative flex items-center justify-center animate-pulse">
                    <div className="absolute inset-x-0 h-0.5 bg-emerald-400 animate-bounce shadow-lg shadow-emerald-400"></div>
                  </div>
                  <span className="text-xs text-emerald-300 font-semibold mt-3 animate-pulse">
                    Scanning Household QR Tag...
                  </span>
                </>
              ) : scannedHouse ? (
                <div className="text-center text-white p-4 space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl mx-auto mb-2">
                    ✓
                  </div>
                  <h4 className="font-bold text-base text-emerald-300">{scannedHouse.houseName}</h4>
                  <p className="text-xs text-slate-300">{scannedHouse.ownerName} ({scannedHouse.consumerNo})</p>
                  <span className="inline-block text-xs bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full mt-2 font-mono">
                    Fee Due: ₹{scannedHouse.userFee || 50}
                  </span>
                </div>
              ) : null}
            </div>

            {scannedHouse && (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfirmScanPayment('UPI')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <span>📱 Verify UPI App Payment</span>
                  </button>
                  <button
                    onClick={() => handleConfirmScanPayment('Cash')}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <span>💵 Record Cash Receipt</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
