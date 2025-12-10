
/*
import { useState, useMemo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "@vnedyalk0v/react19-simple-maps";

import { geoCentroid } from "d3-geo";

import treesPng from "../assets/maps/trees.png";
import floodPng from "../assets/maps/flood.png";
import waterPng from "../assets/maps/water.png";
import topoPng from "../assets/maps/topography.png";
import commDistPng from "../assets/maps/community_districts.png";

import nyState from "../data/ny_state.json";
import nyBoroughs from "../data/ny_boroughs.json";
import nyCds from "../data/ny_cds.json";

const LAYERS = [
  { key: "boroughs",      label: "Boroughs",              type: "vector", icon: "—" },
  { key: "cds",           label: "Community Districts",   type: "vector", icon: "▭" },
  { key: "trees",         label: "Trees",                 type: "heat",   icon: "🟢", preview: treesPng },
  { key: "flood_100",     label: "Floodplain (100 Year)", type: "heat",   icon: "🫧", preview: floodPng },
  { key: "precip",        label: "Precipitation",         type: "heat",   icon: "🔵", preview: waterPng },
  { key: "topography",    label: "Topography",            type: "heat",   icon: "⛰️", preview: topoPng },
  { key: "cd_raster",     label: "CD Reference (PNG)",    type: "raster", icon: "▭", preview: commDistPng },
];

const NY_STATE_GEOJSON = nyState;
const NY_BOROUGHS_GEOJSON = nyBoroughs;
const NY_CDS_GEOJSON = nyCds;

const INITIAL_CENTER = [-75, 43];  // roughly the middle of NY
const INITIAL_ZOOM = 1.2;

const NYC_CENTER = [-73.95, 40.7];     // roughly downtown NYC
const NYC_ZOOM = 5.8;

export default function Maps() {
  const [projectName, setProjectName] = useState("Project Name");
  const [activeLayerKey, setActiveLayerKey] = useState("boroughs");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // map view state
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState(INITIAL_CENTER); 
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [activeTool, setActiveTool] = useState("pan");

  const activeLayer = useMemo(
    () => LAYERS.find((l) => l.key === activeLayerKey),
    [activeLayerKey]
  );

  const handleExport = () => {
    // simple fallback: export preview PNG if exists
    if (activeLayer?.preview) {
      const link = document.createElement("a");
      link.href = activeLayer.preview;
      link.download = `${projectName.replace(/\s+/g, "_")}_${activeLayerKey}.png`;
      link.click();
      return;
    }
    alert("Exporting the SVG map will need an extra utility (e.g. html2canvas).");
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.5, 8));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.5, 2.5));
  };

  const handleResetView = () => {
    setCenter(INITIAL_CENTER);
    setZoom(INITIAL_ZOOM);
    setSelectedRegionId(null);
  };

  // When you click a borough/CD: focus + zoom
  const focusOnFeature = (geo) => {
    const [minLng, minLat, maxLng, maxLat] = geo.bbox || [];
    const id = geo.properties?.BoroCD || geo.id;

    if (!minLng && !minLat && !maxLng && !maxLat) {
      const [lng, lat] = geoCentroid(geo);
      setCenter([lng, lat]);
      setZoom(5.5);
      setSelectedRegionId(id);
      return;
    }

    const centerLng = (minLng + maxLng) / 2;
    const centerLat = (minLat + maxLat) / 2;
    setCenter([centerLng, centerLat]);
    setZoom(6);
    setSelectedRegionId(id);
  };

  useEffect(() => {
  // Layers that should focus on NYC
  const isNyMetroLayer =
    activeLayerKey === "boroughs" ||
    activeLayerKey === "cds" ||
    activeLayerKey === "trees" ||
    activeLayerKey === "precip" ||
    activeLayerKey === "flood_100" ||
    activeLayerKey === "topography" ||
    activeLayerKey === "cd_raster";

  if (isNyMetroLayer) {
    setCenter(NYC_CENTER);
    setZoom(NYC_ZOOM);
  } else {
    setCenter(INITIAL_CENTER);
    setZoom(INITIAL_ZOOM);
  }
}, [activeLayerKey]);


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
        <button
          className="pill pill-button"
          onClick={handleExport}
          aria-label="Export"
        >
          Export
        </button>
      </header>

      <section className="map-panel" aria-label="Map viewer">
        <div className="map-inner">
          <div className="map-frame">
            <ComposableMap
              projection="geoAlbers"
              projectionConfig={{
                center: INITIAL_CENTER, // tweak to keep NY well framed
                scale: 3500,
              }}
              className="ny-map-svg"
            >
              <ZoomableGroup
                center={center}
                zoom={zoom}
                onMoveEnd={({ coordinates, zoom: newZoom }) => {
                  if (activeTool === "pan") {
                    setCenter(coordinates);
                    setZoom(newZoom);
                  }
                }}
                // keep this if you want bounds, but FIX the shape
                //translateExtent={[[-120, 15], [-55, 60]]}
              >


                <Geographies geography={NY_STATE_GEOJSON}>
                  {({ geographies }) =>
                    geographies.map((geo, i) => (
                      <Geography
                        key={geo.id || `state-${i}`}
                        geography={geo}
                        className="ny-state-outline"
                      />
                    ))
                  }
                </Geographies>

 
                {(activeLayerKey === "boroughs" ||
                  activeLayerKey === "cds" ||
                  activeLayerKey === "trees" ||
                  activeLayerKey === "precip" ||
                  activeLayerKey === "flood_100") && (
                  <Geographies geography={NY_BOROUGHS_GEOJSON}>
                    {({ geographies }) =>
                      geographies.map((geo, i) => (
                        <Geography
                          key={geo.properties.BoroCD || geo.id || `boro-${i}`}
                          geography={geo}
                          onClick={() => focusOnFeature(geo)}
                          className={`ny-borough ${
                            selectedRegionId === (geo.properties.BoroCD || geo.id) ? "selected" : ""
                          }`}
                        />
                      ))
                    }
                  </Geographies>
                )}

  
                {activeLayerKey === "cds" && (
                  <Geographies geography={NY_CDS_GEOJSON}>
                    {({ geographies }) =>
                      geographies.map((geo, i) => (
                        <Geography
                          key={geo.properties.BoroCD || geo.id || `cd-${i}`}
                          geography={geo}
                          onClick={() => focusOnFeature(geo)}
                          className={`ny-cd ${
                            selectedRegionId === (geo.properties.BoroCD || geo.id) ? "selected" : ""
                          }`}
                        />
                      ))
                    }
                  </Geographies>
                )}
              </ZoomableGroup>
            </ComposableMap>


            {activeLayer?.type === "raster" && (
              <div className="map-raster-overlay">
                <img
                  src={activeLayer.preview}
                  alt={`${activeLayer.label} overlay`}
                />
              </div>
            )}


            <div className="corner-tools" aria-hidden="true">
              <button
                title="Reset view"
                onClick={handleResetView}
              >
                🧭
              </button>
              <button
                title="Pan / Move map"
                className={activeTool === "pan" ? "active" : ""}
                onClick={() => setActiveTool("pan")}
              >
                🖐️
              </button>
              <button title="Zoom In" onClick={handleZoomIn}>
                ＋
              </button>
              <button title="Zoom Out" onClick={handleZoomOut}>
                –
              </button>
            </div>
          </div>


          <aside className="layers-card" aria-label="Layers">
            <div className="layers-title">Layers</div>
            <ul role="listbox" aria-label="Choose a layer">
              {LAYERS.map((layer) => (
                <li key={layer.key}>
                  <button
                    className={`layer-row ${
                      activeLayerKey === layer.key ? "active" : ""
                    }`}
                    role="option"
                    aria-selected={activeLayerKey === layer.key}
                    onClick={() => setActiveLayerKey(layer.key)}
                  >
                    <span className="layer-icon" aria-hidden="true">
                      {layer.icon}
                    </span>
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
          <span
            className={`chev ${drawerOpen ? "open" : ""}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        <div
          id="imported-datasets"
          className={`drawer-body ${drawerOpen ? "open" : ""}`}
          role="region"
          aria-label="Imported data sets"
        >
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
*/










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

          <img className="map-img base" src={BASE_SRC} alt="NYC Community Districts base map" />

           Active layer (single-select) 
          {activeLayer && (
            <img
              className="map-img overlay"
              src={activeLayer.src}
              alt={`${activeLayer.label} overlay`}
            />
          )}


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
