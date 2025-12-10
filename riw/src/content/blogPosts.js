import wheaticon from "../assets/icons/wheaticon.png";
import toolsicon from "../assets/icons/toolsicon.png";
import microscopeicon from "../assets/icons/microscopeicon.png";

/**
 * Core RIW blog posts, grounded in the NY water–agriculture study.
 * Each post has:
 * - slug: used in /blog/:slug
 * - meta fields for cards
 * - sections: [{ heading, paragraphs: string[] }]
 */
export const BLOG_POSTS = [
  {
    slug: "reading-the-signals-nitrate-turbidity-and-microbial-events",
    title: "Reading the Signals: Nitrate, Turbidity, and Microbial Events in NY Surface Waters",
    authorName: "Tatiana Fernandez",
    authorRole: "Student Researcher",
    avatar: "T",
    date: "Nov 2025",
    location: "New York Rivers, Lakes & Harbor Waters",
    keyword: "Surface Waters",
    icon: microscopeicon,
    readTime: "7 min read",
    teaser:
      "Across New York’s rivers, lakes, and estuaries, elevated nitrate, phosphorus, and turbidity turned out to be reliable early warnings for fecal-indicator bacteria.",
    // Short blurb for the Home page "summary"
    summary:
      "Monthly water-quality data showed that nitrate and phosphorus, followed closely by turbidity, strongly predict when fecal-indicator bacteria exceed thresholds across New York surface waters.",
    sections: [
      {
        heading: "Why Surface Waters Are So Predictable",
        paragraphs: [
          "Compared to a tightly regulated drinking-water distribution system, New York’s rivers, lakes, and estuaries are inherently dynamic. Flow, runoff, and land use combine to create large gradients in nitrate, phosphorus, turbidity, conductivity, temperature, and pH. That variability ends up being incredibly informative for predicting microbial risk.",
          "In the study, monthly microbial event rates were defined as the fraction of samples in a site–month that exceeded fecal-indicator thresholds. When these event rates were modeled with Random Forests using only monthly mean chemistry, the classifier achieved a mean ROC AUC close to 0.90 and a PR AUC above 0.67, far outperforming the distribution-system model and the majority-class baseline.",
        ],
      },
      {
        heading: "Nitrate and Phosphorus as Early Warnings",
        paragraphs: [
          "Feature-importance analysis revealed a clear pattern: nitrate was the single strongest predictor of microbial exceedances, with phosphorus and turbidity close behind. This aligns with the conceptual understanding that nutrient enrichment promotes microbial growth directly and indirectly by increasing organic matter and bloom potential.",
          "Turbidity acts as a physical and hydrologic signal. High turbidity is often associated with runoff pulses, bank erosion, and resuspension of bottom sediments. Those processes can physically transport bacteria and shield them from sunlight and disinfecting conditions, strengthening the link between turbidity and microbial events."
        ],
      },
      {
        heading: "Urban Estuaries vs. Inland Waters",
        paragraphs: [
          "Not all surface-water sites behaved the same way. Estuarine stations influenced by combined sewer overflows, wastewater inputs, and intense recreational use often showed higher and more variable microbial event rates than inland rivers and lakes.",
          "Despite these differences, the same core predictors remained dominant across cross-validation folds. That consistency suggests that nutrient loading and particle dynamics are structural drivers of microbial risk across both urban and rural watersheds, rather than site-specific quirks."
        ],
      },
      {
        heading: "Implications for Monitoring and Management",
        paragraphs: [
          "The results show that routinely measured chemical indicators already capture robust signatures of microbial risk on monthly timescales. That means existing nutrient and turbidity monitoring networks can double as an early-warning layer for microbial exceedances, even without additional biological sampling.",
          "For managers, this opens up the possibility of smarter sampling strategies: prioritizing months and locations with elevated nitrate, phosphorus, and turbidity, and using those signals to anticipate recreational advisories or targeted watershed interventions."
        ],
      },
    ],
  },

  {
    slug: "from-water-quality-to-yield-what-surface-chemistry-says-about-corn",
    title: "From Water Quality to Yield: What Surface Chemistry Says About Corn in New York",
    authorName: "Ambica Chaki",
    authorRole: "Student Researcher",
    avatar: "A",
    date: "Oct 2025",
    location: "New York Agricultural Counties",
    keyword: "Agricultural Yield",
    icon: wheaticon,
    readTime: "8 min read",
    teaser:
      "Annual surface-water chemistry and microbial stress turned out to carry real signal about which county-years fell into low, medium, or high corn-yield classes.",
    summary:
      "By aggregating growing-season water-quality indicators and microbial event rates, the yield model reached a macro F1 of ~0.51, showing that hydrological variability and nutrient patterns align with county-level corn performance.",
    sections: [
      {
        heading: "Building a Yield Classification Problem",
        paragraphs: [
          "The agricultural side of the project focused on corn grain yields reported at the county level by USDA NASS. Continuous yields were converted into three classes—low, medium, and high—using the 33rd and 66th percentiles across all county-year combinations.",
          "This framing turned yield prediction into a balanced three-class classification problem, making it easier to interpret how environmental conditions correspond to broadly ‘good’ versus ‘challenging’ production years."
        ],
      },
      {
        heading: "Turning Water Chemistry into Annual Signals",
        paragraphs: [
          "Surface-water measurements were originally available as monthly site-level records with means of temperature, turbidity, pH, conductivity, nitrate, phosphorus, and a microbial event rate. To connect this to agriculture, those features were aggregated into annual growing-season averages, restricted to April–September.",
          "The resulting table linked each county-year yield record to annual hydrological and water-quality indicators that describe the broader environmental regime crops were exposed to, even though the monitoring sites were not located directly in every field."
        ],
      },
      {
        heading: "How Well Can Water Quality Predict Yield Classes?",
        paragraphs: [
          "Using these annual water-quality features plus year, a Random Forest classifier achieved a macro-averaged F1 score of about 0.51 and a macro ROC AUC near 0.69, clearly outperforming a dummy majority-class baseline. That means the model could distinguish low, medium, and high yield classes substantially better than random guessing.",
          "Importantly, water-quality variables are not direct inputs to crop growth models in the way that weather or soil properties are. Here, they act more like environmental proxies that summarize hydrologic stress, nutrient mobilization, and runoff patterns at regional scale."
        ],
      },
      {
        heading: "What the Model Thinks Matters Most",
        paragraphs: [
          "Feature-importance analysis pointed to turbidity and microbial event rate as especially influential predictors, followed by nitrate and conductivity. Years with elevated turbidity and frequent microbial events tend to coincide with conditions like heavy rainfall, soil disturbance, and waterlogging—all of which can constrain field access, root aeration, and nutrient uptake.",
          "These results hint at an under-used perspective: that water-quality networks built for regulatory and ecological purposes can also provide a valuable environmental context layer for agricultural analytics, especially when combined with more traditional agronomic and remote-sensing datasets."
        ],
      },
    ],
  },

  {
    slug: "linking-water-systems-and-fields-a-spatiotemporal-framework-for-new-york",
    title: "Linking Water Systems and Fields: A Spatiotemporal Framework for New York",
    authorName: "Alysar Tabet",
    authorRole: "Lead Student Researcher",
    avatar: "A",
    date: "Sep 2025",
    location: "Statewide New York",
    keyword: "Framework",
    icon: toolsicon,
    readTime: "9 min read",
    teaser:
      "What happens when you treat NYC drinking water, surface waters, groundwater, and county-level crop yields as one connected system instead of separate silos?",
    summary:
      "The project built a unified spatiotemporal machine-learning framework that harmonizes drinking-water, surface-water, groundwater, and yield datasets to jointly model microbial events and agricultural outcomes across New York State.",
    sections: [
      {
        heading: "Motivation: One State, Many Water Systems",
        paragraphs: [
          "New York’s agricultural economy depends on both surface and groundwater, while its urban centers depend on large reservoir systems and carefully controlled distribution networks. Historically, the data collected on each of these systems have been analyzed in isolation: drinking-water compliance on one side, lake and river monitoring on another, and agricultural statistics on a third.",
          "The core motivation of the project was to ask what we could learn if we treated these datasets as parts of a single spatiotemporal system. Instead of asking, “Is this dataset good enough for its individual regulatory purpose?”, the question becomes, “What cross-system patterns emerge when we look at all of them together?”"
        ],
      },
      {
        heading: "A Unified Spatiotemporal Pipeline",
        paragraphs: [
          "The framework ingests four main data streams: (i) NYC distribution-system chemistry and microbiology, (ii) statewide surface-water chemistry and microbial indicators, (iii) USGS and NYC groundwater datasets, especially from the Long Island Pine Barrens and the NYC watershed, and (iv) county-level corn yields from USDA NASS.",
          "All of these datasets are harmonized into a small set of tidy tables at monthly (site-level) and annual (county-year) scales. That harmonization step handles unit conversions, metadata parsing, non-detect codes, and aligning different sampling schedules, making it possible to train consistent Random Forest models for multiple tasks."
        ],
      },
      {
        heading: "Two Frameworks, Four Models",
        paragraphs: [
          "Framework 1 focuses on microbiological events, with one model for NYC distribution sites and another for surface-water stations. Both use monthly mean chemistry as predictors and binary microbial event labels or event rates as outcomes. Despite strong class imbalance in the distribution system, both models clearly outperform majority-class baselines.",
          "Framework 2 targets agricultural yield classification. One model uses annual surface-water chemistry and microbial event rates alongside year and county to classify yield into low, medium, or high tertiles. The second model adds a high-dimensional groundwater and contaminant feature set from the Pine Barrens to test whether subsurface signals further improve yield prediction."
        ],
      },
      {
        heading: "From Prediction to Interpretation and Maps",
        paragraphs: [
          "Model evaluation relies on ROC AUC, PR AUC, macro-averaged F1, and macro ROC AUC depending on the task. But the framework goes beyond accuracy: feature importance and SHAP-based explanations are used to understand which variables drive predictions, especially in the high-dimensional Pine Barrens yield model.",
          "Finally, all key modeling tables—monthly distribution and surface-water panels, the yield panel, and graph-ready series—are exported as JSON for interactive mapping. This is what powers the RIW visual layer: users can explore microbial hotspots, yield classes, and temporal trends, seeing how model results connect back to the underlying data instead of treating them as black-box outputs."
        ],
      },
    ],
  },
    {
    slug: "chlorine-barriers-and-signals-in-nyc-drinking-water",
    title: "Chlorine Barriers and Signals in NYC Drinking Water",
    authorName: "Alysar Tabet & Tatiana Fernandez",
    authorRole: "Student Researchers",
    avatar: "AT",
    date: "Aug 2025",
    location: "NYC Distribution System",
    keyword: "Drinking Water",
    icon: microscopeicon,
    readTime: "7 min read",
    teaser:
      "Residual chlorine, turbidity, and temperature together shaped how often microbiological indicators appeared in New York City’s distribution system.",
    summary:
      "A Random Forest model trained on NYC distribution-system data showed that residual chlorine, turbidity, temperature, and pH form a strong multi-barrier signal for suppressing microbiological events, even under highly imbalanced classes.",
    sections: [
      {
        heading: "Why Predicting Events in a “Safe” System Matters",
        paragraphs: [
          "NYC’s drinking-water distribution system is designed to maintain very low rates of microbiological exceedances. That’s excellent from a public-health standpoint, but it also creates a difficult modeling problem: the vast majority of months at any given site have zero events.",
          "The study defined a microbial event as any month where at least one distribution sample exceeded a regulatory or operational threshold for fecal indicators. Because those events are rare, even a simple majority-class model achieves deceptively high accuracy, which is why the analysis centered on ROC AUC and PR AUC instead of raw accuracy."
        ]
      },
      {
        heading: "Residual Chlorine as a First Line of Defense",
        paragraphs: [
          "Residual chlorine emerged as the most influential predictor in the NYC model. Higher residual levels were consistently associated with lower probabilities of microbial events, reflecting the system’s reliance on disinfectant residual as a final barrier past treatment and storage.",
          "However, the model also captured that chlorine alone is not the full story. Certain months with moderate chlorine but elevated turbidity or temperature still carried higher risk, underscoring that physical and thermal conditions can partially offset disinfection safety margins."
        ]
      },
      {
        heading: "The Role of Turbidity, Temperature, and pH",
        paragraphs: [
          "Turbidity acted as an important early-warning indicator. Months with higher turbidity were more likely to be flagged as potential event months by the classifier, mirroring how particle loads and distribution disturbances can mobilize biofilms or introduce new microbial loads.",
          "Temperature and pH showed more nuanced relationships. Warmer months tended to increase baseline microbial activity, while pH shifts modulated chlorine effectiveness. These variables did not dominate the model individually, but together with chlorine and turbidity they shaped the risk landscape."
        ]
      },
      {
        heading: "Imbalanced Data and Model Performance",
        paragraphs: [
          "Despite the heavy class imbalance, the Random Forest still achieved ROC AUC values substantially above 0.7, with a PR AUC well exceeding the trivial baseline defined by the proportion of positive months. That means it could meaningfully rank-order months by risk, even though most months had no events.",
          "For utilities, this suggests that combining standard SCADA and compliance indicators—chlorine, turbidity, temperature, pH—can provide a probabilistic early-warning overlay on top of existing monitoring. Rather than replacing regulations, such models can highlight where additional sampling or infrastructure checks would be most valuable."
        ]
      }
    ]
  },

  {
    slug: "groundwater-contaminants-and-yield-resilience-in-the-pine-barrens",
    title: "Groundwater Contaminants and Yield Resilience in the Pine Barrens",
    authorName: "Ambica Chaki & Tatiana Fernandez",
    authorRole: "Student Researchers",
    avatar: "CT",
    date: "Jul 2025",
    location: "Long Island Pine Barrens, NY",
    keyword: "Groundwater & Yield",
    icon: wheaticon,
    readTime: "9 min read",
    teaser:
      "A high-dimensional feature set of groundwater chemistry and contaminants in the Pine Barrens was used to explore how subsurface conditions align with county-level crop yield classes.",
    summary:
      "By fusing Pine Barrens groundwater chemistry, contaminant profiles, and county-level yield data, the project tested whether subsurface signals add explanatory power to a three-class corn-yield model, revealing both promising patterns and the limits of sparse monitoring.",
    sections: [
      {
        heading: "Why Groundwater Matters for Yield",
        paragraphs: [
          "In many parts of New York, including Long Island, irrigated agriculture draws heavily on groundwater. Yet groundwater-quality datasets are often sampled for regulatory or ecosystem purposes rather than for agronomic questions, which means they are underused in yield analytics.",
          "The Pine Barrens dataset compiled for this study brought together major ions, nutrients, trace metals, and selected organic contaminants across multiple years. Although the wells do not sit directly beneath every crop field, they provide a regional view of subsurface conditions that crops indirectly depend on."
        ]
      },
      {
        heading: "From Hundreds of Features to a Yield Model",
        paragraphs: [
          "The Pine Barrens model linked annual summaries of groundwater chemistry and contaminants to a three-class corn-yield target, using the same tertile-based class labels as the surface-water yield model. This produced a high-dimensional feature matrix with nearly two hundred variables per observation.",
          "To cope with this complexity, the study used a Random Forest classifier combined with stratified cross-validation and careful feature scaling. The goal was not just to maximize accuracy, but to probe which subsets of groundwater indicators aligned most consistently with low versus high yield years."
        ]
      },
      {
        heading: "Signals from Nitrate, Conductivity, and Legacy Contaminants",
        paragraphs: [
          "Feature-importance rankings highlighted nitrate and specific conductivity among the top predictors, consistent with the idea that nutrient loading and salt-affected water can both stress crops and alter irrigation practices. Elevated nitrate in groundwater reflected longer-term land use and fertilizer histories, while conductivity captured both natural and anthropogenic dissolved solids.",
          "Some legacy contaminants and trace metals also appeared among the higher-ranked features, though their effects were harder to interpret. In many cases, they likely serve as co-indicators of broader hydrologic and land-use regimes rather than direct causal drivers of yield differences."
        ]
      },
      {
        heading: "Limitations and Next Steps for Subsurface Analytics",
        paragraphs: [
          "The Pine Barrens analysis was constrained by site density, temporal coverage, and the difficulty of matching point-based well data to county-level yields. As a result, performance metrics were only modestly higher than a baseline model using surface-water indicators alone.",
          "Still, the experiment demonstrated that groundwater datasets can be integrated into agricultural classification frameworks and that certain subsurface variables consistently rank as important. Future work could tighten spatial matching using well buffers around irrigated fields, incorporate irrigation volumes, and couple groundwater quality to weather and remote-sensing data for a more complete picture of yield resilience."
        ]
      }
    ]
  },

  {
    slug: "data-gaps-uncertainty-and-future-directions-for-ny-water-ag-modeling",
    title: "Data Gaps, Uncertainty, and Future Directions for NY Water–Ag Modeling",
    authorName: "Alysar Tabet & Ambica Chaki",
    authorRole: "Student Researchers",
    avatar: "AA",
    date: "Jun 2025",
    location: "Statewide New York",
    keyword: "Limitations & Future Work",
    icon: toolsicon,
    readTime: "8 min read",
    teaser:
      "Behind every clean ROC curve lies a messy reality of data gaps, non-detects, spatial mismatch, and shifting climate baselines.",
    summary:
      "The NY water–agriculture framework surfaces important predictive patterns, but it also exposes structural limitations: irregular sampling, non-detect handling, spatial misalignment between monitoring and fields, and the need to move beyond tree ensembles toward spatiotemporal deep learning.",
    sections: [
      {
        heading: "Working with Patchy Environmental Data",
        paragraphs: [
          "Environmental monitoring networks were not designed with machine learning in mind. Sampling frequencies differ by site and program; certain parameters are measured monthly, others quarterly, and some only when something goes wrong. The project had to harmonize these realities into monthly and annual aggregates that models could consume.",
          "That harmonization inevitably compresses information. Short-lived spikes are averaged out, and some months or county-years are dropped altogether due to missing data. While necessary for tractable modeling, these choices introduce uncertainty that needs to be acknowledged alongside performance metrics."
        ]
      },
      {
        heading: "Non-Detects and Low-Level Signals",
        paragraphs: [
          "Many contaminants and microbial indicators are reported as non-detects below analytical limits. In the framework, a pragmatic approach—such as substituting half the detection limit and tracking flags—was used to keep these variables in the feature set.",
          "This strategy preserves relative gradients but may understate the importance of low-level chronic exposures or rare spikes just below detection. A more rigorous approach would model the censored nature of these measurements directly or propagate non-detect uncertainty into the learning process."
        ]
      },
      {
        heading: "Spatial Mismatch Between Monitors and Fields",
        paragraphs: [
          "A recurring challenge is that water-quality monitors and agricultural fields do not occupy the same pixels on the map. Surface-water stations cluster along rivers and lakes, while county-level yield statistics represent aggregated outcomes across diverse soil types, management practices, and microclimates.",
          "In this framework, spatial mismatch was addressed coarsely by aggregating water-quality indicators to county-scale summaries and pairing them with county yields. This makes it possible to find broad associations but cannot capture field-level management differences or sub-county hotspots in either water quality or yield response."
        ]
      },
      {
        heading: "Pathways Toward Richer Spatiotemporal Models",
        paragraphs: [
          "The current models rely on tree ensembles and relatively simple temporal aggregation. Future work could move toward spatiotemporal deep learning architectures that ingest raw time series and geospatial context directly, reducing the need for hand-crafted monthly or annual features.",
          "Integrating additional data sources—weather reanalyses, soil maps, remote sensing of vegetation and moisture, and more detailed management records—would also strengthen causal interpretation. The long-term vision is a modeling ecosystem that treats water, land, and climate as coupled systems, with tools like RIW acting as both a visual front end and a transparent bridge between raw data, models, and community decision-making."
        ]
      }
    ]
  },
];

/** Helper for Blog.jsx */
export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
