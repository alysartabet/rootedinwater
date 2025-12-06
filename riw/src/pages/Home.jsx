import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import imgAgro from "../assets/articles/agro-forestry.jpg";
import imgClimate from "../assets/articles/climate-resilient.jpg";
import imgSoil from "../assets/articles/soil-microbiome.jpg";
import imgWater from "../assets/articles/water-management.png";
import timeIcon from "../assets/icons/timeicon.svg";
import locationIcon from "../assets/icons/locationicon.svg";
import wheaticon from "../assets/icons/wheaticon.png";
import toolsicon from "../assets/icons/toolsicon.png";
import microscopeicon from "../assets/icons/microscopeicon.png";

//Static Data
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

const COMMUNITY_POSTS = [
  {
    avatar: "T",
    name: "Tom Stevens",
    tag: "Farmer",
    date: "Sep 13",
    title: "Early Signs of Spring: What Our Water Data is Telling Us",
    location: "Finger Lakes Region",
    keyword:"Field Update",
    icon: wheaticon,
    summary:
    "Our water monitoring stations are showing promising trends as we enter the growing season, consistently high dissolved oxygen levels across the region."
  },
  {
    avatar: "L",
    name: "Dr. Lisa Martinez",
    tag: "Researcher",
    date: "Aug 22",
    title: "Cover Crop Success Story: Reducing Runoff by 40%",
    location: "Wayne County, NY",
    keyword:"Practice Share",
    icon: toolsicon,
    summary: "A three-year study on our farm shows cover crops can dramatically reduce nutrient runoff while improving soil health."
  },
  {
    avatar: "A",
    name: "Alex Chen",
    tag: "Student",
    date: "Aug 15",
    title: "Student Research: Algae Blooms and Agricultural Practices in Cayuga Lake Basin",
    location: "Cayuga Lake Basin",
    keyword:"Reflection",
    icon: microscopeicon,
    summary: "Undergraduate research reveals how buffer strips can significantly reduce nutrients that contribute to harmful algae blooms."
  }
];


export default function Home() {
  /*Hooks*/
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const slides = UPDATES;

  /*Helpers*/
  // Carousel track
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
    if (!track) return;

    const card = track.querySelector(".update-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 18;
    const index = Math.round(track.scrollLeft / cardWidth);

    setActiveIndex(index);
  };

  /*Effects*/
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".update-card");
    if(!card) return;
    //const cw = card.offsetWidth + 18;


    const onScroll = () => {
      updateActiveDot();
    };

    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);

  }, []);

  
  return (
    <div className="container">

      {/* Ribbon under navbar (Popular Searches) */}
      <div className="popular-bleed" role="navigation" aria-label="Popular Searches">
        <div className="container popular-ribbon">

          <div className="popular-title-wrap">
            <h2 className="popular-title">Popular Searches</h2>
          </div>

          <div className="popular-pills-wrap">
            <div className="popular-pills">
              {POPULAR.map(label => (
                <Link
                key={label}
                 to="/search"
                 state={{ presetQuery: label }}
                className="pill"
                >
                {label}
              </Link>

              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Latest Updates */}
      <section className="home-section">
        <header className="section-head">
          <h2>Latest Updates</h2>
          <p className="section-sub">
            Stay informed with the latest research, community insights, and alerts
          </p>
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
                  <img src={timeIcon} alt="" className ="time-icon"/>
                  {u.date}</time>
                </div>
              </div>

              <p className="update-summary">{u.summary}</p>
                  <div className="update-footer">
                    <div className="update-loc">
                      <img src={locationIcon} alt="" className="location-icon"/>
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
                      <img src={timeIcon} alt="" className="time-icon" />
                      {u.date}
                    </time>
                  </div>
                </div>

                <p className="update-summary">{u.summary}</p>

                <div className="update-footer">
                  <div className="update-loc">
                    <img src={locationIcon} alt="" className="location-icon" />
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
      <section className="home-section rs-community-wrap">
        <div className="rs-community-grid">

          {/* Left Column Regional Spotlight */}
          <div className="rs-left-col">
            <h2 className="rs-spotlight-title">Regional Spotlight</h2>
            <div className="rs-card">
              <h3 className="rs-title">Finger Lakes Watershed Study</h3>
              <p className="rs-subhead">
                Current season monitoring across tributaries and shore farms.
              </p>
          
              <div className="rs-map-wrap">
                <img
                  src="/src/assets/fingerlakesimg.png"
                  alt="Finger Lakes Watershed Map"
                  className="rs-map"
                />
              </div>

              <a className="rs-cta" href="/maps">
                Explore the Full Map
              </a>

              <p className="rs-desc">
                Monitoring water quality impacts from agricultural practices. This
                comprehensive study includes 45 farms and 15 research stations across
                the watershed.
              </p>

              <div className="rs-kpi-grid">
                <div className="rs-kpi">
                  <div className="rs-kpi-num">10</div>
                  <div className="rs-kpi-label">Active Research Sites</div>
                </div>

                <div className="rs-kpi">
                  <div className="rs-kpi-num">89</div>
                  <div className="rs-kpi-label">Datasets Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column RIW Community */}
          <div className="rs-right-col">
            <div className="community-card">
              <h3 className="community-title">RIW Community</h3>

              <div className="community-feed">
                {COMMUNITY_POSTS.map((post, i) => (
                  <div key={i} className="comm-post">
                    <div className="comm-header">
                      <div className="avatar">{post.avatar}</div>
                      <div className="info">
                        <div className="name">{post.name}</div>
                        <div className={`tag tag-${post.tag.toLowerCase()}`}>{post.tag}</div>
                      </div>
                      <div className="date">{post.date}</div>
                    </div>

                    <div className="comm-title">
                      <img src={post.icon} alt="" className="comm-title-icon" />
                      {post.title}
                    </div>


                    <div className="comm-summary">{post.summary}</div>
                          <div className="comm-location">
                            <img src={locationIcon} />
                            {post.location}
                          </div>
                          <span className="post-badge">{post.keyword}</span>
                          <button className="comm-cta">→</button>
                  </div>
                ))}
              </div>
              <button className="view-all">View All Posts →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Data Insights */}

      <section className="home-section">
        <header className="section-head">
          <h2>Data Insights</h2>
        </header>
      <div className="insights-3col">

       {/* LEFT: Recent Measurements */}
      <div className="insights-left">
        <h3 className="insights-left-title">Recent Measurements</h3>

        <div className="measure-item">
            <div className="measure-info">
            <strong>Cayuga Lake - North End</strong>
            <span>pH: 7.8 | DO: 9.2 mg/L</span>
        </div>
      <span className="status-badge low">low</span>
      </div>

      <div className="measure-item">
        <div className="measure-info">
          <strong>Seneca Lake - South Basin</strong>
          <span>pH: 8.1 | DO: 10.1 mg/L</span>
        </div>
        <span className="status-badge none">none</span>
      </div>

      <div className="measure-item">
        <div className="measure-info">
          <strong>Hudson River - Poughkeepsie</strong>
          <span>pH: 7.3 | DO: 11.3 mg/L</span>
        </div>
        <span className="status-badge moderate">moderate</span>
      </div>
    </div>

    {/* MIDDLE CHART CARD */}
        <div className="insight-large-card">
      <h4>Nitrate Levels in Western Orange County (mg/L)</h4>

     <div className="insight-curve-chart">
      <svg viewBox="0 0 100 50" preserveAspectRatio="none">
       <path
    d="M0,50 C15,50 30,49 40,47.5 C55,45 65,40 75,32 C85,23 93,12 100,0"
    stroke="#222"
    strokeWidth="1"
    fill="none"
    strokeLinecap="round"
  />
       </svg>
     </div>

      <a className="insight-link" href="/data">Analyze in Data →</a>
      <p className="insight-desc">
        Levels spiked in July 2024 after heavy rainfall, showing correlation between runoff and fertilizer application.
      </p>

    </div>

    {/* RIGHT CHART CARD */}
    <div className="insight-large-card">
      <h4>Hudson Valley Runoff Index (2025)</h4>

      <div className="hv-chart">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none">
         {/* Horizontal grid lines */}
        <g stroke="rgba(0,0,0,0.25)" strokeWidth="0.4">
         {[5,15,25,35,45,55].map(y => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} />
        ))}
      </g>

       {/* Bar groups */}
      <g>
      {/* Group 1 */}
      <rect x="8"  y={59 - 20} width="6" height="20" fill="#888" />
      <rect x="15" y={59 - 27} width="6" height="27" fill="#0d2818" />

      {/* Group 2 */}
      <rect x="32" y={59 - 13} width="6" height="13" fill="#888" />
      <rect x="39" y={59 - 40} width="6" height="40" fill="#0d2818" />

      {/* Group 3 */}
      <rect x="56" y={59 - 25} width="6" height="25" fill="#888" />
      <rect x="63" y={59 - 30} width="6" height="30" fill="#0d2818" />

      {/* Group 4 */}
      <rect x="80" y={59 - 17} width="6" height="17" fill="#888" />
      <rect x="87" y={59 - 33} width="6" height="33" fill="#0d2818" />
    </g>

    {/* Baseline */}
    <line x1="0" x2="100" y1="59" y2="59" stroke="#000" strokeWidth="0.7" />
  </svg>
</div>

      <a className="insight-link" href="/data">Analyze in Data →</a>
      <p className="insight-desc">
        Highest runoff in Spring 2025 (42% above average), linked to reduced cover cropping adoption.
      </p>
    </div>

  </div>
</section>

      {/* Our Mission & Subscribe*/}
      <section className="mission-subscribe-wrap">
        <div className="mission-subscribe-grid">

          {/* Subscribe Card */}
          <div className="subscribe-card">
              <h2 className="sub-title">Stay Connected with RIW</h2>
              <p className="sub-subtitle">Subscribe to Our <br/> Newsletter</p>
              <p className="sub-text">
              Get weekly insights on sustainable agriculture research, water quality updates,
              and community stories delivered to your inbox.
              </p>

            <form
              className="subscribe"
              onSubmit={(e) => {
                e.preventDefault();
                alert("work in progress lol");
              }}
            >
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </form>

            <p className="privacy-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Mission Text */}
          <div className="mission-card">
            <h2 className="mission-title">Our Mission</h2>

            <p className="mission-text">
              Rooted In Water is <span className="mission-highlight">Rooted in Culture</span>
            </p>

            <p className="mission-body">
              Sustainability is more than science and data, it is culture. We are committed
              to connecting cutting-edge research with lived experiences, uniting students,
              farmers, and researchers around water-quality data, agricultural practices,
              and community knowledge.
            </p>

            <p className="mission-body">
              Resilience comes not only from technology, but also from the cultural roots
              that guide how we care for our land and water. Together, we're cultivating a more
              sustainable future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

