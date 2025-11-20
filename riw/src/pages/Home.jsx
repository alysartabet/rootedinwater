import imgAgro from "../assets/articles/agro-forestry.jpg";
import imgClimate from "../assets/articles/climate-resilient.jpg";
import imgSoil from "../assets/articles/soil-microbiome.jpg";
import imgWater from "../assets/articles/water-management.png";
import { useState, useEffect, useRef } from "react";

const POPULAR = [
  "Algae Blooms",
  "Hydroponics",
  "Nutrient Management",
  "Crop Irrigation"
];

const UPDATES = [
  {
    title: "Impact of Agroforestry Systems on Biodiversity and Soil Carbon Sequestration in Western New York",
    img: imgAgro,
    date: "Nov 3, 2025",
    authors: "S. Patel, L. Gomez",
    keyword: "Agroforestry",
    location: "Western NY",
    summary:
      "Mixed-species windbreaks increased pollinator habitat and boosted soil organic carbon by 12–19% over 3 years in on-farm trials."
  },
  {
    title: "Soil Microbiome Diversity in Organic vs. Conventional Farming",
    img: imgSoil,
    date: "Oct 28, 2025",
    authors: "Y. Chen, D. Alvarez",
    keyword: "Soil Microbiome",
    location: "North Country NY",
    summary:
      "Organic rotations showed richer functional guilds and stronger disease-suppressive signatures in metagenomic profiling."
  },
  {
    title: "Water Management for Sustainable Corn Production",
    img: imgWater,
    date: "Oct 18, 2025",
    authors: "M. Ibrahim",
    keyword: "Water Management",
    location: "Genesee Valley",
    summary:
      "Deficit irrigation with soil-moisture triggers cut water use 22% while maintaining grain yield within 3% of controls."
  },
  {
    title: "Climate-Resilient Crop Varieties for Northern New York",
    img: imgClimate,
    date: "Oct 9, 2025",
    authors: "R. Singh, A. Morris",
    keyword: "Climate Resilience",
    location: "Northern NY",
    summary:
      "Cool-night tolerant lines out-performed baselines under late-spring frost and early-fall heat spikes across 12 sites."
  }
];

export default function Home() {

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const slides = UPDATES;


  /* Carousel track */
  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".update-card");
    const cardWidth = card.offsetWidth + 18;

    track.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth"
    });
  };

  
// Detect slide while scrolling
const updateActiveDot = () => {
  const track = trackRef.current;
  const card = track.querySelector(".update-card");
  if (!track || !card) return;

  const cardWidth = card.offsetWidth + 18;
  const index = Math.round(track.scrollLeft / cardWidth);

  setActiveIndex(index);
};


  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".update-card");
    const cw = card.offsetWidth + 18;

 
    const onScroll = () => {
      updateActiveDot();
    };

    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);

  }, []);

  return (
    <div className="container">

      {/* Ribbon under navbar */}
      <div className="popular-bleed" role="navigation" aria-label="Popular searches">
        <div className="container popular-ribboon">
          <h2 className="popular-title">Popular Searches</h2>

          <div className="popular-pills">
            {POPULAR.map(label => (
              <a
                key={label}
                href="#home"
                className="pill"
                role="button"
                aria-label={`${label} (coming soon)`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Updates */}
      <section className="home-section">
        <header className="section-head">
          <h2>Latest Updates</h2>
        </header>

        <div className="updates-carousel">

          <button className="carousel-btn left" onClick={() => scrollCarousel(-1)}>‹</button>

          <div ref={trackRef} id="updatesTrack" className="updates-track">
            {slides.map((u, i) => (
              <article key={i} className="update-card">

                <div className="update-media">
                  <img src={u.img} alt={u.title} loading="lazy" />
                </div>

                {/* Hover/Focus reveal panel */}
                <div className="update-info">
                <h3 className="update-title">{u.title}</h3>

                <div className="meta-wrap">
                <span className="badge">{u.keyword}</span>

                <div className="update-meta">
                <span className="authors">{u.authors}</span>
                <time className="update-date">
                  <img src="src/assets/icons/timeicon.svg" alt="" className ="time-icon"/>
                  {u.date}</time>
                </div>
              </div>

              <p className="update-summary">{u.summary}</p>
                  <div className="update-footer">
                    <div className="update-loc">
                      <img src="src/assets/icons/locationicon.svg" alt="" className="location-icon"/>
                       {u.location}</div>
                    <button className="update-cta">
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>

          <button className="carousel-btn right" onClick={() => scrollCarousel(1)}>›</button>
        </div>

        {/*Half-screen grid*/}
        <div className="updates-grid">
          {slides.map((u, i) => (
            <article key={i} className="update-card">

              <div className="update-media">
                <img src={u.img} alt={u.title} loading="lazy" />
              </div>

              <div className="update-info">
                <h3 className="update-title">{u.title}</h3>

                <div className="meta-wrap">
                  <span className="badge">{u.keyword}</span>

                  <div className="update-meta">
                    <span className="authors">{u.authors}</span>
                    <time className="update-date">
                      <img src="src/assets/icons/timeicon.svg" alt="" className="time-icon" />
                      {u.date}
                    </time>
                  </div>
                </div>

                <p className="update-summary">{u.summary}</p>

                <div className="update-footer">
                  <div className="update-loc">
                    <img src="src/assets/icons/locationicon.svg" alt="" className="location-icon" />
                    {u.location}
                  </div>

                  <button className="update-cta">
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>

      </section>

      {/* Regional Spotlight */}
      <section className="home-section">
        <header className="section-head">
          <h2>Regional Spotlight</h2>
        </header>

        <div className="spotlight">
          <div className="spotlight-row">

            <div className="kpi">
              <div className="kpi-num" style={{ color: "rgb(25,45,43)" }}>10</div>
              <div className="kpi-label" style={{ color: "rgb(25,45,43)" }}>Active Research Sites</div>
            </div>

            <div className="kpi">
              <div className="kpi-num" style={{ color: "rgb(25,45,43)" }}>89</div>
              <div className="kpi-label" style={{ color: "rgb(25,45,43)" }}>Datasets Available</div>
            </div>

          </div>

          <p className="spotlight-blurb" style={{ color: "rgb(25,45,43)" }}>
            Finger Lakes Watershed Study — current season monitoring across tributaries and shore farms.
          </p>

          <a className="btn" href="#maps" role="button">Explore the Full Map</a>
        </div>
      </section>

      {/* Data Insights */}
      <section className="home-section">
        <header className="section-head">
          <h2>Data Insights</h2>
        </header>

        <div className="insights">

          <div className="insight-card">
            <h4>Nitrate Levels in Western Orange County (mg/L)</h4>
            <div className="mini-chart" aria-label="Nitrate sparkline">
              <div style={{ height: "18%" }} />
              <div style={{ height: "32%" }} />
              <div style={{ height: "26%" }} />
              <div style={{ height: "44%" }} />
              <div style={{ height: "38%" }} />
              <div style={{ height: "52%" }} />
              <div style={{ height: "35%" }} />
            </div>
          </div>

          <div className="insight-card">
            <h4>Hudson Valley Runoff Index</h4>
            <div className="mini-chart" aria-label="Runoff index bars">
              <div style={{ height: "22%" }} />
              <div style={{ height: "48%" }} />
              <div style={{ height: "60%" }} />
              <div style={{ height: "40%" }} />
              <div style={{ height: "55%" }} />
              <div style={{ height: "62%" }} />
              <div style={{ height: "30%" }} />
            </div>
          </div>

        </div>
      </section>

      {/* Our Mission */}
      <section className="home-section mission">
        <header className="section-head">
          <h2>Our Mission</h2>
        </header>

        <p style={{ color: "rgb(25,45,43)" }}>
          Rooted In Water connects researchers, growers, and communities to advance
          resilient, evidence-based agriculture. We bridge datasets and field practice
          to turn observations into action.
        </p>
      </section>

      {/* Stay Connected */}
      <section className="home-section">
        <header className="section-head">
          <h2>Stay Connected</h2>
        </header>

        <form
          className="subscribe"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed!");
          }}
        >
          <input type="email" placeholder="you@example.com" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

    </div>
  );
}
