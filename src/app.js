// Main Application Shell for Eco-Smart Kerala

const { useState, useEffect } = React;
import Navbar from './components/Navbar.js';
import CitizenPortal from './components/CitizenPortal.js';
import HKSWorkerPortal from './components/HKSWorkerPortal.js';
import AdminDashboard from './components/AdminDashboard.js';
import {
  INITIAL_BINS,
  DEPOT_LOCATION,
  INITIAL_HOUSEHOLDS,
  INITIAL_PAYMENTS,
  INITIAL_GRIEVANCES
} from './data/mockData.js';

export function App() {
  const [activeTab, setActiveTab] = useState('citizen'); // 'citizen' | 'worker' | 'admin'
  const [bins, setBins] = useState(() => {
    const saved = localStorage.getItem('ecosmart_bins');
    return saved ? JSON.parse(saved) : INITIAL_BINS;
  });
  const [households, setHouseholds] = useState(() => {
    const saved = localStorage.getItem('ecosmart_households');
    return saved ? JSON.parse(saved) : INITIAL_HOUSEHOLDS;
  });
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('ecosmart_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });
  const [grievances, setGrievances] = useState(() => {
    const saved = localStorage.getItem('ecosmart_grievances');
    return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
  });
  const [activeRoute, setActiveRoute] = useState(() => {
    const saved = localStorage.getItem('ecosmart_route');
    return saved ? JSON.parse(saved) : null;
  });
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ecosmart_bins', JSON.stringify(bins));
  }, [bins]);

  useEffect(() => {
    localStorage.setItem('ecosmart_households', JSON.stringify(households));
  }, [households]);

  useEffect(() => {
    localStorage.setItem('ecosmart_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('ecosmart_grievances', JSON.stringify(grievances));
  }, [grievances]);

  useEffect(() => {
    if (activeRoute) {
      localStorage.setItem('ecosmart_route', JSON.stringify(activeRoute));
    } else {
      localStorage.removeItem('ecosmart_route');
    }
  }, [activeRoute]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Update household status (e.g. 'Pickup Required' vs 'House Closed' vs 'Collected')
  const handleUpdateHouseholdStatus = (houseId, newStatus) => {
    setHouseholds(prev => prev.map(h => {
      if (h.id === houseId) {
        return { ...h, attendanceStatus: newStatus };
      }
      return h;
    }));
  };

  // Update household waste segregation log
  const handleUpdateHouseholdWaste = (houseId, segregatedLog) => {
    setHouseholds(prev => prev.map(h => {
      if (h.id === houseId) {
        return { ...h, segregatedLog, attendanceStatus: 'Collected' };
      }
      return h;
    }));
  };

  // Add new payment
  const handleAddPayment = (newPayment) => {
    setPayments(prev => [newPayment, ...prev]);
    // Also mark household fee as paid
    setHouseholds(prev => prev.map(h => {
      if (h.consumerNo === newPayment.consumerNo) {
        return { ...h, paymentStatus: 'Paid', lastPaymentDate: new Date().toISOString().split('T')[0] };
      }
      return h;
    }));
  };

  // Add Grievance
  const handleAddGrievance = (newGrv) => {
    setGrievances(prev => [newGrv, ...prev]);
  };

  // Resolve Grievance
  const handleResolveGrievance = (id) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, status: 'Resolved - Sanitation Squad Actioned' };
      }
      return g;
    }));
  };

  // Simulate emptying a bin
  const handleEmptyBin = (binId) => {
    setBins(prev => prev.map(b => {
      if (b.id === binId) {
        return {
          ...b,
          fillLevel: 5,
          currentLoadKg: Math.round(b.capacityKg * 0.05),
          status: 'green',
          lastEmptied: 'Just now (HKS Squad)'
        };
      }
      return b;
    }));
    showToast(`Smart Bin ${binId} successfully emptied and sensor reset!`, 'success');
  };

  // Apply GA route
  const handleApplyRoute = (routeResult) => {
    setActiveRoute(routeResult);
    setActiveTab('admin');
    showToast(`Genetic Algorithm Route (${routeResult.optimizedDistanceKm} km, ${routeResult.savingsPercent}% distance cut) applied!`, 'success');
  };

  // Clear GA route
  const handleClearRoute = () => {
    setActiveRoute(null);
    showToast('Collection route cleared from map.', 'info');
  };

  // Reset to initial demo mock data
  const handleResetData = () => {
    if (confirm('Reset all demo data (bins, attendance, payments) to initial state?')) {
      localStorage.clear();
      setBins(INITIAL_BINS);
      setHouseholds(INITIAL_HOUSEHOLDS);
      setPayments(INITIAL_PAYMENTS);
      setGrievances(INITIAL_GRIEVANCES);
      setActiveRoute(null);
      showToast('Eco-Smart Kerala demo data refreshed to initial state!', 'info');
    }
  };

  const alertCount = bins.filter(b => b.status === 'red' || b.status === 'hazard').length + grievances.filter(g => !g.status.includes('Resolved')).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-500'
              : toast.type === 'error'
              ? 'bg-red-900 text-red-100 border-red-500'
              : 'bg-slate-900 text-slate-100 border-slate-700'
          }`}>
            <span>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Tab Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        alertCount={alertCount}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'citizen' && (
          <CitizenPortal
            bins={bins}
            depot={DEPOT_LOCATION}
            households={households}
            payments={payments}
            grievances={grievances}
            onUpdateHouseholdStatus={handleUpdateHouseholdStatus}
            onAddPayment={handleAddPayment}
            onAddGrievance={handleAddGrievance}
            onEmptyBin={handleEmptyBin}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'worker' && (
          <HKSWorkerPortal
            bins={bins}
            depot={DEPOT_LOCATION}
            households={households}
            payments={payments}
            onUpdateHouseholdStatus={handleUpdateHouseholdStatus}
            onUpdateHouseholdWaste={handleUpdateHouseholdWaste}
            onAddPayment={handleAddPayment}
            onEmptyBin={handleEmptyBin}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            bins={bins}
            depot={DEPOT_LOCATION}
            households={households}
            payments={payments}
            grievances={grievances}
            activeRoute={activeRoute}
            onApplyRoute={handleApplyRoute}
            onClearRoute={handleClearRoute}
            onEmptyBin={handleEmptyBin}
            onResolveGrievance={handleResolveGrievance}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-base">🌴</span>
            <span className="font-bold text-slate-800">Eco-Smart Kerala</span>
            <span>• Government of Kerala Suchitwa Mission & Haritha Kerala Mission</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 font-semibold">Haritha Karma Sena (HKS) Platform</span>
            <span>•</span>
            <span>Version 2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
