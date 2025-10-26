import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions (loadScript, loadStylesheet) ---
// ... (These functions remain exactly the same as before)
/**
 * Loads a script dynamically into the <head>.
 * Calls a callback function when the script is loaded.
 */
function loadScript(src, id, callback) {
  // Check if the script is already on the page
  const existingScript = document.getElementById(id);
  
  if (existingScript) {
    // If it exists, check if the library is ready
    if (id === 'leaflet-js' && window.L) {
      callback();
    } else {
      // If it's not ready, wait for it
      existingScript.addEventListener('load', callback);
    }
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.id = id;
  script.async = true;
  script.onload = callback; // Call the callback when loading is complete
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}

/**
 * Loads a stylesheet dynamically into the <head>.
 */
function loadStylesheet(href, id) {
  if (document.getElementById(id)) {
    return; // Already loaded
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.id = id;
  document.head.appendChild(link);
}


// --- 1. The Actual Map Component ---
// This component assumes Leaflet (window.L) is already loaded.

// --- NEW: Mock Data for Safety Zones ---
// We'll use this as a placeholder before we connect Firestore.
const mockSafetyZones = [
  {
    id: 1,
    // Bounds for a rectangle (South-West corner, North-East corner)
    bounds: [[28.5, 77.1], [28.7, 77.3]], // Area in Delhi
    level: 'red',
    message: 'High number of alerts reported in this area.'
  },
  {
    id: 2,
    bounds: [[19.0, 72.8], [19.2, 73.0]], // Area in Mumbai
    level: 'orange',
    message: 'Some users reported feeling unsafe at night.'
  },
  {
    id: 3,
    bounds: [[12.9, 77.5], [13.1, 77.7]], // Area in Bangalore
    level: 'yellow',
    message: 'Generally safe, but be aware of surroundings.'
  },
  {
    id: 4,
    bounds: [[13.0, 80.2], [13.2, 80.3]], // Area in Chennai
    level: 'green',
    message: 'Users report this area feels very safe.'
  }
];

// --- NEW: Helper function to get color from safety level ---
function getSafetyColor(level) {
  switch (level) {
    case 'red': return '#EF4444'; // Tailwind red-500
    case 'orange': return '#F97316'; // Tailwind orange-500
    case 'yellow': return '#EAB308'; // Tailwind yellow-500
    case 'green': return '#22C55E'; // Tailwind green-500
    default: return '#6B7280'; // Tailwind gray-500
  }
}

function MapDisplay() {
  const indiaCenter = [20.5937, 78.9629];
  const initialZoom = 5;
  const mapContainerRef = useRef(null); // Ref for the map div
  const mapInstanceRef = useRef(null); // Ref to store the map object

  useEffect(() => {
    // This effect runs *after* the component mounts
    
    // Check if the div is ready and no map is initialized yet
    if (mapContainerRef.current && !mapInstanceRef.current) {
      
      // Check if Leaflet script has loaded
      if (window.L) { 
        // Create the map and attach it to the div
        const map = window.L.map(mapContainerRef.current).setView(
          indiaCenter,
          initialZoom
        );

        // Add the map tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // --- NEW: Loop through zones and draw them ---
        mockSafetyZones.forEach(zone => {
          const color = getSafetyColor(zone.level);
          
          window.L.rectangle(zone.bounds, {
            color: color,      // Border color
            fillColor: color,  // Fill color
            fillOpacity: 0.4,  // Semi-transparent
            weight: 1          // Border width
          })
          .bindPopup(`<b>Safety Alert:</b> ${zone.message}`) // Add a clickable popup
          .addTo(map); // Add the rectangle to the map
        });
        // --- End of new section ---

        // Save the map instance so we can clean it up later
        mapInstanceRef.current = map;
      } else {
        console.error("Leaflet (window.L) is not available. This component should not have been rendered.");
      }
    }

    // Cleanup function:
    // When the component is unmounted, destroy the map instance
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Community Safety Map</h1>
      
      {/* This is the div that Leaflet will attach to */}
      <div 
        ref={mapContainerRef} 
        id="map" // Leaflet can use this ID
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg border border-gray-300"
        style={{ height: '600px' }} 
      >
        {/* Map will be initialized here by leaflet.js */}
      </div>

      {/* --- NEW: Legend --- */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Safety Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: getSafetyColor('green') }}></div>
            <span>Safe</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: getSafetyColor('yellow') }}></div>
            <span>Use Caution</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: getSafetyColor('orange') }}></div>
            <span>High Awareness</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: getSafetyColor('red') }}></div>
            <span>High Risk</span>
          </div>
        </div>
      </div>

    </div>
  );
}


// --- 2. The Loader Component ---
// This is the component you should import as your "Map Page"

function MapPageLoader() {
  // State to track if all assets are loaded
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // We need to load 2 things: Leaflet CSS and Leaflet JS
    // Tailwind is loaded separately but we won't wait for it
    
    let scriptsToLoad = 1; // Only waiting for Leaflet.js
    
    const onScriptLoaded = () => {
      scriptsToLoad -= 1;
      if (scriptsToLoad === 0) {
        setIsReady(true);
      }
    };

    // 1. Load Leaflet CSS
    loadStylesheet('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'leaflet-css');
    
    // 2. Load Tailwind (as a script)
    // We run this but don't wait for it, as it's not critical for the map
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.id = "tailwind-css";
    if (!document.getElementById('tailwind-css')) {
      document.head.appendChild(tailwindScript);
    }
    
    // 3. Load Leaflet JS
    // This is the only one we *wait* for.
    loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'leaflet-js', onScriptLoaded);

  }, []); // Run only once

  // While loading, show a placeholder
  if (!isReady) {
    return (
      <div className="flex items-center justify-center" style={{ height: '600px' }}>
        <div className="text-xl font-semibold">Loading Map...</div>
      </div>
    );
  }

  // Once loaded, show the real map
  return <MapDisplay />;
}

// Export the LOADER component as the default.
// This is the one you will import in your App.jsx
export default MapPageLoader;

// --- 3. Example of how to use this in your App.jsx ---
//
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MapPage from './MapPage.jsx'; // <-- You import the loader
// import Home from './Home.jsx';
//
// function App() {
//   return (
//     <BrowserRouter>
//       {/* Your Header, Nav, etc. would go here */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/map" element={<MapPage />} /> {/* <-- Use it here */}
//       </Routes>
//       {/* Your Footer would go here */}
//     </BrowserRouter>
//   );
// }
//
// export default App;

