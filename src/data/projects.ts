export interface ProjectStat {
  num: string;
  label: string;
}

export interface SkillBadge {
  text: string;
  highlight?: boolean;
}

export interface ArchitectureCard {
  icon: string;
  title: string;
  description: string;
  stack: string[];
  color?: string;
}

export interface Phase {
  num: string;
  title: string;
  badge: string;
  description: string;
  outcomes: string[];
}

export interface Decision {
  num: string;
  badge: string;
  title: string;
  description: string;
}

export interface CostSection {
  title: string;
  items: string[];
}

export interface RecruiterCard {
  icon: string;
  title: string;
  description: string;
}

export type SectionType =
  | { type: 'hero'; subtitle: string }
  | { type: 'stats'; items: ProjectStat[] }
  | { type: 'text'; content: string }
  | { type: 'section'; title: string; content?: string }
  | { type: 'skill-badges'; items: SkillBadge[] }
  | { type: 'architecture-cards'; items: ArchitectureCard[] }
  | { type: 'phases'; items: Phase[] }
  | { type: 'decisions'; items: Decision[] }
  | { type: 'cost'; sections: CostSection[] }
  | { type: 'recruiter-cards'; items: RecruiterCard[] };

export interface Project {
  id: string;
  title: string;
  sections: SectionType[];
  techStack: string[];
  images: string[];
  videos?: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'agriyield-mlops',
    title: 'AgriYield MLOps',
    link: 'https://agri-yield-latest.onrender.com',
    sections: [
      {
        type: 'hero',
        subtitle: 'A production-grade ML-powered crop yield prediction platform for UK agricultural fields. Combines live weather data, soil attributes, and an XGBoost regression model to predict yield (kg/ha) per field — served via a real-time FastAPI backend and an interactive Leaflet map dashboard.',
      },
      {
        type: 'stats',
        items: [
          { num: '113', label: 'UK Fields Mapped' },
          { num: 'XGBoost', label: 'Regression Model' },
          { num: '80%', label: 'Confidence Interval' },
          { num: '~50s', label: 'Cold Start (Render Free)' },
          { num: 'CI/CD', label: 'GitHub Actions → Render' },
        ],
      },
      {
        type: 'section',
        title: 'Features',
      },
      {
        type: 'text',
        content: `🗺️ Interactive UK field map — 113 fields coloured by predicted yield (red → green)
🤖 XGBoost yield model — trained on synthetic UK agricultural data, baked into the Docker image at CI time
🌤️ Live weather integration — Open-Meteo API fetches real-time temperature, precipitation, and solar radiation per field
📊 Confidence intervals — every prediction includes an 80% CI band
🚨 Drift detection — PSI-based feature drift monitoring with per-field warning badges
🔄 CI/CD pipeline — GitHub Actions trains the model, builds the Docker image, pushes to GHCR, and deploys to Render on every push to main
🧠 Smart caching — Redis (with in-memory fallback) caches weather API responses for 1 hour
📈 Prometheus metrics — /metrics endpoint for Grafana integration`,
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'XGBoost', highlight: true },
          { text: 'FastAPI', highlight: true },
          { text: 'CI/CD', highlight: true },
          { text: 'Docker', highlight: true },
          { text: 'Python' },
          { text: 'Leaflet.js' },
          { text: 'Open-Meteo API' },
          { text: 'Redis' },
          { text: 'Prometheus' },
          { text: 'GitHub Actions' },
          { text: 'GHCR' },
          { text: 'Render' },
          { text: 'Pydantic' },
          { text: 'scikit-learn' },
          { text: 'pandas' },
          { text: 'NumPy' },
          { text: 'Uvicorn' },
        ],
      },
      {
        type: 'section',
        title: 'Architecture',
        content: 'GitHub Actions CI trains and packages the model into a Docker image, which is deployed on Render. The FastAPI backend serves predictions using live weather data and cached responses.',
      },
      {
        type: 'architecture-cards',
        items: [
          {
            icon: '🤖',
            title: 'ML Model',
            description: 'XGBoost Regressor trained on synthetic UK agricultural data. Features include lat, lon, area, crop type, soil type, region, weather vars, ET₀, soil moisture, NDVI, and week of year. RMSE ~500-800 kg/ha.',
            stack: ['XGBoost', 'scikit-learn', 'pandas', 'NumPy'],
            color: '#4eaa78',
          },
          {
            icon: '🌤️',
            title: 'Live Weather Ingestion',
            description: 'Open-Meteo API fetches temperature, precipitation, and solar radiation per field at inference time. Fallback chain: Redis cache → Live API → In-memory → UK seasonal defaults.',
            stack: ['Open-Meteo API', 'Redis', 'httpx'],
            color: '#6ba3e0',
          },
          {
            icon: '🚀',
            title: 'FastAPI Serving',
            description: 'GET /fields predicts all 113 fields with confidence intervals. GET /metrics exposes Prometheus endpoints. Static HTML/JS dashboard served via Leaflet.js map.',
            stack: ['FastAPI', 'Uvicorn', 'Pydantic', 'Leaflet.js'],
            color: '#e07a3a',
          },
          {
            icon: '🔄',
            title: 'CI/CD Pipeline',
            description: 'GitHub Actions generates training data, trains XGBoost, bakes model.pkl into Docker image, pushes to GHCR, and triggers Render deploy — all on every push to main.',
            stack: ['GitHub Actions', 'Docker', 'GHCR', 'Render'],
            color: '#a86fdf',
          },
          {
            icon: '📊',
            title: 'Monitoring & Drift',
            description: 'PSI (Population Stability Index) computed per feature on every /fields call. Fields with PSI > 0.2 display a DRIFT warning badge. Prometheus metrics available at /metrics.',
            stack: ['Prometheus', 'PSI', 'Grafana'],
            color: '#dd6974',
          },
          {
            icon: '🧠',
            title: 'Smart Caching',
            description: 'Redis caches weather API responses for 1 hour with in-memory fallback. Ensures the free-tier Render instance stays responsive under load without hammering the weather API.',
            stack: ['Redis', 'In-memory Cache'],
            color: '#e8af34',
          },
        ],
      },
      {
        type: 'section',
        title: 'ML Model',
        content: 'XGBoost Regressor trained end-to-end in CI — no stale artefacts, no manual uploads.',
      },
      {
        type: 'text',
        content: `Algorithm: XGBoost Regressor
Target: yield_kg_per_ha
Features: lat, lon, area, crop type, soil type, region, temperature, precipitation, solar radiation, ET₀, soil moisture, NDVI, week of year
Train/test split: 80/20
RMSE: ~500-800 kg/ha (synthetic data)
Confidence interval: ±15% of prediction (configurable via CI_WIDTH env var)

The model is retrained from scratch on every CI run. The trained model.pkl is baked directly into the production Docker image — no stale artefacts, no manual uploads.`,
      },
      {
        type: 'section',
        title: 'Live Weather Integration',
      },
      {
        type: 'text',
        content: `Weather data is fetched from the Open-Meteo API (free, no API key required) for each field's coordinates.

Features used at inference time:
- Temperature (°C) — temperature_2m_max today
- Precipitation (mm) — precipitation_sum today
- Solar radiation (MJ/m²) — shortwave_radiation_sum today

Fallback chain: Redis cache → Live API → In-memory cache → UK seasonal defaults. The STALE DATA badge appears when defaults are used.`,
      },
      {
        type: 'section',
        title: 'Project Structure',
      },
      {
        type: 'text',
        content: `agri-yield/
├── .github/workflows/deploy.yml   # Train → Build → Push → Deploy
├── data/seed/uk_fields.csv        # 113 UK farm fields with metadata
├── ingestion/openmeteo_live.py    # Live weather fetcher with caching
├── serving/
│   ├── app.py                     # FastAPI app + /fields endpoint
│   ├── model.py                   # Model loader + predict()
│   └── static/                    # Dashboard HTML/CSS/JS
├── training/
│   ├── train_and_export.py        # XGBoost training script
│   └── utils/features.py          # Canonical FEATURE_COLS
├── monitoring/drift.py            # PSI drift detector
├── generate_data.py               # Synthetic UK agricultural data generator
├── Dockerfile.prod                # Production image (bakes model.pkl)
└── pyproject.toml`,
      },
      {
        type: 'section',
        title: 'CI/CD Pipeline',
        content: 'Every push to main triggers a fully automated pipeline.',
      },
      {
        type: 'text',
        content: `push to main
  │
  ▼
[1] Generate synthetic training data
  │
  ▼
[2] Train XGBoost → save model.pkl
  │
  ▼
[3] docker build -f Dockerfile.prod (bakes model.pkl in)
  │
  ▼
[4] docker push ghcr.io/hulashc/agri-yield:latest
  │
  ▼
[5] curl RENDER_DEPLOY_HOOK → Render redeploys`,
      },
      {
        type: 'section',
        title: 'Three Decisions That Matter',
        content: 'These aren\'t implementation details — they\'re what separates this project from a Jupyter notebook demo.',
      },
      {
        type: 'decisions',
        items: [
          {
            num: '01',
            badge: 'Non-negotiable',
            title: 'Temporal train/test splitting',
            description: 'Any shuffle-based split in this pipeline is a bug. Yield data has strong temporal autocorrelation — shuffling leaks future harvest seasons into training, inflating every metric while the deployed model silently fails. Uses standard 80/20 split with time-aware ordering.',
          },
          {
            num: '02',
            badge: 'Architectural decision',
            title: 'Model baked at CI time, not at serving time',
            description: 'The model.pkl is trained and baked into the Docker image during CI, not downloaded at container start. This eliminates runtime dependency on model registries, reduces cold start time, and guarantees every deploy has a matching, immutable model artefact.',
          },
          {
            num: '03',
            badge: 'Resilience',
            title: 'Multi-layer weather fallback chain',
            description: 'Weather API failures don\'t crash the service. A four-level fallback chain (Redis → Live API → In-memory → UK seasonal defaults) ensures predictions always return, with a STALE DATA badge when defaults are used. This is production-grade defensive design.',
          },
        ],
      },
      {
        type: 'section',
        title: 'Is This Free to Run?',
        content: 'Yes — the entire project runs on free tiers. No paid API keys required.',
      },
      {
        type: 'cost',
        sections: [
          {
            title: '✅ Fully free',
            items: [
              'XGBoost, FastAPI, Uvicorn — all open source',
              'Open-Meteo API — free, no API key required',
              'GitHub Actions — free tier for public repos',
              'GitHub Container Registry (GHCR) — free for public images',
              'Render free tier — hosts the live demo (expect ~50s cold start)',
              'Redis (in-memory fallback) — no separate Redis instance needed',
            ],
          },
          {
            title: '💰 If scaling up',
            items: [
              'Paid Render instance — removes cold start, ~$7/month',
              'Dedicated Redis — for persistent caching across restarts',
              'Custom domain — if you want to brand the deployment',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'What This Project Proves',
        content: 'Every component demonstrates a distinct engineering capability for data engineering and MLOps roles.',
      },
      {
        type: 'recruiter-cards',
        items: [
          {
            icon: '🔗',
            title: 'End-to-End MLOps',
            description: 'From synthetic data generation to deployed, monitored inference — the full lifecycle is automated in CI/CD. No manual steps, no Jupyter notebooks in production.',
          },
          {
            icon: '🌤️',
            title: 'API Integration & Resilience',
            description: 'Live weather API integration with a four-level fallback chain demonstrates robust external dependency management — a core skill for production data systems.',
          },
          {
            icon: '📐',
            title: 'Docker & Deployment',
            description: 'Multi-stage Docker build with model baked in at CI time, pushed to GHCR, and deployed to Render. Demonstrates containerization and deployment pipeline skills.',
          },
          {
            icon: '🔄',
            title: 'CI/CD Pipeline Engineering',
            description: 'GitHub Actions pipeline that trains, builds, pushes, and deploys on every push. Infrastructure-as-code for the entire ML lifecycle.',
          },
          {
            icon: '📊',
            title: 'Monitoring & Observability',
            description: 'PSI-based drift detection with per-field warning badges, Prometheus metrics endpoint, and Grafana-ready monitoring. Production-grade observability on a free tier.',
          },
          {
            icon: '🗺️',
            title: 'Interactive Visualization',
            description: 'Leaflet.js map dashboard with 113 colour-coded fields shows the ability to build user-facing data products, not just backend APIs.',
          },
        ],
      },
    ],
    techStack: ['XGBoost', 'FastAPI', 'Docker', 'GitHub Actions', 'Leaflet.js', 'Redis', 'Prometheus', 'Open-Meteo API', 'Render'],
    images: [],
    videos: [],
  },
  {
    id: 'real-time-financial-analytics',
    title: 'Real-Time Financial Analytics',
    sections: [
      {
        type: 'text',
        content: `Built a comprehensive real-time financial analytics platform that processes millions of transactions daily, providing actionable insights for trading desks and risk management teams.

The system handles streaming data from multiple sources including market feeds, trade execution systems, and regulatory reporting channels. Low-latency processing ensures traders receive up-to-the-second market intelligence.

Key features include real-time risk calculations, portfolio performance monitoring, anomaly detection using machine learning, and automated alerting for threshold breaches.`,
      },
    ],
    techStack: ['Kafka', 'Spark Streaming', 'AWS', 'PostgreSQL', 'Python', 'TensorFlow'],
    images: [],
    videos: [],
    link: 'https://github.com/hchand',
  },
  {
    id: 'generative-ai-data-pipeline',
    title: 'Generative AI Data Pipeline',
    sections: [
      {
        type: 'text',
        content: `Designed and implemented a scalable data pipeline for generative AI applications, enabling efficient processing and retrieval of contextual information for large language models.

The pipeline implements a RAG (Retrieval Augmented Generation) architecture, combining vector search with traditional data processing to provide LLMs with accurate, up-to-date context from enterprise knowledge bases.

Features include automated data ingestion, chunking and embedding generation, vector storage with approximate nearest neighbor search, and real-time index updates for dynamic content.`,
      },
    ],
    techStack: ['LLM APIs', 'RAG', 'Python', 'AWS Lambda', 'Pinecone', 'LangChain'],
    images: [],
    videos: [],
    link: 'https://github.com/hchand',
  },
];