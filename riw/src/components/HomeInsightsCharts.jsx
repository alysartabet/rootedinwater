import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import surfaceMonthlyRaw from "../data/surface_monthly.json";
import yieldPanelRaw from "../data/yield_panel.json";

function buildRecentEventRate() {
  if (!surfaceMonthlyRaw?.length) return [];
  // last ~24 months
  const sorted = [...surfaceMonthlyRaw].sort((a, b) =>
    a.month_start > b.month_start ? 1 : -1
  );
  const last = sorted.slice(-24);

  const byMonth = {};
  for (const row of last) {
    const m = row.month_start.slice(0, 7); // "YYYY-MM"
    if (!byMonth[m]) byMonth[m] = { month: m, sum: 0, n: 0 };
    byMonth[m].sum += Number(row.y_surface) || 0;
    byMonth[m].n += 1;
  }

  return Object.values(byMonth)
    .map((d) => ({
      month: d.month,
      eventRate: d.n ? d.sum / d.n : 0,
    }))
    .slice(-12); // last 12 months only for the mini chart
}

function buildYieldDistribution() {
  if (!yieldPanelRaw?.length) return [];
  let low = 0,
    med = 0,
    high = 0;
  for (const row of yieldPanelRaw) {
    const cls = Number(row.y_yield);
    if (cls === 0) low += 1;
    if (cls === 1) med += 1;
    if (cls === 2) high += 1;
  }
  return [
    { label: "Low", count: low },
    { label: "Medium", count: med },
    { label: "High", count: high },
  ];
}

const recentEventData = buildRecentEventRate();
const yieldDistData = buildYieldDistribution();

export function HomeInsightsCharts() {
  return (
    <div className="insights-3col">
      {/* LEFT: Recent Measurements text can stay or be lightly edited */}
      <div className="insights-left">
        <h3 className="insights-left-title">Recent Surface Microbial Events</h3>
        <p className="insights-left-desc">
          Last 12 months of modeled event rates across NY rivers, lakes and harbor
          waters.
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={recentEventData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="eventRate" name="Event Rate" fill="#6BBF59" radius={[6, 6, 0, 0]}  />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* MIDDLE: Yield class distribution */}
      <div className="insight-large-card">
        <h4>NY Crop Yield Class Distribution</h4>
        <div className="insight-curve-chart">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yieldDistData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="County-Years" fill="#4C9AFF" radius={[6, 6, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <a className="insight-link" href="/data">
          Analyze Yield Models →
        </a>
        <p className="insight-desc">
          Yield classifications are based on tertiles of county-level yield
          distributions (low/medium/high).
        </p>
      </div>

      {/* RIGHT: Quick link to distribution system model */}
      <div className="insight-large-card">
        <h4>NYC Distribution System – Event Rate Snapshot</h4>
        <p className="insight-desc">
          Explore how residual chlorine and turbidity patterns relate to
          coliform/E. coli events in NYC drinking water distribution.
        </p>
        <a className="insight-link" href="/data">
          Explore Framework 1A →
        </a>
      </div>
    </div>
  );
}
