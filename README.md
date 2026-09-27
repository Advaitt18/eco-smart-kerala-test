# 🌴 Eco-Smart Kerala (Single-Page Demo Application)

A modern, responsive single-page web application built with **React**, **Tailwind CSS**, and **Leaflet Maps** for smart municipal waste management, Haritha Karma Sena (HKS) field operations, and Local Self Government Department (LSGD) administration in Kerala.

---

## 🌟 Key Features

### 1. 🏡 Citizen Portal
- **Daily Household Pickup Request**: 1-click toggle between **'Pickup Required'** (green) and **'House Closed'** (skip today) to notify the morning HKS squad.
- **Community Smart Bin Map**: Live Leaflet map displaying real-time sensor fill levels with status colors (**Green** <50%, **Yellow** 50-80%, **Red** >80%, **Hazard** E-waste/Alert).
- **HKS User Fee Digital Payment**: Simulated ₹50 monthly fee payment with dynamic UPI / BharatQR code generator (Google Pay, PhonePe, Paytm) and instant receipt generation.
- **Haritha Mitra Grievance / Spot Dumping Logger**: Report illegal roadside or canal waste dumping with geotagged photo simulation.

### 2. 👷‍♀️ Haritha Karma Sena (HKS) Field Worker Portal
- **Daily Household Attendance Register**: Ward 12 house list with quick toggles (**'Pickup Required'** vs **'House Closed'** vs **'Collected'**).
- **Segregated Waste Logger**: Enter segregated quantities of Wet waste, Dry plastic, Glass bottles, and Hazardous/E-waste.
- **Simulated QR Code Payment Scanner & Ledger**:
  - Scan consumer QR tag simulation.
  - Verify instant UPI / Cash transactions.
  - Complete digital audit log with transaction IDs, dates, collector names, and printable receipts.

### 3. 🏛️ LSGD Admin Dashboard
- **Executive Stat Cards**: Total Waste Collected Today (Tonnes), Active IoT Smart Bins, Active HKS Field Workforce, User Fee Revenue, and Carbon Footprint Avoided.
- **Genetic Algorithm (GA) Route Calculation Engine**:
  - Multi-objective Genetic Algorithm (TSP/VRP) that solves optimal waste collection routes from Central MCF Depot through high-priority (Red & Hazard) bins.
  - Interactive simulation modal with live generation progress (Gen 1 to 50), population fitness improvements, and distance reduction % calculation.
  - Dynamic route polyline overlay on the Leaflet map with ordered waypoint stop numbers.
- **Real-Time Bin Telemetry & Grievance Redressal**: Direct "Mark Emptied" and "Resolve & Dispatch" actions.

---

## 🚀 How to Run Locally

### Option 1: 1-Click Python Server (Recommended)
From the project folder, simply execute:
```bash
py run_demo.py
# or
python run_demo.py
```
This starts the local web server and automatically opens `http://localhost:3000` in your default web browser.

### Option 2: Standard Python HTTP Server
```bash
python -m http.server 3000
```
Then navigate to [http://localhost:3000](http://localhost:3000).

### Option 3: Direct Browser Open
You can also directly double-click `index.html` in your file explorer.

---

## 📁 Project Architecture

```
Dot E/
├── index.html                       # HTML5 Shell with Tailwind & Leaflet CDN
├── run_demo.py                      # 1-Click Python local web server
├── README.md                        # Documentation & setup guide
└── src/
    ├── app.js                       # Root React application shell & state store
    ├── data/
    │   └── mockData.js              # Kerala smart bins, households, HKS logs
    ├── utils/
    │   └── geneticAlgorithm.js      # AI Genetic Algorithm route calculation engine
    └── components/
        ├── Navbar.js                # Top tab navigation bar
        ├── CitizenPortal.js         # Citizen interface
        ├── HKSWorkerPortal.js       # Field worker attendance & QR payment log
        ├── AdminDashboard.js        # LSGD admin telemetry & KPI center
        ├── LeafletMapView.js        # Interactive Leaflet map with custom pins
        └── GeneticAlgorithmModal.js # Interactive GA simulation & route solver
```

---

## 🛠️ Built With
- **React 18** (Components, Hooks, State Management)
- **Tailwind CSS** (Modern responsive design system)
- **Leaflet.js** (Interactive mapping with custom HTML marker pins & polylines)
- **Babel Standalone** (In-browser JSX compilation for zero-dependency execution)
- **Custom Genetic Algorithm** (Ordered Crossover OX, 2-Opt mutation, Haversine geo-distance calculation)
