import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Categories
const ALLOWED_CATEGORIES = ["water", "soil", "climate", "microbiology"];

// Safe fetch 
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Checks title, description, topics
function belongsToAllowedCategory(text = "", topics = []) {
  const lower = text.toLowerCase();

  if (ALLOWED_CATEGORIES.some((cat) => lower.includes(cat))) return true;

  if (topics.length > 0) {
    const normalized = topics.map((t) => t.toLowerCase());
    if (ALLOWED_CATEGORIES.some((cat) => normalized.includes(cat))) return true;
  }

  return false;
}

/* ------------------------------------------------------
   LATEST DATASETS
------------------------------------------------------ */
router.get("/datasets", async (req, res) => {
  try {
    const url = `https://api.us.socrata.com/api/catalog/v1?search_context=data.ny.gov&limit=50`;
    const raw = await safeFetch(url);

    let items =
      (raw?.results || [])
        .map((i) => ({
          title: i.resource?.name || "",
          description: i.resource?.description || "",
          year: i.resource?.updatedAt?.slice(0, 4) || "",
          link: i.permalink || "",
          source: i.metadata?.domain || "NY State Open Data",
        }))
        .filter((i) => {
          if (!i.description || i.description.trim().length < 30) return false;
          return belongsToAllowedCategory(i.title, []) ||
                 belongsToAllowedCategory(i.description, []);
        });

    const pick3 = items.sort(() => Math.random() - 0.5).slice(0, 3);

    res.json({ results: pick3 });
  } catch (e) {
    console.log("DATASET ERROR:", e);
    res.json({ results: [] });
  }
});

/* ------------------------------------------------------
   LATEST ARTICLES
------------------------------------------------------ */
router.get("/articles", async (req, res) => {
  try {
    const url = `https://api.crossref.org/works?filter=type:journal-article&query=water agriculture soil climate microbiology&sort=published&order=desc&rows=30`;

    const raw = await safeFetch(url);

    let items =
      (raw?.message?.items || [])
        .map((a) => ({
          title: a.title?.[0] || "",
          date: a.created?.["date-time"]?.slice(0, 10) || "",
          description: a.abstract
            ? a.abstract.replace(/<\/?[^>]+(>|$)/g, "")
            : "",
          link: a.URL || "",
          source: a.publisher || "Research Article",
          topics: Array.isArray(a.subject) ? a.subject : [],
        }))
        .filter((a) => {
          const text = a.description?.trim() || "";

          if (!text) return false;
          if (text === "..." || text === "…") return false;
          if (/^\.*$/.test(text)) return false;
          if (!/[a-zA-Z]/.test(text)) return false;

          // Only include allowed categories
          return belongsToAllowedCategory(a.title, a.topics) ||
                 belongsToAllowedCategory(a.description, a.topics);
        });

    const pick3 = items.sort(() => Math.random() - 0.5).slice(0, 3);

    res.json({ results: pick3 });
  } catch (e) {
    console.log("ARTICLE ERROR:", e);
    res.json({ results: [] });
  }
});

export default router;
