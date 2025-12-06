import { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";

import searchIcon from "../assets/icons/searchicon.png";

const PER_PAGE = 15;

export default function Search() {
  const [resultsMode, setResultsMode] = useState(false);
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [page, setPage] = useState(1);

  // FILTER STATES
  const [filterType, setFilterType] = useState("Any");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");

  const [latestDatasets, setLatestDatasets] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);

  const location = useLocation();


  useEffect(() => {
    if (location.state?.presetQuery) {
      const topic = location.state.presetQuery;
      setQuery(topic);
      setResultsMode(true);
      fetchResults(topic);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  useEffect(() => {
    if (resultsMode && query.trim()) {
      fetchResults(query);
    }
  }, [resultsMode]);

  useEffect(() => {
    if (!resultsMode) return;
    if (!query.trim()) return;
    fetchResults(query);
  }, [filterType, filterCategory, filterLocation, filterDateRange]);

  function enterResultsMode() {
    setResultsMode(true);
  }

  function resetToLanding() {
    setResultsMode(false);
    setQuery("");
    setAllResults([]);
    setPage(1);

    // Reset filters
    setFilterType("Any");
    setFilterCategory("All");
    setFilterLocation("");
    setFilterDateRange("");
  }

  function shortenDescription(text) {
    if (!text) return "";
    const sentences = text.split(". ");
    const trimmed = sentences.slice(0, 2).join(". ");
    return sentences.length > 2 ? trimmed + "…" : trimmed;
  }

  function handleTopicClick(topic) {
    setQuery(topic);
    setResultsMode(true);
    fetchResults(topic);
  }

  // -------------------------
  // API SEARCH
  // -------------------------
  async function fetchResults(q) {
    const trimmed = q.trim();
    if (!trimmed) {
      setAllResults([]);
      setPage(1);
      return;
    }

    try {
      const params = new URLSearchParams({
        q: trimmed,
        type: filterType,
        category: filterCategory,
        location: filterLocation,
        dateRange: filterDateRange,
      });

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      setAllResults(Array.isArray(data.results) ? data.results : []);
      setPage(1);
    } catch (err) {
      console.error("API error:", err);
    }
  }

  // Load landing page content
  useEffect(() => {
    async function loadLanding() {
      const dsRes = await fetch("/api/latest/datasets").then((r) => r.json());
      const artRes = await fetch("/api/latest/articles").then((r) => r.json());

      setLatestDatasets(dsRes.results || []);
      setLatestArticles(artRes.results || []);
    }

    loadLanding();
  }, []);

  // -------------------------
  // PAGINATION
  // -------------------------
  const filteredResults = allResults;
  const totalResults = filteredResults.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const pageResults = filteredResults.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div className="search-page-scale">

      {/* HEADER */}
      <div className="container">
        <header className="search-head">
          <div className="search-wrapper">
            <img src={searchIcon} alt="" className="search-icon" />

            <input
              className="search-input"
              placeholder="Search by dataset or article name, county, year or category"
              value={query}
              onFocus={enterResultsMode}
              onChange={(e) => {
                const q = e.target.value;
                setQuery(q);
                enterResultsMode();
                fetchResults(q);  
              }}
            />
          </div>

          {/* Filters — only in results mode */}
          {resultsMode && (
            <div className="search-filters">
              <label>
                Data Type
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                  }}
                >
                  <option>Any</option>
                  <option>Dataset</option>
                  <option>Article</option>
                </select>
              </label>

              <label>
                Date Range
                <input
                  type="text"
                  placeholder="2019–2025"
                  value={filterDateRange}
                  onChange={(e) => {
                    setFilterDateRange(e.target.value);
                  }}
                />
              </label>

              <label>
                Location
                <input
                  type="text"
                  placeholder="e.g. Hudson Valley"
                  value={filterLocation}
                  onChange={(e) => {
                    setFilterLocation(e.target.value);
                  }}
                />
              </label>

              <label>
                Category
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                  }}
                >
                  <option>All</option>
                  <option>Water</option>
                  <option>Soil</option>
                  <option>Climate</option>
                  <option>Microbiology</option>
                </select>
              </label>
            </div>
          )}

          {resultsMode && (
            <button className="clear-search" onClick={resetToLanding}>
              Back to search overview
            </button>
          )}
        </header>
      </div>

      {/* ================= LANDING PAGE ================= */}
      {!resultsMode && (
        <div className="container">
          <div className="search-grid">

            <section aria-label="Latest Datasets">
              <h3>Latest Datasets</h3>
              {latestDatasets.map((d, i) => (
                <article key={i} className="ld-result-card">
                  <h4>{d.title}</h4>
                  <div className="card-meta-row">
                    <span>{d.source}</span>
                    <span>•</span>
                    <span>{d.year}</span>
                  </div>
                  <p>{d.description?.slice(0, 120)}...</p>
                  <button className="ld-button">
                    <a href={d.link} target="_blank" rel="noreferrer">
                      View Dataset
                    </a>
                  </button>
                </article>
              ))}
            </section>

            <section aria-label="Latest Articles">
              <h3>Latest Articles</h3>
              {latestArticles.map((a, i) => (
                <article key={i} className="la-result-card">
                  <h4>{a.title}</h4>
                  <div className="card-meta-row">
                    <span>{a.source}</span>
                    <span>•</span>
                    <span>{a.date}</span>
                  </div>
                  <p>{a.description?.slice(0, 120)}...</p>
                  <button className="la-button">
                    <a href={a.link} target="_blank" rel="noreferrer">
                      Read More
                    </a>
                  </button>
                </article>
              ))}
            </section>

          </div>

          <section className="suggested-why-search-wrap">
            <div className="suggested-why-search-grid">

              <div className="suggested">
                <h4>Suggested Searches</h4>
                <div className="pill-row">
                  {[
                    "PFAS 2023",
                    "Coliform Events NYC",
                    "Nitrates Finger Lakes",
                    "Organic vs Conventional",
                    "Hudson Valley 2024",
                    "Runoff Index",
                  ].map((s) => (
                    <button
                      key={s}
                      className="pillrow"
                      onClick={() => handleTopicClick(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="why-search">
                <p className="why-search-text">Why Search with RIW?</p>
                <p className="why-search-body">
                  Our search engine connects scientific research, community knowledge,
                  and real-time data so you can learn, analyze, and take action.
                </p>
              </div>

            </div>
          </section>
        </div>
      )}

      {/* ================= RESULTS ================= */}
      {resultsMode && (
        <div className="container results-container">
          <div className="api-results-wrap">

            {pageResults.length > 0 ? (
              pageResults.map((item, i) => (
                <div key={i} className="api-result-item">

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="api-result-title"
                  >
                    {item.title}
                  </a>

                  <p className="api-result-meta">
                    <span>{item.source}</span>
                    {item.year && <span> • {item.year}</span>}
                    {item.type && (
                      <span> • {item.type === "article" ? "Article" : "Dataset"}</span>
                    )}
                  </p>

                  {item.description && (
                    <p className="api-result-description">
                      {shortenDescription(item.description)}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="results-text">
                {query.trim()
                  ? "No results found for this query."
                  : "Type to start searching."}
              </p>
            )}

          </div>

          {/* Pagination */}
          {totalResults > PER_PAGE && (
            <div className="pagination-wrap">
              <div className="pagination">
                {(() => {
                  const pages = [];
                  const add = (p) =>
                    pages.push(
                      <button
                        key={p}
                        className={page === p ? "active-page" : ""}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    );

                  add(1);

                  if (page > 3)
                    pages.push(<span key="e1" className="ellipsis">…</span>);

                  for (let p = page - 1; p <= page + 1; p++) {
                    if (p > 1 && p < totalPages) add(p);
                  }

                  if (page < totalPages - 2)
                    pages.push(<span key="e2" className="ellipsis">…</span>);

                  if (totalPages > 1) add(totalPages);

                  return pages;
                })()}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
