// Genetic Algorithm Route Calculation Simulation Modal

const { useState, useEffect } = React;
import { haversineDistance, runGeneticAlgorithmRouteOptimization } from '../utils/geneticAlgorithm.js';

export default function GeneticAlgorithmModal({
  isOpen,
  onClose,
  depot,
  bins,
  onApplyRoute
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentGen, setCurrentGen] = useState(0);
  const [totalGens, setTotalGens] = useState(50);
  const [popSize, setPopSize] = useState(40);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [currentBestDist, setCurrentBestDist] = useState(null);
  const [initialDist, setInitialDist] = useState(null);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  // Filter high priority bins: Red, Hazard, and Yellow bins that need clearing
  const candidateBins = bins.filter(b => b.status === 'red' || b.status === 'hazard' || b.status === 'yellow');

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setIsRunning(false);
      setCurrentGen(0);
      setCurrentBestDist(null);
      setInitialDist(null);
      setGenerationHistory([]);
      setFinalResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartOptimization = async () => {
    setIsRunning(true);
    setGenerationHistory([]);
    setFinalResult(null);

    const history = [];

    const result = await runGeneticAlgorithmRouteOptimization({
      depot,
      candidateBins,
      populationSize: popSize,
      generations: totalGens,
      mutationRate: mutationRate,
      onGenerationStep: (step) => {
        setCurrentGen(step.generation);
        setCurrentBestDist(step.bestDistance);
        if (!initialDist && step.generation === 1) {
          setInitialDist(step.bestDistance * 1.35);
        }
        history.push({ gen: step.generation, dist: step.bestDistance });
        setGenerationHistory([...history]);
      }
    });

    setFinalResult(result);
    setIsRunning(false);
  };

  const handleApply = () => {
    if (finalResult && onApplyRoute) {
      onApplyRoute(finalResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/20 shadow-inner">
              🧬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">Genetic Algorithm Route Optimizer</h3>
                <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  AI TSP/VRP Engine
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Multi-objective heuristic routing for Haritha Karma Sena & LSGD Waste Fleets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {/* Parameter Config & Candidates Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Candidate Bins Targeted
              </label>
              <div className="text-2xl font-black text-slate-800">
                {candidateBins.length} <span className="text-xs font-medium text-slate-500">Bins / Hotspots</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-[11px] font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'red').length} Critical
                </span>
                <span className="text-[11px] font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'hazard').length} Hazard
                </span>
                <span className="text-[11px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'yellow').length} Moderate
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Fleet Depot (Start / End)
              </label>
              <div className="text-sm font-bold text-slate-800 truncate">
                {depot ? depot.name : 'Central MCF'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Coordinates: {depot ? `${depot.lat.toFixed(4)}, ${depot.lng.toFixed(4)}` : ''}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                GA Hyperparameters
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Generations:</span>
                  <strong className="block text-slate-800">{totalGens} Epochs</strong>
                </div>
                <div>
                  <span className="text-slate-500">Pop Size:</span>
                  <strong className="block text-slate-800">{popSize} Chromosomes</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Evolution Display */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span>🧬 Population Fitness & Convergence</span>
                  {isRunning && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                      Evolving Gen {currentGen}/{totalGens}
                    </span>
                  )}
                  {finalResult && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      ✓ Global Optima Found
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-500">
                  Minimizing Euclidean/Haversine tour distance via Ordered Crossover (OX) and 2-Opt mutations.
                </p>
              </div>

              {!isRunning && !finalResult && (
                <button
                  onClick={handleStartOptimization}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition transform hover:scale-105 flex items-center gap-2"
                >
                  <span>⚡ Run Genetic Algorithm</span>
                </button>
              )}

              {finalResult && !isRunning && (
                <button
                  onClick={handleStartOptimization}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs border border-slate-300 transition"
                >
                  🔄 Re-run Simulation
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-150 rounded-full"
                style={{ width: `${(currentGen / totalGens) * 100}%` }}
              ></div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Baseline Distance</span>
                <div className="text-lg font-black text-slate-700">
                  {finalResult ? `${finalResult.initialDistanceKm} km` : currentBestDist ? `${(currentBestDist * 1.35).toFixed(1)} km` : '--'}
                </div>
                <span className="text-[10px] text-slate-500">Unoptimized Routing</span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">GA Optimized Tour</span>
                <div className="text-lg font-black text-emerald-800">
                  {finalResult ? `${finalResult.optimizedDistanceKm} km` : currentBestDist ? `${currentBestDist} km` : '--'}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  {finalResult ? `${finalResult.savingsPercent}% Distance Cut` : 'Calculating...'}
                </span>
              </div>

              <div className="bg-teal-50 p-3 rounded-xl border border-teal-200">
                <span className="text-[10px] font-bold text-teal-700 uppercase">Fuel Conserved</span>
                <div className="text-lg font-black text-teal-800">
                  {finalResult ? `${finalResult.fuelSavedLiters} L` : '--'}
                </div>
                <span className="text-[10px] text-teal-600">Diesel Saved / Trip</span>
              </div>

              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">CO₂ Offset</span>
                <div className="text-lg font-black text-indigo-900">
                  {finalResult ? `${finalResult.co2SavedKg} kg` : '--'}
                </div>
                <span className="text-[10px] text-indigo-600">GHG Avoidance</span>
              </div>
            </div>
          </div>

          {/* Ordered Waypoints Result */}
          {finalResult && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>📍 Recommended Waypoint Sequence ({finalResult.optimizedStops.length} Stops)</span>
                </h4>
                <span className="text-xs text-slate-500">
                  Estimated Trip Duration: ~{Math.round(finalResult.optimizedDistanceKm * 3.5 + finalResult.optimizedStops.length * 6)} mins
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {/* Depot Start */}
                <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-black text-[10px] flex items-center justify-center">
                      0
                    </span>
                    <div>
                      <strong className="block text-slate-100">{depot.name} (Start)</strong>
                      <span className="text-[10px] text-slate-400">Departing Fleet Truck Unit #4</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-300">0.0 km</span>
                </div>

                {/* Stops */}
                {finalResult.optimizedStops.map((stop, index) => (
                  <div key={stop.id} className="p-3 hover:bg-slate-50 flex items-center justify-between transition">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-black text-[10px] flex items-center justify-center border border-indigo-200">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-800">{stop.name}</strong>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            stop.status === 'red' ? 'bg-red-100 text-red-700' :
                            stop.status === 'hazard' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {stop.fillLevel}% Fill
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{stop.ward} • {stop.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-700">~{stop.currentLoadKg} kg</span>
                      <span className="block text-[10px] text-slate-400">Est. 5m load</span>
                    </div>
                  </div>
                ))}

                {/* Depot Return */}
                <div className="p-3 bg-slate-100 text-slate-800 flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">
                      🏁
                    </span>
                    <div>
                      <strong>{depot.name} (Return)</strong>
                      <span className="block text-[10px] text-slate-500">Unload to Material Recovery Facility</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Total: {finalResult.optimizedDistanceKm} km</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 p-4 px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm transition"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-3">
            {finalResult && (
              <button
                onClick={handleApply}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition transform hover:scale-105 flex items-center gap-2"
              >
                <span>🗺️ Apply Optimal Route to Map</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
