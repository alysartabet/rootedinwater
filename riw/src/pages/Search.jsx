// src/pages/Search.jsx
import React from "react";

export default function Search(){
  return (
    <div className="container" role="region" aria-label="Search">
      <header className="search-head">
        <input
          className="search-input"
          placeholder="search by dataset or article name, county, year or category"
          aria-label="Search datasets and articles"
        />
        <div className="search-filters">
          <label>Data Type
            <select><option>Any</option><option>Dataset</option><option>Article</option></select>
          </label>
          <label>Date Range
            <input type="text" placeholder="2019–2025" />
          </label>
          <label>Location
            <input type="text" placeholder="e.g., Finger Lakes" />
          </label>
          <label>Category
            <select>
              <option>All</option><option>Water</option><option>Soil</option><option>Climate</option><option>Microbiology</option>
            </select>
          </label>
        </div>
      </header>

      <div className="search-grid">
        <section aria-label="Latest Datasets">
          <h3>Latest Datasets</h3>
          <article className="result-card"><h4>Finger Lakes Tributary Nutrients (2024)</h4><p>Monthly nitrate, phosphate, turbidity.</p></article>
          <article className="result-card"><h4>Hudson Valley Runoff Gauge Network</h4><p>Storm events & discharge composites.</p></article>
          <article className="result-card"><h4>NYC Distribution Microbiology</h4><p>Total coliform & E. coli compliance tests.</p></article>
        </section>

        <section aria-label="Latest Articles">
          <h3>Latest Articles</h3>
          <article className="result-card"><h4>Soil Carbon Sequestration Pathways</h4><p>Cover crops and below-ground biomass.</p></article>
          <article className="result-card"><h4>PFAS Fate in Agricultural Soils</h4><p>Mobility, uptake, and mitigation options.</p></article>
          <article className="result-card"><h4>Resilient Rotations in North Country</h4><p>Yield stability under heat & frost.</p></article>
        </section>
      </div>

      <section className="suggested">
        <h4>Suggested searches</h4>
        <div className="pill-row">
          {["PFAS 2023", "Coliform Events NYC", "Nitrates Finger Lakes", "Organic vs Conventional", "Hudson Valley 2024", "Runoff Index"].map(s =>
            <a key={s} href="#search" className="pill">{s}</a>
          )}
        </div>
      </section>
    </div>
  );
}
