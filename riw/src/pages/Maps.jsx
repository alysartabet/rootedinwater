import { useState, useMemo, useEffect, useRef } from "react";

import commDist from "../assets/maps/community_districts.png"; 
import flood from "../assets/maps/flood.png";
import topo from "../assets/maps/topography.png";
import trees from "../assets/maps/trees.png";
import water from "../assets/maps/water.png";


const BASE_SRC = commDist;

const LAYERS = [
  { key: "crop_yield",    label: "Crop Yield",            src: flood, icon: "🌾" },
  { key: "topography",    label: "Topography",            src: topo, icon: "⛰️" },
  { key: "boroughs",      label: "Boroughs",              src: commDist, icon: "—" },
  { key: "cds",           label: "Community Districts",   src: commDist, icon: "▭" },
  { key: "flood_20",      label: "Floodplain (20 Year)",  src: flood, icon: "🫧" },
  { key: "flood_100",     label: "Floodplain (100 Year)", src: flood, icon: "🫧" },
  { key: "windspeed",     label: "Windspeed",             src: topo, icon: "🡲" },
  { key: "earthquakes",   label: "Earthquakes",           src: topo, icon: "🟠" },
  { key: "precip",        label: "Precipitation",         src: water, icon: "🔵" },
  { key: "roads",         label: "Roads",                 src: topo, icon: "═" },
  { key: "trees",         label: "Trees",                 src: trees, icon: "🟢" },
];

export default function Maps() {
  const [projectName, setProjectName] = useState("Project Name");
  const [activeLayerKey, setActiveLayerKey] = useState("cds");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLayer = useMemo(
    () => LAYERS.find(l => l.key === activeLayerKey),
    [activeLayerKey]
  );

  const handleExport = () => {
    const link = document.createElement("a");
    link.href = activeLayer?.src || BASE_SRC;
    link.download = `${projectName.replace(/\s+/g, "_")}_${activeLayerKey}.png`;
    link.click();
  }

  const [activeTool, setActiveTool] = useState("pan");
  const mapRef = useRef(null);
  // Zoom in
  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const currentZoom = mapRef.current.getZoom() ?? 6;
    const nextZoom = Math.min(currentZoom + 1, 12); // respect maxZoom
    mapRef.current.setZoom(nextZoom);
  };

  // Zoom out
  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const currentZoom = mapRef.current.getZoom() ?? 6;
    const nextZoom = Math.max(currentZoom - 1, 5); // respect minZoom
    mapRef.current.setZoom(nextZoom);
  };

  // "Pan/Select" – here we'll just reset view to NY bounds
  const handleResetView = () => {
    if (!mapRef.current || !window.google || !window.google.maps) return;
    const { maps } = window.google;

    const nyBounds = new maps.LatLngBounds(
      { lat: 38.0, lng: -82.0 }, // SW
      { lat: 46.5, lng: -68.0 }  // NE
    );

    mapRef.current.fitBounds(nyBounds);
  };
  useEffect(() => {
  if (!mapRef.current) return;

  const isPan = activeTool === "pan";

  mapRef.current.setOptions({
    draggable: isPan,
    gestureHandling: isPan ? "greedy" : "none",
  });
}, [activeTool]);
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JS not loaded");
      return;
    }

    const { maps } = window.google;

    const nyBounds = new maps.LatLngBounds(
      { lat: 38.0, lng: -82.0 }, //SW
      { lat: 46.5, lng: -68.0 } //NE
    );

    const map = new maps.Map(document.getElementById("gmap"), {
      center: { lat: 42.9, lng: -75.0 },
      zoom: 6,
      mapTypeId: "hybrid",
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: true,
      zoomControl: false,
      disableDefaultUI: true,
      draggable: true,
      gestureHandling: "greedy",
      restriction: {
        latLngBounds: nyBounds,
        strictBounds: true,
      },
      minZoom: 3,
      maxZoom: 12,
    });

    map.fitBounds(nyBounds);

    fetch("/ny_state.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        const outline = new maps.Data({ map });

        outline.addGeoJson(geojson);

        outline.setStyle({
          strokeColor: "#ff3333",
          strokeWeight: 3,
          strokeOpacity: 1,
          fillOpacity: 0,
        });
      })
      .catch((err) => {
        console.error("Failed to load NY GeoJSON:", err);
      });

    mapRef.current = map;

    return () => {
      mapRef.current = null;
    };
  }, []);



  return (
    <div className="maps-page">
      <header className="maps-topbar">
        <div className="pill pill-input" role="group" aria-label="Project name">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project name"
          />
        </div>
        <button className="pill pill-button" onClick={handleExport} aria-label="Export">
          Export
        </button>
      </header>

      <section className="map-panel" aria-label="Map viewer">
        <div id="gmap"></div>
        <div className="map-inner">
          {/* Base image 
          <img className="map-img base" src={BASE_SRC} alt="NYC Community Districts base map" />

           Active layer (single-select) 
          {activeLayer && (
            <img
              className="map-img overlay"
              src={activeLayer.src}
              alt={`${activeLayer.label} overlay`}
            />
          )}

          {/* Layers panel */}
          <aside className="layers-card" aria-label="Layers">
            <div className="layers-title">Layers</div>
            <ul role="listbox" aria-label="Choose a layer">
              {LAYERS.map((layer) => (
                <li key={layer.key}>
                  <button
                    className={`layer-row ${activeLayerKey === layer.key ? "active" : ""}`}
                    role="option"
                    aria-selected={activeLayerKey === layer.key}
                    onClick={() => setActiveLayerKey(layer.key)}
                  >
                    <span className="layer-icon" aria-hidden="true">{layer.icon}</span>
                    <span className="layer-label">{layer.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="filters-actions"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-controls="imported-datasets"
            >
              Filters/Actions
            </button>
          </aside>

           {/* Corner controls (stub icons) */}
          <div className="corner-tools" aria-hidden="true">
             <button title="Pan / Move map" className={activeTool === "pan" ? "active" : ""} onClick={() => setActiveTool("pan")}>
              🖐️ </button>
            <button title="Zoom In" onClick={handleZoomIn}>＋</button>
            <button title="Zoom Out" onClick={handleZoomOut}>–</button>
          </div>
        </div>
      </section>

      <section className="imported-drawer">
        <button
          className="drawer-toggle"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          aria-controls="imported-datasets"
        >
          Imported Data Sets
          <span className={`chev ${drawerOpen ? "open" : ""}`} aria-hidden="true">▾</span>
        </button>

        <div
          id="imported-datasets"
          className={`drawer-body ${drawerOpen ? "open" : ""}`}
          role="region"
          aria-label="Imported data sets"
        >
          {/* Replace these with real items as you hook up data */}
          <ul className="dataset-list">
            <li>USGS – Central Pine Barrens (2020)</li>
            <li>NYC Open Data – Water Distribution Microbiology</li>
            <li>USDA NASS – County Yield (2015–2025)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}