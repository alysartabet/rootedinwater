// src/pages/Data.jsx
import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import distMonthlyRaw from "../data/dist_monthly.json";
import surfaceMonthlyRaw from "../data/surface_monthly.json";
import yieldPanelRaw from "../data/yield_panel.json";

const DIST_FEATURES = [
  { key: "residual_chlorine_mean", label: "Residual Chlorine (mg/L)" },
  { key: "turbidity_mean", label: "Turbidity (NTU)" },
  { key: "fluoride_mean", label: "Fluoride (mg/L)" },
];

const SURFACE_FEATURES = [
  { key: "temp_C_mean", label: "Temperature (°C)" },
  { key: "turbidity_ntu_mean", label: "Turbidity (NTU)" },
  { key: "ph_mean", label: "pH" },
  { key: "cond_uscm_mean", label: "Conductivity (µS/cm)" },
  { key: "nitrate_mgL_mean", label: "Nitrate (mg/L)" },
  { key: "phosphorus_mgL_mean", label: "Phosphorus (mg/L)" },
];

const YIELD_CLASS_LABELS = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export default function Data() {
  const [dataset, setDataset] = useState("dist"); // "dist" | "surface" | "yield"
  const [feature, setFeature] = useState("residual_chlorine_mean");

  // --- Derived data for charts ---

  const distSeries = useMemo(() => {
    if (!distMonthlyRaw?.length) return [];
    // Collapse by month (global mean)
    const byMonth = {};
    for (const row of distMonthlyRaw) {
      const m = row.year_month;
      if (!byMonth[m]) {
        byMonth[m] = { month: m, count: 0, sumFeat: 0, sumY: 0 };
      }
      const feat = Number(row[feature]) || 0;
      const y = Number(row.y) || 0;
      byMonth[m].count += 1;
      byMonth[m].sumFeat += feat;
      byMonth[m].sumY += y;
    }
    return Object.values(byMonth)
      .map((d) => ({
        month: d.month,
        featureValue: d.count ? d.sumFeat / d.count : null,
        eventRate: d.count ? d.sumY / d.count : 0,
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));
  }, [feature]);

  const surfaceSeries = useMemo(() => {
    if (!surfaceMonthlyRaw?.length) return [];
    const byMonth = {};
    for (const row of surfaceMonthlyRaw) {
      const m = row.month_start; // "YYYY-MM-DD"
      if (!byMonth[m]) {
        byMonth[m] = { month: m, count: 0, sumFeat: 0, sumY: 0 };
      }
      const feat = Number(row[feature]) || 0;
      const y = Number(row.y_surface) || 0;
      byMonth[m].count += 1;
      byMonth[m].sumFeat += feat;
      byMonth[m].sumY += y;
    }
    return Object.values(byMonth)
      .map((d) => ({
        month: d.month,
        featureValue: d.count ? d.sumFeat / d.count : null,
        eventRate: d.count ? d.sumY / d.count : 0,
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));
  }, [feature]);

  const yieldSeries = useMemo(() => {
    if (!yieldPanelRaw?.length) return [];
    const byYear = {};
    for (const row of yieldPanelRaw) {
      const year = row.YEAR;
      if (!byYear[year]) {
        byYear[year] = {
          YEAR: year,
          low: 0,
          med: 0,
          high: 0,
          n: 0,
          meanYield: 0,
        };
      }
      const cls = Number(row.y_yield);
      if (cls === 0) byYear[year].low += 1;
      if (cls === 1) byYear[year].med += 1;
      if (cls === 2) byYear[year].high += 1;
      byYear[year].n += 1;
      byYear[year].meanYield += Number(row.YIELD) || 0;
    }
    return Object.values(byYear)
      .map((d) => ({
        year: d.YEAR,
        low: d.low,
        med: d.med,
        high: d.high,
        meanYield: d.n ? d.meanYield / d.n : null,
      }))
      .sort((a, b) => a.year - b.year);
  }, []);

  const featureOptions =
    dataset === "dist" ? DIST_FEATURES : dataset === "surface" ? SURFACE_FEATURES : [];

  // Make sure feature always valid when you switch dataset
  const currentFeature =
    featureOptions.find((f) => f.key === feature)?.key || featureOptions[0]?.key;

  // --- Render helpers ---

  const renderMainChart = () => {
    if (dataset === "dist") {
      const data = distSeries;
      return (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="featureValue"
              name={featureOptions.find((f) => f.key === currentFeature)?.label}
              dot={false}
              stroke="#2F7CF6"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="eventRate"
              name="Microbial Event Rate"
              strokeDasharray="5 5"
              dot={false}
              stroke="#6BBF59"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (dataset === "surface") {
      const data = surfaceSeries;
      return (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="featureValue"
              name={featureOptions.find((f) => f.key === currentFeature)?.label}
              dot={false}
              stroke="#2F7CF6"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="eventRate"
              name="Surface Microbial Event Rate"
              strokeDasharray="5 5"
              dot={false}
              stroke="#6BBF59"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (dataset === "yield") {
      const data = yieldSeries;
      return (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="low" stackId="a" name="Low Yield" fill="#CDEAE1" />
            <Bar dataKey="med" stackId="a" name="Medium Yield" fill="#90D5A4"/>
            <Bar dataKey="high" stackId="a" name="High Yield" fill="#2E7D32" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="container data-page">
      <header className="section-head">
        <h1>RIW Data Explorer</h1>
        <p className="section-sub">
          Interactively explore spatiotemporal water-quality and crop-yield patterns
          used in our modeling frameworks.
        </p>
      </header>

      {/* Controls */}
      <div className="data-controls">
        <div className="control-group">
          <label htmlFor="dataset">Dataset</label>
          <select
            id="dataset"
            value={dataset}
            onChange={(e) => {
              const next = e.target.value;
              setDataset(next);
              if (next === "dist") setFeature("residual_chlorine_mean");
              if (next === "surface") setFeature("temp_C_mean");
            }}
          >
            <option value="dist">NYC Distribution System (Framework 1A)</option>
            <option value="surface">NY Surface Waters (Framework 1B)</option>
            <option value="yield">Crop Yields (Framework 2)</option>
          </select>
        </div>

        {dataset !== "yield" && (
          <div className="control-group">
            <label htmlFor="feature">Feature</label>
            <select
              id="feature"
              value={currentFeature}
              onChange={(e) => setFeature(e.target.value)}
            >
              {featureOptions.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main chart */}
      <section className="data-main-card">
        {renderMainChart()}
      </section>

      {/* Secondary summary card for yield model */}
      {dataset === "yield" && (
        <section className="data-summary-grid">
          <div className="summary-card">
            <h3>Yield Classes</h3>
            <ul>
              {Object.entries(YIELD_CLASS_LABELS).map(([k, label]) => (
                <li key={k}>
                  <strong>{label}</strong> – class {k}
                </li>
              ))}
            </ul>
            <p className="summary-note">
              These classes are derived from tertiles of county-level yield distributions
              (low/medium/high).
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
