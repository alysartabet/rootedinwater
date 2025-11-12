import React, { useState, useMemo } from "react";
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
    // Minimal stub: export the visible map as a PNG via <canvas> capture would go here.
    // For now, just download the active layer image.
    const link = document.createElement("a");
    link.href = activeLayer?.src || BASE_SRC;
    link.download = `${projectName.replace(/\s+/g, "_")}_${activeLayerKey}.png`;
    link.click();
  };

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
        <div className="map-inner">
          {/* Base image */}
          <img className="map-img base" src={BASE_SRC} alt="NYC Community Districts base map" />

          {/* Active layer (single-select) */}
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
            <button title="Pan/Select">🖐️</button>
            <button title="Zoom In">＋</button>
            <button title="Zoom Out">🔍</button>
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