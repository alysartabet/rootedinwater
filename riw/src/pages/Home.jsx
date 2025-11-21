import imgAgro from "../assets/articles/agro-forestry.jpg";
import imgClimate from "../assets/articles/climate-resilient.jpg";
import imgSoil from "../assets/articles/soil-microbiome.jpg";
import imgWater from "../assets/articles/water-management.png";
import wheaticon from "../assets/icons/wheaticon.png";
import toolsicon from "../assets/icons/toolsicon.png";
import microscopeicon from "../assets/icons/microscopeicon.png";
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
 <div className="popular-bleed" role="navigation" aria-label="Popular Searches">
  <div className="container popular-ribbon">

    <div className="popular-title-wrap">
      <h2 className="popular-title">Popular Searches</h2>
    </div>

    <div className="popular-pills-wrap">
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

        <button
          className="rs-cta"
          onClick={() =>
            document.querySelector("#maps").scrollIntoView({ behavior: "smooth" })}>
          Explore the Full Map
        </button>

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
                <img src="/src/assets/icons/locationicon.svg" />
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
        that guide how we care for our land and water. Together, we’re cultivating a more
        sustainable future.
      </p>
    </div>

  </div>
</section>

    </div>
  );
}
