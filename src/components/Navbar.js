// Top Tab Navigation Bar Component for Eco-Smart Kerala

export default function Navbar({
  activeTab,
  onSelectTab,
  alertCount = 0,
  onResetData
}) {
  const tabs = [
    {
      id: 'citizen',
      label: 'Citizen Portal',
      icon: '🏡',
      desc: 'Doorstep Pickup & Fee Payment'
    },
    {
      id: 'worker',
      label: 'HKS Field Worker',
      icon: '👷‍♀️',
      desc: 'Attendance & QR Payment Log'
    },
    {
      id: 'admin',
      label: 'LSGD Admin Dashboard',
      icon: '🏛️',
      desc: 'IoT Telemetry & GA Routing',
      badge: alertCount > 0 ? `${alertCount} Alerts` : null
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-2xl shadow-md shadow-emerald-200 border border-emerald-400/40">
              🌴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 font-sans">
                  Eco-Smart <span className="text-emerald-700">Kerala</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-200">
                  v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                Suchitwa Mission & Haritha Karma Sena Smart Waste Grid
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-900 shadow-md shadow-slate-200/60 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Status & Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-800 text-[11px]">Kozhikode Corp Grid: Online</span>
            </div>

            <button
              onClick={onResetData}
              title="Reset to fresh demo dataset"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-300 transition flex items-center gap-1.5"
            >
              <span>🔄 Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition ${
                  isActive ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
                }`}
              >
                <div className="text-base">{tab.icon}</div>
                <div className="text-[10px] mt-0.5">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
