import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Categories
const ALLOWED_CATEGORIES = ["water", "soil", "climate", "microbiology"];

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function matchesCategory(text = "", category) {
  return text.toLowerCase().includes(category.toLowerCase());
}

// Relevance scoring
function relevanceScore(item, query) {
  const q = query.toLowerCase();
  const title = (item.title || "").toLowerCase();
  const desc = (item.description || "").toLowerCase();

  let score = 0;

  if (title.includes(q)) score += 6;
  if (desc.includes(q)) score += 4;

  if (title.startsWith(q)) score += 2;
  if (desc.startsWith(q)) score += 1;

  const BOOST = [
    "water", "soil", "climate", "microb",
    "pollution", "nitrate", "nitrogen",
    "hydro", "agriculture"
  ];

  BOOST.forEach((word) => {
    if (desc.includes(word)) score += 1;
  });

  return score;
}

router.get("/", async (req, res) => {
  console.log("QUERY:", req.query);

  let query = req.query.q?.trim() || "";

  const filterType = req.query.type || "Any";
  const filterCategory = req.query.category || "All";
  const filterLocation = req.query.location || "";
  const dateRange = req.query.dateRange || "";

  if (!query) {
    return res.json({ results: [] });
  }

  try {
    // =====================================================
    // 1. DATA.GOV (PUBLIC)
    // =====================================================
    const dataGovURL = `https://catalog.data.gov/api/3/action/package_search?q=${encodeURIComponent(
      query
    )}&rows=60`;

    const dataGovRaw = await safeFetch(dataGovURL);

    const dataGov =
      dataGovRaw?.result?.results?.map((d) => ({
        type: "dataset",
        title: d.title || "",
        description: d.notes || "",
        source: "Data.gov",
        year: d.metadata_created?.slice(0, 4) || "",
        link: `https://catalog.data.gov/dataset/${d.name}`,   
        subjects: d.tags?.map((t) => t.display_name?.toLowerCase()) || []
      })) || [];

    // =====================================================
    // 2. NYC OPEN DATA (PUBLIC)
    // =====================================================
    const nycURL = `https://api.us.socrata.com/api/catalog/v1?q=${encodeURIComponent(
      query
    )}&search_context=data.cityofnewyork.us&limit=60`;

    const nycRaw = await safeFetch(nycURL);

    const nyc =
      nycRaw?.results?.map((item) => ({
        type: "dataset",
        title: item.resource?.name || "",
        description: item.resource?.description || "",
        source: "NYC Open Data",
        year: item.resource?.updatedAt?.slice(0, 4) || "",
        link:
          item.permalink ||
          `https://data.cityofnewyork.us/d/${item.resource?.id}`, 
        subjects: item.classification?.domain_tags || []
      })) || [];

    // =====================================================
    // 3. NY STATE OPEN DATA (PUBLIC)
    // =====================================================
    const nyStateURL = `https://api.us.socrata.com/api/catalog/v1?q=${encodeURIComponent(
      query
    )}&search_context=data.ny.gov&limit=60`;

    const nyStateRaw = await safeFetch(nyStateURL);

    const nyState =
      nyStateRaw?.results?.map((item) => ({
        type: "dataset",
        title: item.resource?.name || "",
        description: item.resource?.description || "",
        source: "NY State Open Data",
        year: item.resource?.updatedAt?.slice(0, 4) || "",
        link:
          item.permalink ||
          `https://data.ny.gov/d/${item.resource?.id}`, 
        subjects: item.classification?.domain_tags || []
      })) || [];

    // =====================================================
    // 4. CROSSREF ARTICLES (PUBLIC)
    // =====================================================
    const crossrefURL = `https://api.crossref.org/works?query=${encodeURIComponent(
      query
    )}&filter=type:journal-article&rows=30`;

    const crossrefRaw = await safeFetch(crossrefURL);

    const crossref =
      crossrefRaw?.message?.items?.map((a) => ({
        type: "article",
        title: a.title?.[0] || "",
        description: a.abstract
          ? a.abstract.replace(/<\/?[^>]+(>|$)/g, "")
          : "",
        source: a.publisher || "Unknown",
        year: a.created?.["date-time"]?.slice(0, 4) || "",
        link: a.URL || "",
        subjects: a.subject?.map((s) => s.toLowerCase()) || []
      })) || [];

    let combined = [...dataGov, ...nyc, ...nyState, ...crossref];

    console.log("BEFORE FILTERING:", combined.length);

    if (filterType === "Dataset") {
      combined = combined.filter((i) => i.type === "dataset");
    } else if (filterType === "Article") {
      combined = combined.filter((i) => i.type === "article");
    }

    if (filterCategory !== "All") {
      const cat = filterCategory.toLowerCase();

      combined = combined.filter(
        (i) =>
          matchesCategory(i.title, cat) ||
          matchesCategory(i.description, cat) ||
          i.subjects?.some((s) => s.includes(cat))
      );
    }

    if (filterLocation.trim()) {
      const loc = filterLocation.toLowerCase();

      combined = combined.filter(
        (i) =>
          i.title.toLowerCase().includes(loc) ||
          i.description.toLowerCase().includes(loc)
      );
    }

    if (dateRange.includes("–")) {
      const [start, end] = dateRange.split("–").map(Number);

      combined = combined.filter((i) => {
        const y = Number(i.year);
        return y >= start && y <= end;
      });
    }

    combined.sort(
      (a, b) => relevanceScore(b, query) - relevanceScore(a, query)
    );

    console.log("AFTER FILTERING:", combined.length);

    return res.json({ results: combined });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.json({ results: [] });
  }
});

export default router;
