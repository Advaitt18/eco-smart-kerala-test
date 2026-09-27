// Citizen Portal View - Eco-Smart Kerala

const { useState } = React;
import LeafletMapView from './LeafletMapView.js';

export default function CitizenPortal({
  bins,
  depot,
  households,
  payments,
  grievances,
  onUpdateHouseholdStatus,
  onAddPayment,
  onAddGrievance,
  onEmptyBin,
  onShowToast
}) {
  // Demo logged-in household: Narayanan Nair (KL-LSGD-12-0041)
  const currentHousehold = households.find(h => h.id === 'HOU-KL-1001') || households[0];

  const [attendance, setAttendance] = useState(currentHousehold ? currentHousehold.attendanceStatus : 'Pickup Required');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');

  // Grievance Form State
  const [grvType, setGrvType] = useState('Illegal Waste Dumping');
  const [grvLocation, setGrvLocation] = useState('Near Mananchira North Gate Canal');
  const [grvDesc, setGrvDesc] = useState('');
  const [grvPhoto, setGrvPhoto] = useState('https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&auto=format&fit=crop&q=60');

  // Simulated Payment State
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payingMethod, setPayingMethod] = useState('UPI');

  const handleToggleAttendance = (status) => {
    setAttendance(status);
    if (onUpdateHouseholdStatus) {
      onUpdateHouseholdStatus(currentHousehold.id, status);
    }
    if (onShowToast) {
      onShowToast(`Household status updated to "${status}" for Ward HKS team!`, 'success');
    }
  };

  const handleSimulatePayment = () => {
    const txnId = `TXN-UPI-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPayment = {
      txnId,
      consumerNo: currentHousehold.consumerNo,
      ownerName: currentHousehold.ownerName,
      houseName: currentHousehold.houseName,
      amount: currentHousehold.userFee || 50,
      mode: `UPI (${payingMethod})`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      workerId: 'HKS-W12-04',
      workerName: 'Bindu Sajeev (Ward Lead)',
      status: 'Success',
      receiptNo: `HKS-REC-2026-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setPaymentSuccess(true);
    setTimeout(() => {
      if (onAddPayment) onAddPayment(newPayment);
      setShowPaymentModal(false);
      setPaymentSuccess(false);
      if (onShowToast) {
        onShowToast(`Payment of ₹${newPayment.amount} confirmed! Receipt: ${newPayment.receiptNo}`, 'success');
      }
    }, 1500);
  };

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!grvDesc.trim()) return;

    const newGrv = {
      id: `GRV-KL-${Math.floor(700 + Math.random() * 200)}`,
      reportedBy: currentHousehold.ownerName,
      phone: currentHousehold.phone,
      location: grvLocation,
      ward: currentHousehold.ward,
      type: grvType,
      description: grvDesc,
      status: 'Assigned to HKS Quick Response Squad',
      severity: 'High',
      timestamp: 'Just now',
      hasPhoto: true,
      photoUrl: grvPhoto
    };

    if (onAddGrievance) onAddGrievance(newGrv);
    setGrvDesc('');
    setShowGrievanceModal(false);
    if (onShowToast) {
      onShowToast('Grievance logged successfully under Haritha Mitra Portal!', 'success');
    }
  };

  // Recent user payments
  const userPayments = payments.filter(p => p.consumerNo === currentHousehold.consumerNo);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome & Citizen Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
              <span>🏛️ Suchitwa Mission Kerala</span> • <span>Haritha Mitra Smart Citizen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Namaskaram, {currentHousehold.ownerName}
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-xl">
              {currentHousehold.houseName} (Door No: {currentHousehold.doorNo}), {currentHousehold.ward}. Consumer ID: <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{currentHousehold.consumerNo}</span>
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-5 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm shadow-md transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>💳 Pay HKS Fee (₹{currentHousehold.userFee})</span>
            </button>
            <button
              onClick={() => setShowGrievanceModal(true)}
              className="px-5 py-3 bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-white rounded-2xl font-bold text-sm shadow-md transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>📸 Report Dumping</span>
            </button>
          </div>
        </div>
      </div>

      {/* Household Daily Attendance Toggle & Segregation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Toggle Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                📋
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Daily Collection Status</h3>
                <p className="text-xs text-slate-500">Inform your Haritha Karma Sena team today</p>
              </div>
            </div>
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
              attendance === 'Pickup Required' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
              attendance === 'Collected' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
              'bg-slate-100 text-slate-700 border border-slate-300'
            }`}>
              {attendance}
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Set your household availability for the morning waste collection round. This optimizes the HKS route and prevents unneeded visits.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleToggleAttendance('Pickup Required')}
              className={`p-3.5 rounded-2xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 border-2 ${
                attendance === 'Pickup Required'
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-xl">🟢</span>
              <span>Pickup Required</span>
              <span className="text-[10px] font-normal opacity-90">Segregated waste ready</span>
            </button>

            <button
              onClick={() => handleToggleAttendance('House Closed')}
              className={`p-3.5 rounded-2xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 border-2 ${
                attendance === 'House Closed'
                  ? 'bg-slate-800 text-white border-slate-900 shadow-md ring-2 ring-slate-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-xl">🚪</span>
              <span>House Closed</span>
              <span className="text-[10px] font-normal opacity-90">Skip today's visit</span>
            </button>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <span>💡</span>
            <span>Next non-biodegradable collection day: <strong>Every Wednesday & Saturday</strong></span>
          </div>
        </div>

        {/* User Fee & HKS QR Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">
                🪙
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">HKS Monthly User Fee</h3>
                <p className="text-xs text-slate-500">Government fixed tariff: ₹50/month</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Paid • Sep 2026
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Assigned HKS Worker</span>
              <strong className="block text-slate-800 text-sm">Bindu Sajeev & Sujatha V.</strong>
              <span className="text-xs text-slate-500">Ward 12 Unit • +91 94470 55667</span>
            </div>
            <div className="w-14 h-14 bg-white p-1.5 rounded-xl border border-slate-300 shadow-inner flex flex-col items-center justify-center">
              <div className="text-2xl leading-none">📱</div>
              <span className="text-[8px] font-bold text-slate-500 mt-1">UPI QR</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
            >
              <span>💳 Make Digital Payment</span>
            </button>
            <button
              onClick={() => {
                if (onShowToast) onShowToast('Digital Haritha Karma Sena QR Card generated!', 'info');
              }}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs border border-slate-300 transition"
            >
              View QR
            </button>
          </div>
        </div>

        {/* Segregation Guide & Impact */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Your Green Score</h3>
              <p className="text-xs text-slate-500">Suchitwa Mission Star Household</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-emerald-700 font-bold block">Plastic Recycled</span>
              <strong className="text-lg text-emerald-900 font-black">28.4 kg</strong>
              <span className="text-[10px] text-emerald-600 block">Since Jan 2026</span>
            </div>
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
              <span className="text-teal-700 font-bold block">CO₂ Prevented</span>
              <strong className="text-lg text-teal-900 font-black">62.5 kg</strong>
              <span className="text-[10px] text-teal-600 block">Carbon credits earned</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-800 block">✅ Mandatory Segregation Guidelines:</strong>
            <p>1. Rinse and dry milk sachets & plastic containers before handing over.</p>
            <p>2. Keep hazardous waste (e.g. tube lights, expired medicine) in red/hazard box.</p>
          </div>
        </div>
      </div>

      {/* Smart Bin Locator Section with Leaflet Map */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-lg">Community Smart Bin Telemetry Map</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Live IoT
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Check real-time fill levels of community smart bins nearby before visiting
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'green', 'yellow', 'red', 'hazard'].map((f) => (
              <button
                key={f}
                onClick={() => setMapFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                  mapFilter === f
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {f === 'all' ? 'All Bins' : f}
              </button>
            ))}
          </div>
        </div>

        <LeafletMapView
          bins={bins}
          depot={depot}
          filterStatus={mapFilter}
          selectedBinId={selectedBinId}
          onSelectBin={(id) => setSelectedBinId(id)}
          onEmptyBin={onEmptyBin}
          height="450px"
          showRoute={false}
        />
      </div>

      {/* Recent Payment History & Grievance Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span>🧾 User Fee Payment History</span>
            </h3>
            <span className="text-xs text-slate-500">Consumer: {currentHousehold.consumerNo}</span>
          </div>

          <div className="space-y-2.5">
            {userPayments.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No payment transactions yet.</p>
            ) : (
              userPayments.map(p => (
                <div key={p.txnId} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">₹{p.amount}</strong>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <span className="text-slate-500 block text-[11px] mt-0.5">{p.mode} • {p.timestamp}</span>
                    <span className="text-slate-400 text-[10px]">Receipt: {p.receiptNo}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Receipt #${p.receiptNo} sent to your registered phone!`, 'info');
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs shadow-sm transition"
                  >
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Grievances */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span>📢 Waste Complaints & Spot Dumping Logs</span>
            </h3>
            <button
              onClick={() => setShowGrievanceModal(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              + New Report
            </button>
          </div>

          <div className="space-y-2.5">
            {grievances.map(g => (
              <div key={g.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{g.type}</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {g.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{g.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>📍 {g.location}</span>
                  <span>{g.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Haritha Karma Sena User Fee</h3>
                <p className="text-xs text-slate-500">Government of Kerala Suchitwa Mission</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-slate-50 rounded-3xl border-2 border-emerald-500 shadow-inner">
                {/* Simulated QR Pattern */}
                <div className="w-48 h-48 mx-auto bg-slate-900 rounded-2xl p-3 flex flex-col items-center justify-center text-white relative">
                  <div className="absolute top-2 left-2 w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-emerald-400"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-emerald-400"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-emerald-400"></div>
                  </div>
                  <span className="text-4xl">🏛️</span>
                  <span className="text-[10px] font-mono mt-2 tracking-widest text-emerald-300">UPI / BHARAT QR</span>
                  <span className="text-[8px] opacity-75 font-mono">harithakarmasena@sbi</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Payable Amount</span>
                <div className="text-3xl font-black text-slate-900">₹{currentHousehold.userFee || 50}.00</div>
                <span className="text-xs text-slate-500">Monthly User Fee for Ward 12</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Select Instant UPI App:</span>
              <div className="grid grid-cols-3 gap-2">
                {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => setPayingMethod(app)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      payingMethod === app
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={paymentSuccess}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
            >
              {paymentSuccess ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span>Confirming Payment with Bank...</span>
                </>
              ) : (
                <span>✓ Pay ₹{currentHousehold.userFee || 50} via {payingMethod}</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Grievance Modal */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Report Waste Dumping / Bin Issue</h3>
                <p className="text-xs text-slate-500">Haritha Mitra Grievance Redressal</p>
              </div>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Complaint Category</label>
                <select
                  value={grvType}
                  onChange={(e) => setGrvType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Illegal Waste Dumping">Illegal Roadside / Canal Waste Dumping</option>
                  <option value="Smart Bin Overflow Alert">Community Smart Bin Overflow Alert</option>
                  <option value="Missed Doorstep Collection">Missed Doorstep Collection</option>
                  <option value="Hazardous / Medical Waste Dumping">Hazardous / Bio-Medical Waste Alert</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Landmark</label>
                <input
                  type="text"
                  value={grvLocation}
                  onChange={(e) => setGrvLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  placeholder="e.g. Near Tali Temple Pond, Ward 12"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Details</label>
                <textarea
                  rows="3"
                  value={grvDesc}
                  onChange={(e) => setGrvDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  placeholder="Describe the nature of waste, approximate quantity, and landmark..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Attached Photo Evidence (Simulated)</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={grvPhoto}
                    alt="Evidence"
                    className="w-16 h-16 rounded-lg object-cover border border-slate-300"
                  />
                  <div className="text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700 block">waste_dump_evidence_01.jpg</span>
                    <span>GPS geotagged to Kozhikode Corporation</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrievanceModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
                >
                  Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
