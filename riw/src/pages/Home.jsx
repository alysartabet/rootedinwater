import React from "react";

const POPULAR = ["Algae Blooms", "Hydroponics", "Nutrient Management", "Crop Irrigation"];

export default function Home(){
  return (
    <div className="container">
      {/* Ribbon under navbar */}
      <div className="popular-ribbon" role="navigation" aria-label="Popular searches">
        <h2 className="popular-title">Popular Searches</h2>
        <div className="popular-pills">
          {POPULAR.map((label) => (
            <a key={label} href="#home" className="pill" role="button" aria-label={`${label} (coming soon)`}>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Home grid */}
      <div className="home-grid" role="region" aria-label="Home">
        <article className="card">
          <h3>Curated Articles</h3>
          <p>Start with accessible explainers and the latest research highlights.</p>
        </article>
        <article className="card">
          <h3>Datasets Hub</h3>
          <p>Send datasets here from Search/Maps to compare and visualize.</p>
        </article>
        <article className="card">
          <h3>Your Notes</h3>
          <p>Sign in to save annotations and track insights across modules.</p>
        </article>
        <article className="card">
          <h3>Community Updates</h3>
          <p>See alerts on crop disease, water quality changes, and field reports.</p>
        </article>
      </div>
    </div>
  );
}
