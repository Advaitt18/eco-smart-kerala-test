// Interactive Leaflet Map Component for Eco-Smart Kerala

const { useState, useEffect, useRef } = React;

export default function LeafletMapView({
  bins = [],
  depot = null,
  activeRoute = null,
  selectedBinId = null,
  onSelectBin = null,
  onEmptyBin = null,
  filterStatus = 'all',
  height = '500px',
  showRoute = true
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const routeLayerRef = useRef(null);
  const depotMarkerRef = useRef(null);

  // Filter bins
  const filteredBins = bins.filter(bin => {
    if (filterStatus === 'all') return true;
    return bin.status === filterStatus;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center near Kozhikode Corporation / Kerala
    const initialCenter = [11.2588, 75.7890];
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // CartoDB Positron / OSM tiles for crisp modern look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when bins or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing bin markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Helper for pin styling
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

    // Find stop indices if route is present
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

      // Popup HTML
      const statusBadge = {
        green: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">Normal (&lt;50%)</span>',
        yellow: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">Moderate (50-80%)</span>',
        red: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800">Critical / Overflow (&gt;80%)</span>',
        hazard: '<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800">Hazard / E-Waste Alert</span>'
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

    // Add Depot / MCF Marker
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

  // Update Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (showRoute && activeRoute && activeRoute.routePoints && activeRoute.routePoints.length > 0) {
      // Create animated styled polyline
      const polyline = L.polyline(activeRoute.routePoints, {
        color: '#4f46e5',
        weight: 5,
        opacity: 0.85,
        dashArray: '10, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Add a soft glowing background line
      const glowLine = L.polyline(activeRoute.routePoints, {
        color: '#818cf8',
        weight: 9,
        opacity: 0.4
      }).addTo(map);

      // Group them together
      const routeGroup = L.featureGroup([glowLine, polyline]);
      routeLayerRef.current = routeGroup;

      // Fit map bounds to show route
      try {
        map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      } catch (e) {
        // Fallback
      }
    }
  }, [activeRoute, showRoute]);

  // Pan to selected bin
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
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
      <div ref={mapContainerRef} style={{ width: '100%', height }} className="z-0" />
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-md border border-slate-200 text-xs flex flex-wrap items-center gap-3">
        <span className="font-bold text-slate-700 flex items-center gap-1">
          <i data-lucide="layers" className="w-3.5 h-3.5 text-emerald-600 inline"></i> Bin Status:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Green (&lt;50%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Yellow (50-80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse inline-block"></span>
          <span className="text-slate-600 font-medium">Red / Overflow (&gt;80%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-700 border border-amber-400 inline-block"></span>
          <span className="text-slate-600 font-medium">Hazard / E-Waste</span>
        </div>
        <div className="flex items-center gap-1.5 border-l pl-2 border-slate-300">
          <span className="text-xs">🏭</span>
          <span className="text-slate-600 font-medium">MCF Depot</span>
        </div>
      </div>
    </div>
  );
}
