import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions (loadScript, loadStylesheet, loadDynamicCSS) ---
// ... (These functions remain exactly the same as before)
/**
 * Loads a script dynamically into the <head>.
 * Calls a callback function when the script is loaded.
 */
function loadScript(src, id, callback) {
  const existingScript = document.getElementById(id);
  
  if (existingScript) {
    if (id === 'leaflet-js' && window.L) {
      callback();
    } else {
      existingScript.addEventListener('load', callback);
    }
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.id = id;
  script.async = true;
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}

/**
 * Loads a stylesheet dynamically into the <head>.
 */
function loadStylesheet(href, id) {
  if (document.getElementById(id)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.id = id;
  document.head.appendChild(link);
}

/**
 * Injects a block of custom CSS into the <head> for our pins.
 */
function loadDynamicCSS(css, id) {
  if (document.getElementById(id)) {
    return;
  }
  const style = document.createElement('style');
  style.id = id;
  style.type = 'text/css';
  if (style.styleSheet) {
    // This is for old IE
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
}


// --- 1. The Actual Map Component ---

// --- Mock Data for Safety *Points* ---
const mockSafetyPoints = [
  {
    id: 1,
    latlng: [28.6139, 77.2090], // Delhi
    level: 'red',
    message: 'High number of alerts reported near Connaught Place.'
  },
  {
    id: 2,
    latlng: [19.0760, 72.8777], // Mumbai
    level: 'orange',
    message: 'Some users reported feeling unsafe near Andheri station at night.'
  },
  {
    id: 3,
    latlng: [12.9716, 77.5946], // Bangalore
    level: 'yellow',
    message: 'Generally safe, but be aware of surroundings in Majestic area.'
  },
  {
    id: 4,
    latlng: [13.0827, 80.2707], // Chennai
    level: 'green',
    message: 'Users report Marina Beach area feels very safe.'
  }
];

// --- Helper function to get color from safety level ---
function getSafetyColor(level) {
  switch (level) {
    case 'red': return '#EF4444'; // Tailwind red-500
    case 'orange': return '#F97316'; // Tailwind orange-500
    case 'yellow': return '#EAB308'; // Tailwind yellow-500
    case 'green': return '#22C55E'; // Tailwind green-500
    default: return '#6B7280'; // Tailwind gray-500
  }
}

/**
 * Creates a custom-colored pin icon using L.divIcon and CSS.
 */
function createColoredIcon(color) {
  if (!window.L) return null; 
  
  return window.L.divIcon({
    className: 'custom-div-icon', 
    html: `<div class="marker-pin" style="background-color:${color};"></div><div class="marker-shadow"></div>`,
    iconSize: [24, 24],     
    iconAnchor: [12, 24],     
    popupAnchor: [0, -24]     
  });
}

function MapDisplay() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [iconCache, setIconCache] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!searchQuery) return;
    if (!mapInstanceRef.current) return;
    
    setSearchMessage('Searching...');
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=in&polygon_svg=1`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        mapInstanceRef.current.setView([lat, lon], 12); 
        setSearchMessage(`Found: ${display_name.split(',')[0]}`);
      } else {
        setSearchMessage('Location not found in India.');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchMessage('Search failed. Please try again.');
    }
  };


  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      if (window.L) { 
        
        // --- Define the boundaries for India ---
        const southWest = [6.0, 68.0]; // Approx. SW corner
        const northEast = [36.0, 98.0]; // Approx. NE corner
        const bounds = window.L.latLngBounds(southWest, northEast);

        // --- Create icons ---
        const icons = {
          red: createColoredIcon(getSafetyColor('red')),
          orange: createColoredIcon(getSafetyColor('orange')),
          yellow: createColoredIcon(getSafetyColor('yellow')),
          green: createColoredIcon(getSafetyColor('green')),
        };
        setIconCache(icons);

        // --- UPDATED: Initialize map with restrictions ---
        const map = window.L.map(mapContainerRef.current, {
          // We removed center and zoom from here
          maxBounds: bounds,      // <-- Prevents panning outside India
          minZoom: 5,             // <-- Prevents zooming out too far
          maxBoundsViscosity: 0.9   // <-- Makes the bounds "bouncy"
        });

        // --- THIS IS THE FIX ---
        // Force the map to fit the bounds *immediately* on load.
        // This sets the initial view correctly.
        map.fitBounds(bounds); 
        // --- End of fix ---

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // --- Draw markers ---
        mockSafetyPoints.forEach(point => {
          const icon = icons[point.level] || icons['green']; 
          
          window.L.marker(point.latlng, { icon: icon })
            .bindPopup(`<b>Safety Alert:</b> ${point.message}`)
            .addTo(map);
        });

        mapInstanceRef.current = map;
      } else {
        console.error("Leaflet (window.L) is not available.");
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">India Safety Map</h1>
      
      {/* Search Bar UI */}
      <form onSubmit={handleSearch} className="w-full max-w-4xl mb-4 flex gap-2">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city in India..."
          className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
      {searchMessage && (
        <p className="w-full max-w-4xl text-center text-sm text-gray-600 mb-4">{searchMessage}</p>
      )}
      
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        id="map"
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg border border-gray-300"
        style={{ height: '600px' }} 
      >
        {/* Map will be initialized here by leaflet.js */}
      </div>

      {/* Legend */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Safety Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-400" style={{ backgroundColor: getSafetyColor('green') }}></div>
            <span>Safe</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-400" style={{ backgroundColor: getSafetyColor('yellow') }}></div>
            <span>Use Caution</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-400" style={{ backgroundColor: getSafetyColor('orange') }}></div>
            <span>High Awareness</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-400" style={{ backgroundColor: getSafetyColor('red') }}></div>
            <span>High Risk</span>
          </div>
        </div>
      </div>

    </div>
  );
}


// --- 2. The Loader Component ---
// (This component is unchanged)
const customPinCSS = `
  .custom-div-icon {
    position: relative;
    z-index: 400; /* Default z-index for markers */
  }
  .marker-pin {
    width: 24px;
    height: 24px;
    border-radius: 50% 50% 50% 0; /* Teardrop shape */
    position: absolute;
    transform: rotate(-45deg);
    left: 0;
    top: 0;
    border: 1px solid #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    pointer-events: none; /* Let clicks pass through */
  }
  .marker-shadow {
    width: 16px;
    height: 16px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 50%;
    position: absolute;
    transform: rotate(45deg);
    left: 4px;
    top: 20px;
    filter: blur(2px);
    z-index: -1;
    pointer-events: none;
  }
  
  .leaflet-marker-icon .marker-pin {
    transform-origin: 12px 24px; /* Anchor point */
    transform: rotate(-45deg);
  }
  .leaflet-marker-icon .marker-shadow {
    transform: none; /* Shadow doesn't need rotation */
    top: 22px;
    left: 4px;
  }
`;

function MapPageLoader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let scriptsToLoad = 1; // Only waiting for Leaflet.js
    
    const onScriptLoaded = () => {
      scriptsToLoad -= 1;
      if (scriptsToLoad === 0) {
        setIsReady(true);
      }
    };

    // 1. Load Leaflet CSS
    loadStylesheet('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'leaflet-css');
    
    // 2. Load our custom pin CSS
    loadDynamicCSS(customPinCSS, 'custom-pin-css');
    
    // 3. Load Tailwind
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.id = "tailwind-css";
    if (!document.getElementById('tailwind-css')) {
      document.head.appendChild(tailwindScript);
    }
    
    // 4. Load Leaflet JS
    loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'leaflet-js', onScriptLoaded);

  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center" style={{ height: '600px' }}>
        <div className="text-xl font-semibold">Loading Map...</div>
      </div>
    );
  }

  return <MapDisplay />;
}

// Export the LOADER component as the default.
export default MapPageLoader;

