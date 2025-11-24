// src/pages/Search.jsx
import React from "react";


export default function Search(){
  return (
    <div className="search-page-scale"> 
    <div className="container" role="region" aria-label="Search">
      <header className="search-head">
        
        <div className="search-wrapper">
          <img src="src/assets/icons/searchicon.png" alt="" className ="search-icon"/>
          <input
          className="search-input"
          placeholder="Search by dataset or article name, county, year or category"
          aria-label="Search datasets and articles"
        /></div>
        <div className="search-filters">
          <label>Data Type
            <select>
              <option>Any </option>
              <option>Dataset</option>
              <option>Article</option>
              </select>
          </label>
          <label>Date Range
            <input type="text" placeholder="2019–2025" />
          </label>
          <label>Location
            <input type="text" placeholder="e.g., Finger Lakes" />
          </label>
          <label>Category
            <select>
              <option>All</option>
              <option>Water</option>
              <option>Soil</option>
              <option>Climate</option>
              <option>Microbiology</option>
            </select>
          </label>
        </div>
      </header>

      <div className="search-grid">
        <section aria-label="Latest Datasets">
          <h3>Latest Datasets</h3>
          <h4>Want to compare datasets?{" "} 
          <a href="/signup" className="signup-link">Sign Up</a>{" "}
          to send results to the Data Page.</h4>
          <article className="ld-result-card">
            <h4>Finger Lakes Tributary Nutrients (2024)</h4>
            <p>Data: 2024 - 2025</p>
            <p>Monthly nitrate, phosphate, turbidity.</p>
            <button type="ld-button">Take Notes</button>
            </article>
          <article className="ld-result-card">
            <h4>Hudson Valley Runoff Gauge Network</h4>
            <p>Data: 2014 - 2025</p>
          <p>Storm events & discharge composites.</p>
          <button type="ld-button">Take Notes</button>
          </article>

          <article className="ld-result-card">
            <h4>NYC Distribution Microbiology</h4>
            <p>Data: 2020 - 2025</p>
          <p>Total coliform & E. coli compliance tests.</p>
          <button type="ld-button">Take Notes</button>
          </article>
        </section>

        <section aria-label="Latest Articles">
          <h3>Latest Articles</h3>
          <article className="la-result-card">
            <h4>PFAS Fate in Agricultural Soils</h4>
            <p>May 20, 2025</p>
            <p>Mobility, uptake, and mitigation options.</p>
            
            <div className="la-bottom-row">
            <div className="la-pills">
        {["Soil health", "Water quality"].map(label => (
          <a
            key={label}
            href="#search"
            className="la-pill"
            role="button"
            aria-label={`${label} (coming soon)`}
          >
            {label}
          </a>
        ))}
      </div>
      <button type="la-button">Read More</button>
      </div>
            </article>
          <article className="la-result-card">
            <h4>Impact of Water Quality on Soil Health</h4>
            <p>January 5, 2025</p>
          <p>Measurements of water quality in agricultural runoff in New York State</p>
          <div className="la-bottom-row">
          <div className="la-pills">
        {["Algae Blooms"].map(label => (
          <a
            key={label}
            href="#search"
            className="la-pill"
            role="button"
            aria-label={`${label} (coming soon)`}
          >
            {label}
          </a>
        ))}
      </div>
      <button type="la-button">Read More</button>
      </div>
          </article>
        </section>
      </div>


        <section className="suggested-why-search-wrap">
          <div className="suggested-why-search-grid">
      <div className="suggested">
        <h4>Suggested Searches</h4>
        <div className="pill-row">
          {["PFAS 2023", "Coliform Events NYC", "Nitrates Finger Lakes", "Organic vs Conventional", "Hudson Valley 2024", "Runoff Index"].map(s =>
            <a key={s} href="#search" className="pillrow">{s}</a>
          )}
        </div>
        </div>
        <div className="why-search">
          <p className="why-search-text"> Why Search with RIW?</p>
          <p className="why-search-body">Our search engine connects scientific research, community knowledge, and real-time data so you can learn, analyze, and take action.</p>
        </div>
        </div>
      </section>
    </div>
    </div>
  );
}
