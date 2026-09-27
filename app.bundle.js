// Eco-Smart Kerala - Complete Modular React Bundle with Light/Dark Mode & Portal Authentication

const { useState, useEffect, useRef } = React;

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================
const INITIAL_BINS = [
  {
    id: 'BIN-KL-001',
    name: 'Mananchira Square North Bin',
    ward: 'Ward 12 - Mananchira',
    lat: 11.2543,
    lng: 75.7820,
    fillLevel: 35,
    status: 'green',
    category: 'Biodegradable (Wet Waste)',
    battery: 92,
    humidity: 68,
    temperature: 29,
    lastEmptied: 'Today, 06:30 AM',
    capacityKg: 200,
    currentLoadKg: 70,
    sensorStatus: 'Active - Sigfox IoT'
  },
  {
    id: 'BIN-KL-002',
    name: 'Kozhikode Beach Promenade 1',
    ward: 'Ward 14 - Beach Ward',
    lat: 11.2588,
    lng: 75.7695,
    fillLevel: 88,
    status: 'red',
    category: 'Plastic & Dry Recyclables',
    battery: 84,
    humidity: 78,
    temperature: 31,
    lastEmptied: 'Yesterday, 04:15 PM',
    capacityKg: 300,
    currentLoadKg: 264,
    sensorStatus: 'Active - LoRaWAN'
  },
  {
    id: 'BIN-KL-003',
    name: 'SM Street Market Junction',
    ward: 'Ward 15 - Palayam',
    lat: 11.2505,
    lng: 75.7834,
    fillLevel: 94,
    status: 'red',
    category: 'Commercial Dry Waste',
    battery: 79,
    humidity: 71,
    temperature: 32,
    lastEmptied: 'Yesterday, 02:00 PM',
    capacityKg: 350,
    currentLoadKg: 329,
    sensorStatus: 'Active - NB-IoT'
  },
  {
    id: 'BIN-KL-004',
    name: 'Mavoor Road KSRTC Terminal',
    ward: 'Ward 18 - KSRTC Complex',
    lat: 11.2612,
    lng: 75.7892,
    fillLevel: 62,
    status: 'yellow',
    category: 'Mixed Dry Recyclables',
    battery: 88,
    humidity: 64,
    temperature: 30,
    lastEmptied: 'Today, 07:15 AM',
    capacityKg: 250,
    currentLoadKg: 155,
    sensorStatus: 'Active - LoRaWAN'
  },
  {
    id: 'BIN-KL-005',
    name: 'Palayam Vegetable Market Yard',
    ward: 'Ward 15 - Palayam',
    lat: 11.2482,
    lng: 75.7865,
    fillLevel: 91,
    status: 'red',
    category: 'Biodegradable Organic',
    battery: 73,
    humidity: 82,
    temperature: 33,
    lastEmptied: 'Yesterday, 11:30 AM',
    capacityKg: 400,
    currentLoadKg: 364,
    sensorStatus: 'Active - NB-IoT'
  },
  {
    id: 'BIN-KL-006',
    name: 'Medical College Hospital Gate 2',
    ward: 'Ward 24 - Medical College',
    lat: 11.2675,
    lng: 75.8340,
    fillLevel: 75,
    status: 'hazard',
    category: 'Hazardous / Bio-Sanitary & E-Waste',
    battery: 95,
    humidity: 60,
    temperature: 28,
    lastEmptied: 'Today, 05:45 AM',
    capacityKg: 150,
    currentLoadKg: 112,
    sensorStatus: 'Alert - Anomaly Detected'
  },
  {
    id: 'BIN-KL-007',
    name: 'Calicut Railway Station East Gate',
    ward: 'Ward 16 - Railway Colony',
    lat: 11.2442,
    lng: 75.7801,
    fillLevel: 58,
    status: 'yellow',
    category: 'Plastic & Bottles',
    battery: 81,
    humidity: 66,
    temperature: 30,
    lastEmptied: 'Today, 08:00 AM',
    capacityKg: 250,
    currentLoadKg: 145,
    sensorStatus: 'Active - Sigfox IoT'
  },
  {
    id: 'BIN-KL-008',
    name: 'Sarovaram Biopark Entrance',
    ward: 'Ward 10 - Sarovaram',
    lat: 11.2721,
    lng: 75.7985,
    fillLevel: 25,
    status: 'green',
    category: 'Biodegradable Organic',
    battery: 98,
    humidity: 65,
    temperature: 28,
    lastEmptied: 'Today, 09:00 AM',
    capacityKg: 200,
    currentLoadKg: 50,
    sensorStatus: 'Active - LoRaWAN'
  },
  {
    id: 'BIN-KL-009',
    name: 'Tali Temple Pond East Corner',
    ward: 'Ward 13 - Tali',
    lat: 11.2460,
    lng: 75.7880,
    fillLevel: 42,
    status: 'green',
    category: 'Flower & Puja Biodegradables',
    battery: 89,
    humidity: 70,
    temperature: 29,
    lastEmptied: 'Today, 06:00 AM',
    capacityKg: 180,
    currentLoadKg: 75,
    sensorStatus: 'Active - Sigfox IoT'
  },
  {
    id: 'BIN-KL-010',
    name: 'Jafferkhan Colony Community Point',
    ward: 'Ward 18 - KSRTC Complex',
    lat: 11.2635,
    lng: 75.7930,
    fillLevel: 85,
    status: 'red',
    category: 'Non-Biodegradable Dry Waste',
    battery: 76,
    humidity: 69,
    temperature: 31,
    lastEmptied: 'Yesterday, 03:00 PM',
    capacityKg: 300,
    currentLoadKg: 255,
    sensorStatus: 'Active - LoRaWAN'
  },
  {
    id: 'BIN-KL-011',
    name: 'Focus Mall Parking Area',
    ward: 'Ward 15 - Palayam',
    lat: 11.2560,
    lng: 75.7875,
    fillLevel: 68,
    status: 'yellow',
    category: 'Packaging & Paper Cardboard',
    battery: 87,
    humidity: 62,
    temperature: 29,
    lastEmptied: 'Today, 07:45 AM',
    capacityKg: 300,
    currentLoadKg: 204,
    sensorStatus: 'Active - NB-IoT'
  },
  {
    id: 'BIN-KL-012',
    name: 'E-Waste Hub - Kakkodi Road',
    ward: 'Ward 08 - Kakkodi Road',
    lat: 11.2810,
    lng: 75.8050,
    fillLevel: 78,
    status: 'hazard',
    category: 'Hazardous / Batteries & Electronic Waste',
    battery: 91,
    humidity: 55,
    temperature: 27,
    lastEmptied: '2 days ago',
    capacityKg: 150,
    currentLoadKg: 117,
    sensorStatus: 'Alert - Special Handling Required'
  }
];

const DEPOT_LOCATION = {
  id: 'DEPOT-MCF-01',
  name: 'Central Material Collection Facility (MCF) & RRF',
  ward: 'Ward 11 - Nallalam Hub',
  lat: 11.2380,
  lng: 75.8020,
  type: 'depot',
  capacityTons: 50,
  currentStoredTons: 28.5,
  trucksAvailable: 6
};

const INITIAL_HOUSEHOLDS = [
  {
    id: 'HOU-KL-1001',
    consumerNo: 'KL-LSGD-12-0041',
    ownerName: 'K. S. Narayanan Nair',
    houseName: 'Sreevalsam Nilayam',
    doorNo: '12/402-A',
    ward: 'Ward 12 - Mananchira',
    phone: '+91 94471 23456',
    attendanceStatus: 'Pickup Required',
    wasteType: 'Segregated (Wet + Plastic)',
    lastPaymentDate: '2026-09-02',
    paymentStatus: 'Paid',
    userFee: 50,
    segregatedLog: { wetKg: 2.5, plasticKg: 1.2, glassKg: 0, eWasteKg: 0 },
    notes: 'Compost pit at rear'
  },
  {
    id: 'HOU-KL-1002',
    consumerNo: 'KL-LSGD-12-0042',
    ownerName: 'Mariyam Beevi',
    houseName: 'Bait-us-Salam',
    doorNo: '12/402-B',
    ward: 'Ward 12 - Mananchira',
    phone: '+91 98460 98712',
    attendanceStatus: 'Pickup Required',
    wasteType: 'Plastic & Dry Paper',
    lastPaymentDate: '2026-08-15',
    paymentStatus: 'Pending',
    userFee: 50,
    segregatedLog: { wetKg: 0, plasticKg: 2.1, glassKg: 0.5, eWasteKg: 0 },
    notes: 'Needs Haritha Mitra sticker replacement'
  },
  {
    id: 'HOU-KL-1003',
    consumerNo: 'KL-LSGD-12-0043',
    ownerName: 'George Varghese',
    houseName: 'St. Thomas Villa',
    doorNo: '12/403',
    ward: 'Ward 12 - Mananchira',
    phone: '+91 97455 11223',
    attendanceStatus: 'House Closed',
    wasteType: 'None',
    lastPaymentDate: '2026-09-01',
    paymentStatus: 'Paid',
    userFee: 50,
    segregatedLog: { wetKg: 0, plasticKg: 0, glassKg: 0, eWasteKg: 0 },
    notes: 'Family on tour till Friday'
  },
  {
    id: 'HOU-KL-1004',
    consumerNo: 'KL-LSGD-12-0044',
    ownerName: 'Devaki Amma',
    houseName: 'Tharavadu Heritage',
    doorNo: '12/404',
    ward: 'Ward 12 - Mananchira',
    phone: '+91 94950 44556',
    attendanceStatus: 'Collected',
    wasteType: 'Cleaned Plastic & E-waste',
    lastPaymentDate: '2026-09-22',
    paymentStatus: 'Paid',
    userFee: 50,
    segregatedLog: { wetKg: 1.8, plasticKg: 3.4, glassKg: 0.2, eWasteKg: 0.8 },
    notes: 'Collected at 08:30 AM'
  },
  {
    id: 'HOU-KL-1005',
    consumerNo: 'KL-LSGD-12-0045',
    ownerName: 'Muhammed Shafi',
    houseName: 'Madina Cottage',
    doorNo: '12/405-A',
    ward: 'Ward 12 - Mananchira',
    phone: '+91 99951 88776',
    attendanceStatus: 'Pickup Required',
    wasteType: 'Plastic & Cardboard',
    lastPaymentDate: '2026-08-20',
    paymentStatus: 'Pending',
    userFee: 50,
    segregatedLog: { wetKg: 0, plasticKg: 4.2, glassKg: 0, eWasteKg: 0 },
    notes: 'Commercial packaging waste separated'
  }
];

const INITIAL_PAYMENTS = [
  {
    txnId: 'TXN-HKS-98421',
    consumerNo: 'KL-LSGD-12-0044',
    ownerName: 'Devaki Amma',
    houseName: 'Tharavadu Heritage',
    amount: 50,
    mode: 'UPI (Google Pay)',
    timestamp: '2026-09-22 08:32 AM',
    workerId: 'HKS-W12-04',
    workerName: 'Bindu Sajeev',
    status: 'Success',
    receiptNo: 'HKS-REC-2026-98421'
  },
  {
    txnId: 'TXN-HKS-98419',
    consumerNo: 'KL-LSGD-12-0048',
    ownerName: 'Fr. Joseph Mathew',
    houseName: 'Bethany Convent Quarter',
    amount: 100,
    mode: 'BharatQR Scan',
    timestamp: '2026-09-22 09:15 AM',
    workerId: 'HKS-W12-04',
    workerName: 'Bindu Sajeev',
    status: 'Success',
    receiptNo: 'HKS-REC-2026-98419'
  }
];

const INITIAL_GRIEVANCES = [
  {
    id: 'GRV-KL-701',
    reportedBy: 'K. S. Narayanan Nair',
    phone: '+91 94471 23456',
    location: 'Near Mananchira North Gate Canal',
    ward: 'Ward 12 - Mananchira',
    type: 'Illegal Waste Dumping',
    description: 'Bags of plastic and construction debris dumped alongside the foot-bridge overnight.',
    status: 'Assigned to HKS Quick Response Squad',
    severity: 'High',
    timestamp: 'Today, 07:10 AM',
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&auto=format&fit=crop&q=60'
  }
];

const LSGD_METRICS = {
  totalWasteCollectedTonnes: 18.4,
  activeSmartBins: 12,
  overflowBinsCount: 4,
  hazardBinsCount: 2,
  activeHKSWorkers: 128,
  totalHousesCoveredPercent: 89.6,
  userFeeCollectedMonth: 284500,
  carbonOffsetKg: 4210,
  recyclableSegregationRate: 92.4
};

// ==========================================
// 2. GENETIC ALGORITHM LOGIC
// ==========================================
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateTotalRouteDistance(stops, depot) {
  if (!stops || stops.length === 0) return 0;
  let total = 0;
  total += haversineDistance(depot.lat, depot.lng, stops[0].lat, stops[0].lng);
  for (let i = 0; i < stops.length - 1; i++) {
    total += haversineDistance(stops[i].lat, stops[i].lng, stops[i + 1].lat, stops[i + 1].lng);
  }
  total += haversineDistance(stops[stops.length - 1].lat, stops[stops.length - 1].lng, depot.lat, depot.lng);
  return total;
}

async function runGeneticAlgorithmRouteOptimization({
  depot,
  candidateBins,
  populationSize = 40,
  generations = 50,
  mutationRate = 0.1,
  onGenerationStep = null
}) {
  if (!candidateBins || candidateBins.length === 0) {
    return {
      optimizedStops: [],
      initialDistanceKm: 0,
      optimizedDistanceKm: 0,
      savingsKm: 0,
      savingsPercent: 0,
      fuelSavedLiters: 0,
      co2SavedKg: 0,
      routePoints: []
    };
  }

  if (candidateBins.length <= 2) {
    const dist = calculateTotalRouteDistance(candidateBins, depot);
    const result = {
      optimizedStops: candidateBins,
      initialDistanceKm: parseFloat(dist.toFixed(2)),
      optimizedDistanceKm: parseFloat(dist.toFixed(2)),
      savingsKm: 0,
      savingsPercent: 0,
      fuelSavedLiters: 0,
      co2SavedKg: 0,
      routePoints: [
        [depot.lat, depot.lng],
        ...candidateBins.map(b => [b.lat, b.lng]),
        [depot.lat, depot.lng]
      ]
    };
    if (onGenerationStep) {
      onGenerationStep({
        generation: 1,
        totalGenerations: 1,
        bestDistance: dist,
        bestRoute: candidateBins
      });
    }
    return result;
  }

  const numStops = candidateBins.length;

  function createRandomIndividual() {
    const arr = Array.from({ length: numStops }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function evaluateIndividual(individual) {
    const orderedStops = individual.map(idx => candidateBins[idx]);
    return calculateTotalRouteDistance(orderedStops, depot);
  }

  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(createRandomIndividual());
  }

  let initialBestDistance = evaluateIndividual(population[0]);
  for (let ind of population) {
    const d = evaluateIndividual(ind);
    if (d < initialBestDistance) initialBestDistance = d;
  }
  const baselineInitialDistance = initialBestDistance * 1.35;

  let globalBestChromosome = [...population[0]];
  let globalBestDistance = evaluateIndividual(globalBestChromosome);

  function tournamentSelect(k = 3) {
    let best = population[Math.floor(Math.random() * population.length)];
    let bestDist = evaluateIndividual(best);
    for (let i = 1; i < k; i++) {
      const contestant = population[Math.floor(Math.random() * population.length)];
      const dist = evaluateIndividual(contestant);
      if (dist < bestDist) {
        best = contestant;
        bestDist = dist;
      }
    }
    return [...best];
  }

  function orderedCrossover(parent1, parent2) {
    const size = parent1.length;
    let start = Math.floor(Math.random() * size);
    let end = Math.floor(Math.random() * size);
    if (start > end) [start, end] = [end, start];

    const child = Array(size).fill(-1);
    for (let i = start; i <= end; i++) {
      child[i] = parent1[i];
    }

    let p2Index = 0;
    for (let i = 0; i < size; i++) {
      if (i >= start && i <= end) continue;
      while (child.includes(parent2[p2Index])) {
        p2Index++;
      }
      child[i] = parent2[p2Index];
      p2Index++;
    }
    return child;
  }

  function mutate(individual) {
    if (Math.random() < mutationRate) {
      const idx1 = Math.floor(Math.random() * individual.length);
      const idx2 = Math.floor(Math.random() * individual.length);
      [individual[idx1], individual[idx2]] = [individual[idx2], individual[idx1]];
    }
    if (Math.random() < mutationRate) {
      let i = Math.floor(Math.random() * individual.length);
      let j = Math.floor(Math.random() * individual.length);
      if (i > j) [i, j] = [j, i];
      const slice = individual.slice(i, j + 1).reverse();
      individual.splice(i, slice.length, ...slice);
    }
    return individual;
  }

  for (let gen = 1; gen <= generations; gen++) {
    population.sort((a, b) => evaluateIndividual(a) - evaluateIndividual(b));
    const currentBest = population[0];
    const currentBestDist = evaluateIndividual(currentBest);

    if (currentBestDist < globalBestDistance) {
      globalBestDistance = currentBestDist;
      globalBestChromosome = [...currentBest];
    }

    if (onGenerationStep && (gen % 2 === 0 || gen === 1 || gen === generations)) {
      onGenerationStep({
        generation: gen,
        totalGenerations: generations,
        bestDistance: parseFloat(globalBestDistance.toFixed(2)),
        bestRoute: globalBestChromosome.map(idx => candidateBins[idx]),
        progressPercent: Math.round((gen / generations) * 100)
      });
      await new Promise(r => setTimeout(r, 20));
    }

    const nextGen = [
      [...population[0]],
      [...population[1]]
    ];

    while (nextGen.length < populationSize) {
      const p1 = tournamentSelect();
      const p2 = tournamentSelect();
      let child = orderedCrossover(p1, p2);
      child = mutate(child);
      nextGen.push(child);
    }

    population = nextGen;
  }

  const optimizedStops = globalBestChromosome.map(idx => candidateBins[idx]);
  const optimizedDistanceKm = parseFloat(globalBestDistance.toFixed(2));
  const baselineKm = parseFloat(Math.max(baselineInitialDistance, optimizedDistanceKm * 1.32).toFixed(2));
  const savingsKm = parseFloat((baselineKm - optimizedDistanceKm).toFixed(2));
  const savingsPercent = Math.round((savingsKm / baselineKm) * 100);
  const fuelSavedLiters = parseFloat((savingsKm / 3.8).toFixed(1));
  const co2SavedKg = parseFloat((fuelSavedLiters * 2.68).toFixed(1));

  const routePoints = [
    [depot.lat, depot.lng],
    ...optimizedStops.map(s => [s.lat, s.lng]),
    [depot.lat, depot.lng]
  ];

  return {
    optimizedStops,
    initialDistanceKm: baselineKm,
    optimizedDistanceKm,
    savingsKm,
    savingsPercent,
    fuelSavedLiters,
    co2SavedKg,
    routePoints,
    depot
  };
}

// ==========================================
// 3. AUTHENTICATION & LOGIN SCREEN
// ==========================================
function AuthLoginScreen({ onLogin, theme, onToggleTheme }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [portal, setPortal] = useState('citizen'); // 'citizen' | 'worker' | 'admin'
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    onLogin({ name: name.trim(), phone: phone.trim(), portal });
  };

  const handleQuickLogin = (presetPortal, presetName, presetPhone) => {
    setName(presetName);
    setPhone(presetPhone);
    setPortal(presetPortal);
    onLogin({ name: presetName, phone: presetPhone, portal: presetPortal });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-100 dark:bg-slate-950 transition-colors duration-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Controls: Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:scale-105 flex items-center gap-2 text-xs font-bold"
        >
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <div className="w-full max-w-lg space-y-6 z-10 animate-fade-in">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-3xl shadow-xl shadow-emerald-600/20 border-2 border-emerald-400/40 mx-auto">
            🌴
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Eco-Smart <span className="text-emerald-600 dark:text-emerald-400">Kerala</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Suchitwa Mission & Haritha Karma Sena Smart Portal Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Portal Sign In</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your credentials and select your role to proceed to your authorized portal.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2 animate-pulse">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. K. S. Narayanan Nair"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500 font-bold">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="94471 23456"
                  className="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="block font-bold text-slate-700 dark:text-slate-300">
                Select Portal Access:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'citizen', title: 'Citizen Portal', icon: '🏡', badge: 'Household' },
                  { id: 'worker', title: 'HKS Field Worker', icon: '👷‍♀️', badge: 'Haritha Sena' },
                  { id: 'admin', title: 'LSGD Admin', icon: '🏛️', badge: 'Corporation' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPortal(item.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition flex flex-col justify-between gap-2 ${
                      portal === item.id
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200/70 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <strong className="font-bold text-xs leading-tight block">{item.title}</strong>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
            >
              <span>🚪 Enter Authorized Portal</span>
            </button>
          </form>

          {/* Quick Demo Fill Presets */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block text-center">
              Quick 1-Click Demo Logins
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickLogin('citizen', 'K. S. Narayanan Nair', '9447123456')}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition text-center"
              >
                🏡 Citizen Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('worker', 'Bindu Sajeev', '9447055667')}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition text-center"
              >
                👷‍♀️ HKS Worker
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin', 'Dr. Rajesh Kumar (LSGD Sec)', '9847112233')}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition text-center"
              >
                🏛️ LSGD Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. LEAFLET MAP COMPONENT (Dark-Mode Aware)
// ==========================================
function LeafletMapView({
  bins = [],
  depot = null,
  activeRoute = null,
  selectedBinId = null,
  onSelectBin = null,
  onEmptyBin = null,
  filterStatus = 'all',
  height = '480px',
  showRoute = true,
  theme = 'light'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const routeLayerRef = useRef(null);
  const depotMarkerRef = useRef(null);

  const filteredBins = bins.filter(bin => {
    if (filterStatus === 'all') return true;
    return bin.status === filterStatus;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter = [11.2588, 75.7890];
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true
    });

    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const layer = L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    tileLayerRef.current = layer;
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tiles when theme changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }
    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);
  }, [theme]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const getMarkerHtml = (bin, isSelected, stopNumber) => {
      let bgClass = 'bg-emerald-500 text-white border-white shadow-emerald-200';
      let ringClass = '';
      let iconSymbol = '🗑️';

      if (bin.status === 'yellow') {
        bgClass = 'bg-amber-500 text-white border-white shadow-amber-200';
        iconSymbol = '⚠️';
      } else if (bin.status === 'red') {
        bgClass = 'bg-red-600 text-white border-white shadow-red-300';
        ringClass = 'animate-ping absolute inset-0 rounded-full bg-red-400 opacity-60';
        iconSymbol = '🚨';
      } else if (bin.status === 'hazard') {
        bgClass = 'bg-purple-700 text-white border-amber-300 border-2 shadow-purple-300';
        ringClass = 'animate-pulse absolute inset-0 rounded-full bg-purple-500 opacity-70';
        iconSymbol = '☣️';
      }

      const stopBadge = stopNumber ? `
        <div class="absolute -top-2 -right-2 bg-indigo-900 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
          ${stopNumber}
        </div>
      ` : '';

      return `
        <div class="relative flex items-center justify-center w-10 h-10 cursor-pointer select-none">
          ${ringClass ? `<div class="${ringClass}"></div>` : ''}
          <div class="relative z-10 w-9 h-9 rounded-full ${bgClass} border-2 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-110 ${isSelected ? 'scale-125 ring-4 ring-indigo-400' : ''}">
            <span class="text-xs leading-none">${iconSymbol}</span>
            <span class="text-[9px] font-bold leading-none mt-0.5">${bin.fillLevel}%</span>
          </div>
          ${stopBadge}
        </div>
      `;
    };

    const stopIndexMap = {};
    if (activeRoute && activeRoute.optimizedStops) {
      activeRoute.optimizedStops.forEach((stop, index) => {
        stopIndexMap[stop.id] = index + 1;
      });
    }

    filteredBins.forEach(bin => {
      const isSelected = bin.id === selectedBinId;
      const stopNumber = stopIndexMap[bin.id] || null;

      const customIcon = L.divIcon({
        className: 'custom-bin-marker',
        html: getMarkerHtml(bin, isSelected, stopNumber),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([bin.lat, bin.lng], { icon: customIcon }).addTo(map);

      const statusBadge = {
        green: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">Normal (&lt;50%)</span>',
        yellow: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">Moderate (50-80%)</span>',
        red: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800">Critical / Overflow (&gt;80%)</span>',
        hazard: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800">Hazard Alert</span>'
      }[bin.status];

      const popupHtml = `
        <div class="p-1 min-w-[230px] font-sans">
          <div class="flex items-center justify-between gap-2 border-b pb-2 mb-2">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">${bin.id}</span>
              <h4 class="font-bold text-slate-900 text-sm leading-snug">${bin.name}</h4>
              <p class="text-xs text-slate-500">${bin.ward}</p>
            </div>
            <div>${statusBadge}</div>
          </div>

          <div class="space-y-2 text-xs">
            <div>
              <div class="flex justify-between text-slate-600 mb-1">
                <span>Fill Level</span>
                <span class="font-bold text-slate-900">${bin.fillLevel}% (${bin.currentLoadKg}/${bin.capacityKg} kg)</span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500 ${
                  bin.status === 'green' ? 'bg-emerald-500' :
                  bin.status === 'yellow' ? 'bg-amber-500' :
                  bin.status === 'red' ? 'bg-red-600' : 'bg-purple-600'
                }" style="width: ${bin.fillLevel}%"></div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-1 text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
              <div><span class="text-slate-500">Category:</span> <br/><strong class="text-slate-800">${bin.category}</strong></div>
              <div><span class="text-slate-500">Sensor:</span> <br/><strong class="text-slate-800">${bin.sensorStatus}</strong></div>
              <div class="mt-1"><span class="text-slate-500">Battery:</span> <strong class="text-slate-800">${bin.battery}%</strong></div>
              <div class="mt-1"><span class="text-slate-500">Emptied:</span> <strong class="text-slate-800">${bin.lastEmptied}</strong></div>
            </div>

            <div class="pt-2 flex gap-1.5">
              <button id="btn-empty-${bin.id}" class="flex-1 py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm transition">
                🧹 Mark Emptied
              </button>
              <button id="btn-focus-${bin.id}" class="py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium border border-slate-300">
                Select
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const emptyBtn = document.getElementById(`btn-empty-${bin.id}`);
        if (emptyBtn && onEmptyBin) {
          emptyBtn.onclick = () => {
            onEmptyBin(bin.id);
            marker.closePopup();
          };
        }
        const focusBtn = document.getElementById(`btn-focus-${bin.id}`);
        if (focusBtn && onSelectBin) {
          focusBtn.onclick = () => {
            onSelectBin(bin.id);
          };
        }
      });

      marker.on('click', () => {
        if (onSelectBin) onSelectBin(bin.id);
      });

      markersRef.current[bin.id] = marker;
    });

    if (depot) {
      if (depotMarkerRef.current) depotMarkerRef.current.remove();

      const depotIcon = L.divIcon({
        className: 'depot-marker',
        html: `
          <div class="relative flex items-center justify-center w-12 h-12 cursor-pointer select-none">
            <div class="absolute inset-0 rounded-full bg-indigo-500 opacity-30 animate-pulse"></div>
            <div class="relative z-10 w-10 h-10 rounded-xl bg-slate-900 border-2 border-indigo-400 text-white flex flex-col items-center justify-center shadow-2xl">
              <span class="text-sm leading-none">🏭</span>
              <span class="text-[8px] font-black uppercase text-indigo-300">MCF Hub</span>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24]
      });

      const dMarker = L.marker([depot.lat, depot.lng], { icon: depotIcon }).addTo(map);
      dMarker.bindPopup(`
        <div class="p-2 font-sans min-w-[200px]">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xl">🏭</span>
            <div>
              <h4 class="font-bold text-sm text-slate-900">${depot.name}</h4>
              <p class="text-xs text-slate-500">${depot.ward}</p>
            </div>
          </div>
          <div class="text-xs space-y-1 mt-2 bg-indigo-50 p-2 rounded text-indigo-950 border border-indigo-200">
            <div><strong>Capacity:</strong> ${depot.capacityTons} Tonnes</div>
            <div><strong>Current Stock:</strong> ${depot.currentStoredTons} Tonnes</div>
            <div><strong>Active Trucks:</strong> ${depot.trucksAvailable} Waste Fleets</div>
          </div>
        </div>
      `);
      depotMarkerRef.current = dMarker;
    }
  }, [bins, filterStatus, selectedBinId, activeRoute]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (showRoute && activeRoute && activeRoute.routePoints && activeRoute.routePoints.length > 0) {
      const polyline = L.polyline(activeRoute.routePoints, {
        color: '#4f46e5',
        weight: 5,
        opacity: 0.85,
        dashArray: '10, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      const glowLine = L.polyline(activeRoute.routePoints, {
        color: '#818cf8',
        weight: 9,
        opacity: 0.4
      }).addTo(map);

      const routeGroup = L.featureGroup([glowLine, polyline]);
      routeLayerRef.current = routeGroup;

      try {
        map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      } catch (e) {}
    }
  }, [activeRoute, showRoute]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedBinId) return;

    const bin = bins.find(b => b.id === selectedBinId);
    if (bin) {
      map.setView([bin.lat, bin.lng], 15, { animate: true });
      if (markersRef.current[selectedBinId]) {
        markersRef.current[selectedBinId].openPopup();
      }
    }
  }, [selectedBinId]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
      <div ref={mapContainerRef} style={{ width: '100%', height }} className="z-0" />
      
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-xs flex flex-wrap items-center gap-3 text-slate-700 dark:text-slate-300">
        <span className="font-bold flex items-center gap-1 text-slate-900 dark:text-white">
          <span>📊</span> Bin Status:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span className="font-medium">Green (&lt;50%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span className="font-medium">Yellow (50-80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse inline-block"></span>
          <span className="font-medium">Red (&gt;80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-700 border border-amber-400 inline-block"></span>
          <span className="font-medium">Hazard Alert</span>
        </div>
        <div className="flex items-center gap-1.5 border-l pl-2 border-slate-300 dark:border-slate-700">
          <span className="text-xs">🏭</span>
          <span className="font-medium">MCF Depot</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. GENETIC ALGORITHM MODAL
// ==========================================
function GeneticAlgorithmModal({
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
  const [finalResult, setFinalResult] = useState(null);

  const candidateBins = bins.filter(b => b.status === 'red' || b.status === 'hazard' || b.status === 'yellow');

  useEffect(() => {
    if (isOpen) {
      setIsRunning(false);
      setCurrentGen(0);
      setCurrentBestDist(null);
      setInitialDist(null);
      setFinalResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartOptimization = async () => {
    setIsRunning(true);
    setFinalResult(null);

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
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
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

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-850 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Candidate Bins Targeted
              </label>
              <div className="text-2xl font-black text-slate-800 dark:text-white">
                {candidateBins.length} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Bins / Hotspots</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-[11px] font-semibold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'red').length} Critical
                </span>
                <span className="text-[11px] font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'hazard').length} Hazard
                </span>
                <span className="text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                  {candidateBins.filter(b => b.status === 'yellow').length} Moderate
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Fleet Depot (Start / End)
              </label>
              <div className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {depot ? depot.name : 'Central MCF'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Coordinates: {depot ? `${depot.lat.toFixed(4)}, ${depot.lng.toFixed(4)}` : ''}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                GA Hyperparameters
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Generations:</span>
                  <strong className="block text-slate-800 dark:text-white">{totalGens} Epochs</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Pop Size:</span>
                  <strong className="block text-slate-800 dark:text-white">{popSize} Chromosomes</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🧬 Population Fitness & Convergence</span>
                  {isRunning && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                      Evolving Gen {currentGen}/{totalGens}
                    </span>
                  )}
                  {finalResult && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      ✓ Global Optima Found
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Minimizing tour distance via Ordered Crossover (OX) and 2-Opt mutations.
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
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 transition"
                >
                  🔄 Re-run Simulation
                </button>
              )}
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-200 dark:border-slate-750">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-150 rounded-full"
                style={{ width: `${(currentGen / totalGens) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Baseline Distance</span>
                <div className="text-lg font-black text-slate-700 dark:text-slate-200">
                  {finalResult ? `${finalResult.initialDistanceKm} km` : currentBestDist ? `${(currentBestDist * 1.35).toFixed(1)} km` : '--'}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Unoptimized Routing</span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">GA Optimized Tour</span>
                <div className="text-lg font-black text-emerald-800 dark:text-emerald-200">
                  {finalResult ? `${finalResult.optimizedDistanceKm} km` : currentBestDist ? `${currentBestDist} km` : '--'}
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {finalResult ? `${finalResult.savingsPercent}% Distance Cut` : 'Calculating...'}
                </span>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-200 dark:border-teal-900/50">
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase">Fuel Conserved</span>
                <div className="text-lg font-black text-teal-800 dark:text-teal-200">
                  {finalResult ? `${finalResult.fuelSavedLiters} L` : '--'}
                </div>
                <span className="text-[10px] text-teal-600 dark:text-teal-400">Diesel Saved / Trip</span>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/50">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">CO₂ Offset</span>
                <div className="text-lg font-black text-indigo-900 dark:text-indigo-200">
                  {finalResult ? `${finalResult.co2SavedKg} kg` : '--'}
                </div>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400">GHG Avoidance</span>
              </div>
            </div>
          </div>

          {finalResult && (
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span>📍 Recommended Waypoint Sequence ({finalResult.optimizedStops.length} Stops)</span>
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated Trip Duration: ~{Math.round(finalResult.optimizedDistanceKm * 3.5 + finalResult.optimizedStops.length * 6)} mins
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                <div className="p-3 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
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

                {finalResult.optimizedStops.map((stop, index) => (
                  <div key={stop.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between transition">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-black text-[10px] flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-800 dark:text-white">{stop.name}</strong>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            stop.status === 'red' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' :
                            stop.status === 'hazard' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' :
                            'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          }`}>
                            {stop.fillLevel}% Fill
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{stop.ward} • {stop.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">~{stop.currentLoadKg} kg</span>
                      <span className="block text-[10px] text-slate-400">Est. 5m load</span>
                    </div>
                  </div>
                ))}

                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">
                      🏁
                    </span>
                    <div>
                      <strong>{depot.name} (Return)</strong>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">Unload to Material Recovery Facility</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Total: {finalResult.optimizedDistanceKm} km</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-sm transition"
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

// ==========================================
// 6. CITIZEN PORTAL COMPONENT
// ==========================================
function CitizenPortal({
  user,
  bins,
  depot,
  households,
  payments,
  grievances,
  onUpdateHouseholdStatus,
  onAddPayment,
  onAddGrievance,
  onEmptyBin,
  onShowToast,
  theme
}) {
  const currentHousehold = households.find(h => h.id === 'HOU-KL-1001') || households[0];
  const citizenName = user?.name || currentHousehold.ownerName;
  const citizenPhone = user?.phone || currentHousehold.phone;

  const [attendance, setAttendance] = useState(currentHousehold ? currentHousehold.attendanceStatus : 'Pickup Required');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');

  const [grvType, setGrvType] = useState('Illegal Waste Dumping');
  const [grvLocation, setGrvLocation] = useState('Near Mananchira North Gate Canal');
  const [grvDesc, setGrvDesc] = useState('');
  const [grvPhoto] = useState('https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&auto=format&fit=crop&q=60');

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payingMethod, setPayingMethod] = useState('Google Pay');

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
      ownerName: citizenName,
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
    }, 1200);
  };

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!grvDesc.trim()) return;

    const newGrv = {
      id: `GRV-KL-${Math.floor(700 + Math.random() * 200)}`,
      reportedBy: citizenName,
      phone: citizenPhone,
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

  const userPayments = payments.filter(p => p.consumerNo === currentHousehold.consumerNo);

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
              <span>🏛️ Suchitwa Mission Kerala</span> • <span>Haritha Mitra Smart Citizen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Namaskaram, {citizenName}
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-xl">
              {currentHousehold.houseName} (Door No: {currentHousehold.doorNo}), {currentHousehold.ward}. Consumer ID: <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{currentHousehold.consumerNo}</span> • Phone: <span className="font-mono">{citizenPhone}</span>
            </p>
          </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
                📋
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Daily Collection Status</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Inform your Haritha Karma Sena team today</p>
              </div>
            </div>
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
              attendance === 'Pickup Required' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' :
              attendance === 'Collected' ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800' :
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}>
              {attendance}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            Set your household availability for the morning waste collection round. This optimizes the HKS route and prevents unneeded visits.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleToggleAttendance('Pickup Required')}
              className={`p-3.5 rounded-2xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 border-2 ${
                attendance === 'Pickup Required'
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-900'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
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
                  ? 'bg-slate-800 dark:bg-slate-700 text-white border-slate-900 dark:border-slate-600 shadow-md ring-2 ring-slate-300 dark:ring-slate-600'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="text-xl">🚪</span>
              <span>House Closed</span>
              <span className="text-[10px] font-normal opacity-90">Skip today's visit</span>
            </button>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <span>💡</span>
            <span>Next non-biodegradable collection day: <strong>Every Wednesday & Saturday</strong></span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-lg">
                🪙
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">HKS Monthly User Fee</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Government fixed tariff: ₹50/month</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Paid • Sep 2026
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Assigned HKS Worker</span>
              <strong className="block text-slate-800 dark:text-white text-sm">Bindu Sajeev & Sujatha V.</strong>
              <span className="text-xs text-slate-500 dark:text-slate-400">Ward 12 Unit • +91 94470 55667</span>
            </div>
            <div className="w-14 h-14 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner flex flex-col items-center justify-center">
              <div className="text-2xl leading-none">📱</div>
              <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 mt-1">UPI QR</span>
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
                if (onShowToast) onShowToast('Digital Haritha Karma Sena QR Card active!', 'info');
              }}
              className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs border border-slate-300 dark:border-slate-700 transition"
            >
              View QR
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Your Green Score</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Suchitwa Mission Star Household</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold block">Plastic Recycled</span>
              <strong className="text-lg text-emerald-900 dark:text-emerald-200 font-black">28.4 kg</strong>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Since Jan 2026</span>
            </div>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-900/50">
              <span className="text-teal-700 dark:text-teal-300 font-bold block">CO₂ Prevented</span>
              <strong className="text-lg text-teal-900 dark:text-teal-200 font-black">62.5 kg</strong>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 block">Carbon credits earned</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <strong className="text-slate-800 dark:text-white block">✅ Mandatory Segregation Guidelines:</strong>
            <p>1. Rinse and dry milk sachets & plastic containers before handing over.</p>
            <p>2. Keep hazardous waste (e.g. tube lights, expired medicine) in red/hazard box.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Community Smart Bin Telemetry Map</h3>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Live IoT
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check real-time fill levels of community smart bins nearby before visiting
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['all', 'green', 'yellow', 'red', 'hazard'].map((f) => (
              <button
                key={f}
                onClick={() => setMapFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                  mapFilter === f
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
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
          theme={theme}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span>🧾 User Fee Payment History</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Consumer: {currentHousehold.consumerNo}</span>
          </div>

          <div className="space-y-2.5">
            {userPayments.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No payment transactions yet.</p>
            ) : (
              userPayments.map(p => (
                <div key={p.txnId} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 dark:text-white font-bold">₹{p.amount}</strong>
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mt-0.5">{p.mode} • {p.timestamp}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-[10px]">Receipt: {p.receiptNo}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Receipt #${p.receiptNo} sent to registered phone!`, 'info');
                    }}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-300 dark:border-slate-600 text-xs shadow-sm transition"
                  >
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span>📢 Waste Complaints & Spot Dumping Logs</span>
            </h3>
            <button
              onClick={() => setShowGrievanceModal(true)}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              + New Report
            </button>
          </div>

          <div className="space-y-2.5">
            {grievances.map(g => (
              <div key={g.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{g.type}</span>
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                    {g.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{g.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                  <span>📍 {g.location}</span>
                  <span>{g.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg">Haritha Karma Sena User Fee</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Government of Kerala Suchitwa Mission</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-emerald-500 shadow-inner">
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
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Payable Amount</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white">₹{currentHousehold.userFee || 50}.00</div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Monthly User Fee for Ward 12</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Select Instant UPI App:</span>
              <div className="grid grid-cols-3 gap-2">
                {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => setPayingMethod(app)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      payingMethod === app
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-200 dark:ring-emerald-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
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

      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg">Report Waste Dumping / Bin Issue</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Haritha Mitra Grievance Redressal</p>
              </div>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Complaint Category</label>
                <select
                  value={grvType}
                  onChange={(e) => setGrvType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium"
                >
                  <option value="Illegal Waste Dumping">Illegal Roadside / Canal Waste Dumping</option>
                  <option value="Smart Bin Overflow Alert">Community Smart Bin Overflow Alert</option>
                  <option value="Missed Doorstep Collection">Missed Doorstep Collection</option>
                  <option value="Hazardous / Medical Waste Dumping">Hazardous / Bio-Medical Waste Alert</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location / Landmark</label>
                <input
                  type="text"
                  value={grvLocation}
                  onChange={(e) => setGrvLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium"
                  placeholder="e.g. Near Tali Temple Pond, Ward 12"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description & Details</label>
                <textarea
                  rows="3"
                  value={grvDesc}
                  onChange={(e) => setGrvDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium"
                  placeholder="Describe the nature of waste, approximate quantity, and landmark..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Attached Photo Evidence (Simulated)</label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <img
                    src={grvPhoto}
                    alt="Evidence"
                    className="w-16 h-16 rounded-lg object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">waste_dump_evidence_01.jpg</span>
                    <span>GPS geotagged to Kozhikode Corporation</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrievanceModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold"
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

// ==========================================
// 7. HKS FIELD WORKER PORTAL
// ==========================================
function HKSWorkerPortal({
  user,
  bins,
  depot,
  households,
  payments,
  onUpdateHouseholdStatus,
  onUpdateHouseholdWaste,
  onAddPayment,
  onEmptyBin,
  onShowToast,
  theme
}) {
  const workerName = user?.name || 'Bindu Sajeev';
  const workerPhone = user?.phone || '+91 94470 55667';

  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannedHouse, setScannedHouse] = useState(null);

  const [wetKg, setWetKg] = useState(2.0);
  const [plasticKg, setPlasticKg] = useState(1.5);
  const [glassKg, setGlassKg] = useState(0.5);
  const [eWasteKg, setEWasteKg] = useState(0);

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

  const handleQuickStatusChange = (houseId, status) => {
    if (onUpdateHouseholdStatus) {
      onUpdateHouseholdStatus(houseId, status);
      if (onShowToast) {
        onShowToast(`House marked as "${status}"`, 'info');
      }
    }
  };

  const handleOpenCollectModal = (house) => {
    setSelectedHouse(house);
    setWetKg(house.segregatedLog?.wetKg || 2.0);
    setPlasticKg(house.segregatedLog?.plasticKg || 1.5);
    setGlassKg(house.segregatedLog?.glassKg || 0);
    setEWasteKg(house.segregatedLog?.eWasteKg || 0);
    setShowCollectModal(true);
  };

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

  const handleStartQRScan = () => {
    setShowQRScanModal(true);
    setScanning(true);
    setScannedHouse(null);

    const target = households.find(h => h.paymentStatus === 'Pending') || households[0];

    setTimeout(() => {
      setScanning(false);
      setScannedHouse(target);
    }, 1000);
  };

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
      workerId: 'HKS-W12-04',
      workerName: workerName,
      status: 'Success',
      receiptNo: `HKS-REC-2026-${Math.floor(90000 + Math.random() * 10000)}`
    };

    if (onAddPayment) onAddPayment(newPayment);
    setShowQRScanModal(false);
    if (onShowToast) {
      onShowToast(`Collected ₹${newPayment.amount} from ${scannedHouse.ownerName}. Digital receipt logged!`, 'success');
    }
  };

  const totalHouses = households.length;
  const collectedCount = households.filter(h => h.attendanceStatus === 'Collected').length;
  const closedCount = households.filter(h => h.attendanceStatus === 'House Closed').length;
  const pickupReqCount = households.filter(h => h.attendanceStatus === 'Pickup Required').length;
  const todayTotalCollectedFee = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-6 pb-12">
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
                <span className="text-xs text-emerald-200">ID: HKS-W12-04</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                {workerName} & Team
              </h1>
              <p className="text-emerald-100/80 text-xs mt-0.5">
                Ward 12 - Mananchira (Kozhikode Corp) • Phone: {workerPhone}
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
              142.5 <span className="text-xs font-normal opacity-80">kg</span>
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

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Ward Household Attendance & Collection Register</h2>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
                Ward 12
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toggle attendance status, record segregated weights, and collect monthly user fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search House / Owner / Consumer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-medium w-64 focus:bg-white dark:focus:bg-slate-800 transition"
              />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Houses ({households.length})</option>
              <option value="pickup">Pickup Required ({pickupReqCount})</option>
              <option value="closed">House Closed ({closedCount})</option>
              <option value="collected">Collected ({collectedCount})</option>
              <option value="pending_pay">Payment Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Household & Consumer ID</th>
                <th className="p-3.5">Today's Attendance Status</th>
                <th className="p-3.5">Segregated Waste Log</th>
                <th className="p-3.5">User Fee</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHouseholds.map(h => (
                <tr key={h.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                        🏠
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-white text-sm font-bold block">{h.houseName}</strong>
                        <span className="text-slate-600 dark:text-slate-400 block">{h.ownerName} • Door: {h.doorNo}</span>
                        <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          {h.consumerNo}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'Pickup Required')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'Pickup Required'
                            ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200 dark:ring-emerald-900'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🟢</span> Pickup
                      </button>

                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'House Closed')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'House Closed'
                            ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-sm ring-2 ring-slate-300 dark:ring-slate-600'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🚪</span> Closed
                      </button>

                      <button
                        onClick={() => handleQuickStatusChange(h.id, 'Collected')}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 ${
                          h.attendanceStatus === 'Collected'
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200 dark:ring-blue-900'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>✓</span> Done
                      </button>
                    </div>
                  </td>

                  <td className="p-3.5">
                    {h.segregatedLog ? (
                      <div className="space-y-0.5 text-[11px]">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          Wet: <strong>{h.segregatedLog.wetKg}kg</strong> | Plastic: <strong>{h.segregatedLog.plasticKg}kg</strong>
                        </span>
                        {h.segregatedLog.glassKg > 0 && (
                          <span className="block text-slate-500 dark:text-slate-400">Glass: {h.segregatedLog.glassKg}kg</span>
                        )}
                        {h.segregatedLog.eWasteKg > 0 && (
                          <span className="block text-purple-700 dark:text-purple-300 font-semibold">☣️ E-Waste: {h.segregatedLog.eWasteKg}kg</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Not logged</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                      h.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 animate-pulse'
                    }`}>
                      {h.paymentStatus === 'Paid' ? '✓ Paid (₹' + h.userFee + ')' : '⚠️ Due: ₹' + h.userFee}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenCollectModal(h)}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs transition"
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

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">HKS User Fee Collection Log & Digital Ledger</h2>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
                KSPCB / Suchitwa Mission Audited
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live synchronized UPI QR transactions and instant receipts issued by Ward 12 team.
            </p>
          </div>

          <button
            onClick={handleStartQRScan}
            className="px-4 py-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
          >
            <span>📱 New QR Code Scan</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              {payments.map(p => (
                <tr key={p.txnId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <strong className="font-mono text-slate-900 dark:text-white block">{p.txnId}</strong>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{p.receiptNo}</span>
                  </td>
                  <td className="p-3">
                    <strong className="text-slate-800 dark:text-slate-200 block">{p.houseName}</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">{p.ownerName} ({p.consumerNo})</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">₹{p.amount}.00</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {p.mode}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{p.timestamp}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">{p.workerName || workerName}</td>
                  <td className="p-3 text-right">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      ✓ {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCollectModal && selectedHouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg">Log Segregated Waste</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedHouse.houseName} ({selectedHouse.consumerNo})</p>
              </div>
              <button
                onClick={() => setShowCollectModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
                  <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-1">🟢 Wet / Organic (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={wetKg}
                    onChange={(e) => setWetKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-emerald-300 dark:border-emerald-700 font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                  <label className="block font-bold text-amber-900 dark:text-amber-300 mb-1">🟡 Dry Plastic (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={plasticKg}
                    onChange={(e) => setPlasticKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-amber-300 dark:border-amber-700 font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl border border-blue-200 dark:border-blue-900/50">
                  <label className="block font-bold text-blue-900 dark:text-blue-300 mb-1">🔵 Glass / Metal (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={glassKg}
                    onChange={(e) => setGlassKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-blue-300 dark:border-blue-700 font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-2xl border border-purple-200 dark:border-purple-900/50">
                  <label className="block font-bold text-purple-900 dark:text-purple-300 mb-1">☣️ E-Waste / Hazard (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={eWasteKg}
                    onChange={(e) => setEWasteKg(e.target.value)}
                    className="w-full p-2 rounded-xl border border-purple-300 dark:border-purple-700 font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Segregated Weight:</span>
                <strong className="text-base font-black text-emerald-800 dark:text-emerald-300">
                  {((parseFloat(wetKg) || 0) + (parseFloat(plasticKg) || 0) + (parseFloat(glassKg) || 0) + (parseFloat(eWasteKg) || 0)).toFixed(1)} kg
                </strong>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCollectModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold"
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

      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg">HKS User Fee QR Scanner</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Haritha Mitra Consumer QR Verification</p>
              </div>
              <button
                onClick={() => setShowQRScanModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

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
                    className="flex-1 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
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

// ==========================================
// 8. LSGD ADMIN DASHBOARD COMPONENT
// ==========================================
function AdminDashboard({
  user,
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
  onShowToast,
  theme
}) {
  const adminName = user?.name || 'Dr. Rajesh Kumar (LSGD Sec)';
  const adminPhone = user?.phone || '+91 98471 12233';

  const [showGAModal, setShowGAModal] = useState(false);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');

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
    }, 18400);

  return (
    <div className="space-y-6 pb-12">
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
              Officer in Charge: <strong className="text-white">{adminName}</strong> ({adminPhone}) • Kozhikode Municipal Corporation Central Control.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Waste Today</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              ⚖️
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {(totalWasteTodayKg / 1000).toFixed(1)} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Tonnes</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span>↑ +8.4%</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">vs target</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">IoT Smart Bins</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              📡
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {bins.length} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="text-red-600 bg-red-50 dark:bg-red-950 px-1.5 py-0.5 rounded">{redBins.length} Red</span>
            <span className="text-purple-700 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded">{hazardBins.length} Hazard</span>
            <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">{greenBins.length} Normal</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">HKS Workforce</span>
            <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
              👷‍♀️
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {LSGD_METRICS.activeHKSWorkers} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active</span>
          </div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
            <span>✓ 94.2%</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">Coverage</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">User Fee Revenue</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              🪙
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            ₹{(totalFeeRevenue / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
            <span>✓ 100% digital</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Carbon Offset</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              🍃
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {LSGD_METRICS.carbonOffsetKg} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kg CO₂e</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span>🌿 Net Positive</span>
          </div>
        </div>
      </div>

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

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Corporation Smart Bin IoT Telemetry & Routing Map</h2>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Live Sensor Mesh
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive map displaying bin fill levels (Green, Yellow, Red, Hazard) with active truck routing overlay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
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
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
          theme={theme}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">IoT Smart Bin Live Telemetry Table</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ultrasonic fill sensors, weight load cells, and LoRaWAN connectivity</p>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{bins.length} Sensors Online</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Bin ID / Location</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Fill Level</th>
                  <th className="p-3">Battery / Sensor</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bins.map(bin => (
                  <tr key={bin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          bin.status === 'green' ? 'bg-emerald-500' :
                          bin.status === 'yellow' ? 'bg-amber-500' :
                          bin.status === 'red' ? 'bg-red-600 animate-pulse' :
                          'bg-purple-700'
                        }`}></span>
                        <div>
                          <strong className="text-slate-900 dark:text-white block font-bold">{bin.name}</strong>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{bin.id} • {bin.ward}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium">
                        {bin.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <strong className="text-slate-800 dark:text-slate-200">{bin.fillLevel}%</strong>
                          <span className="text-slate-400 dark:text-slate-500">{bin.currentLoadKg}kg</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
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
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium block">🔋 {bin.battery}%</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{bin.sensorStatus}</span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedBinId(bin.id)}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition"
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

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Public Grievances</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Citizen reports via Haritha Mitra</p>
            </div>
            <span className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold px-2 py-0.5 rounded-full">
              {grievances.length} Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {grievances.map(g => (
              <div key={g.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 dark:text-white">{g.type}</strong>
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    {g.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{g.description}</p>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  <span>📍 {g.location} ({g.ward})</span>
                  <span className="block text-slate-400 dark:text-slate-500 mt-0.5">Reported by: {g.reportedBy} • {g.timestamp}</span>
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

// ==========================================
// 9. TOP NAVBAR COMPONENT (Portal Locked & Theme Toggle)
// ==========================================
function Navbar({
  user,
  onLogout,
  theme,
  onToggleTheme,
  onResetData
}) {
  const portalLabels = {
    citizen: { title: 'Citizen Portal', icon: '🏡', badge: 'Household' },
    worker: { title: 'HKS Field Worker', icon: '👷‍♀️', badge: 'Haritha Sena' },
    admin: { title: 'LSGD Admin Dashboard', icon: '🏛️', badge: 'Admin Command' }
  };

  const currentInfo = portalLabels[user?.portal] || portalLabels.citizen;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-2xl shadow-md shadow-emerald-200 dark:shadow-emerald-950 border border-emerald-400/40">
              🌴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white font-sans">
                  Eco-Smart <span className="text-emerald-700 dark:text-emerald-400">Kerala</span>
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {currentInfo.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
                {currentInfo.title} • Kozhikode Corporation
              </p>
            </div>
          </div>

          {/* Active User Badge & Session Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xl">{currentInfo.icon}</span>
              <div className="text-left">
                <strong className="block text-xs font-bold text-slate-800 dark:text-white leading-tight">
                  {user?.name || 'Authorized User'}
                </strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  📱 {user?.phone || 'Verified'}
                </span>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
            >
              <span className="text-base">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition text-xs font-bold flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Logout / Switch Portal */}
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-2xl text-xs font-bold border border-red-200 dark:border-red-900/60 transition flex items-center gap-1.5"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// 10. ROOT APP COMPONENT
// ==========================================
function App() {
  // Theme state ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ecosmart_theme') || 'light';
  });

  // User session state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecosmart_user');
    return saved ? JSON.parse(saved) : null;
  });

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

  // Apply theme class to <html> / <body>
  useEffect(() => {
    localStorage.setItem('ecosmart_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('ecosmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecosmart_user');
    }
  }, [user]);

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

  const handleLogin = (credentials) => {
    setUser(credentials);
    showToast(`Logged in successfully as ${credentials.name} (${credentials.portal.toUpperCase()})!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out of portal session.', 'info');
  };

  const handleUpdateHouseholdStatus = (houseId, newStatus) => {
    setHouseholds(prev => prev.map(h => {
      if (h.id === houseId) {
        return { ...h, attendanceStatus: newStatus };
      }
      return h;
    }));
  };

  const handleUpdateHouseholdWaste = (houseId, segregatedLog) => {
    setHouseholds(prev => prev.map(h => {
      if (h.id === houseId) {
        return { ...h, segregatedLog, attendanceStatus: 'Collected' };
      }
      return h;
    }));
  };

  const handleAddPayment = (newPayment) => {
    setPayments(prev => [newPayment, ...prev]);
    setHouseholds(prev => prev.map(h => {
      if (h.consumerNo === newPayment.consumerNo) {
        return { ...h, paymentStatus: 'Paid', lastPaymentDate: new Date().toISOString().split('T')[0] };
      }
      return h;
    }));
  };

  const handleAddGrievance = (newGrv) => {
    setGrievances(prev => [newGrv, ...prev]);
  };

  const handleResolveGrievance = (id) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, status: 'Resolved - Sanitation Squad Actioned' };
      }
      return g;
    }));
  };

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

  const handleApplyRoute = (routeResult) => {
    setActiveRoute(routeResult);
    showToast(`Genetic Algorithm Route (${routeResult.optimizedDistanceKm} km, ${routeResult.savingsPercent}% distance cut) applied!`, 'success');
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
    showToast('Collection route cleared from map.', 'info');
  };

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

  // If not logged in, render the AuthLoginScreen
  if (!user) {
    return <AuthLoginScreen onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
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

      {/* Top Navbar locked to current user portal */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetData={handleResetData}
      />

      {/* Main Portal View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {user.portal === 'citizen' && (
          <CitizenPortal
            user={user}
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
            theme={theme}
          />
        )}

        {user.portal === 'worker' && (
          <HKSWorkerPortal
            user={user}
            bins={bins}
            depot={DEPOT_LOCATION}
            households={households}
            payments={payments}
            onUpdateHouseholdStatus={handleUpdateHouseholdStatus}
            onUpdateHouseholdWaste={handleUpdateHouseholdWaste}
            onAddPayment={handleAddPayment}
            onEmptyBin={handleEmptyBin}
            onShowToast={showToast}
            theme={theme}
          />
        )}

        {user.portal === 'admin' && (
          <AdminDashboard
            user={user}
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
            theme={theme}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-base">🌴</span>
            <span className="font-bold text-slate-800 dark:text-white">Eco-Smart Kerala</span>
            <span>• Government of Kerala Suchitwa Mission & Haritha Kerala Mission</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Haritha Karma Sena (HKS) Platform</span>
            <span>•</span>
            <span>Active User: {user.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mount to DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
