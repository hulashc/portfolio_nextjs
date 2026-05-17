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

export interface TimelineEntry {
  year: string;
  title: string;
  category: string;
  ghostText: string;
  imageUrl: string;
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
  | { type: 'recruiter-cards'; items: RecruiterCard[] }
  | { type: 'videos'; sources: string[] }
  | { type: 'embed'; url: string; height?: string }
  | { type: 'paper-button'; label: string; url: string }
  | { type: 'art-viewer' }
  | { type: 'timeline'; entries: TimelineEntry[] };

export interface Project {
  id: string;
  title: string;
  excerpt: string;
  flagship?: boolean;
  sections: SectionType[];
  techStack: string[];
  images: string[];
  videos?: string[];
  link?: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    id: 'agriyield-mlops',
    title: 'AgriYield MLOps',
    flagship: true,
    excerpt: 'Predicts crop yield across 113 UK fields with live weather integration, automated CI/CD, and production-grade drift monitoring.',
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
✅ Automated tests — pytest runs in CI before build; /health verified post-deploy
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
├── monitoring/psi_detector.py     # PSI drift detector
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
[3] Run pytest (feature cols, temporal split, metrics)
  │
  ▼
[4] docker build -f Dockerfile.prod (bakes model.pkl + git SHA version)
  │
  ▼
[5] docker push ghcr.io/hulashc/agri-yield:latest
  │
  ▼
[6] curl RENDER_DEPLOY_HOOK → Render redeploys
  │
  ▼
[7] Poll /health until 200 → verify deploy succeeded`,
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
            description: 'Any shuffle-based split in this pipeline is a bug. Yield data has strong temporal autocorrelation — shuffling leaks future harvest seasons into training, inflating every metric while the deployed model silently fails. Uses temporal 80/20 split sorted by week — no shuffle, no future leakage.',
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
    id: 'lunar-dominion',
    title: 'Lunar Dominion',
    excerpt: 'A persistent browser-based multiplayer strategy game on a hexagonal moon grid — real-time sync, spatial data modelling, and RLS-secured tile claiming.',
    sections: [
      {
        type: 'hero',
        subtitle: 'A persistent, browser-based multiplayer strategy game set on the surface of the Moon. The Moon is divided into a massive hexagonal grid — every user starts with a handful of credits and zero territory. From there, they expand, build, and compete in a shared real-time world that never resets.',
      },
      {
        type: 'stats',
        items: [
          { num: 'Hex Grid', label: 'Axial Coordinate System' },
          { num: 'Real-Time', label: 'Supabase Realtime Pub/Sub' },
          { num: 'RLS', label: 'Row-Level Security' },
          { num: 'Canvas', label: 'Viewport Culled Rendering' },
        ],
      },
      {
        type: 'section',
        title: 'Project Vision & Goals',
      },
      {
        type: 'text',
        content: `Lunar Hex Dominion is a persistent, browser-based multiplayer strategy game set on the surface of the Moon. The Moon is divided into a massive hexagonal grid — every user starts with a handful of credits and zero territory. From there, they expand, build, and compete in a shared real-time world that never resets.`,
      },
      {
        type: 'section',
        title: 'Technical Goals',
      },
      {
        type: 'text',
        content: `🔷 Demonstrate real-time pub/sub architecture with Supabase Realtime
🔷 Showcase spatial data modelling using axial hex coordinates in PostgreSQL
🔷 Build a scalable multiplayer synchronisation layer
🔷 Implement Row-Level Security for conflict-safe tile claiming
🔷 Practice performant Canvas rendering (viewport culling, chunking)`,
      },
      {
        type: 'section',
        title: 'Portfolio Goals',
      },
      {
        type: 'text',
        content: `🎯 Strong frontend engineering — complex interactive UI
🎯 Backend architecture understanding — schema, indexes, RLS
🎯 Real-time state management — Zustand + Supabase channels
🎯 Product thinking — phased roadmap, MVP discipline
🎯 Visually memorable demo for recruiter / interview settings`,
      },
      {
        type: 'section',
        title: 'Architecture',
      },
      {
        type: 'architecture-cards',
        items: [
          {
            icon: '🌙',
            title: 'Game Client',
            description: 'React + TypeScript canvas renderer with viewport culling. Zustand for client state, WebSocket sync via Supabase Realtime channels.',
            stack: ['React', 'TypeScript', 'Canvas API', 'Zustand', 'Vite'],
            color: '#a86fdf',
          },
          {
            icon: '🗄️',
            title: 'Database Layer',
            description: 'PostgreSQL with PostGIS for hex coordinate spatial queries. RLS policies per tile for conflict-safe claiming. Optimized indexes for range queries.',
            stack: ['PostgreSQL', 'PostGIS', 'Supabase', 'RLS'],
            color: '#6ba3e0',
          },
          {
            icon: '🔄',
            title: 'Realtime Sync',
            description: 'Supabase Realtime broadcasts tile state changes to all connected clients. Optimistic updates with server-side validation. Conflict resolution via RLS.',
            stack: ['Supabase Realtime', 'WebSocket', 'Broadcast', 'Presence'],
            color: '#e07a3a',
          },
          {
            icon: '🎮',
            title: 'Game Logic Server',
            description: 'Server-side game loop handling economy ticks, combat resolution, and territory expansion. PostgreSQL functions for atomic tile operations.',
            stack: ['PostgreSQL Functions', 'Supabase Edge Functions', 'Node.js'],
            color: '#4eaa78',
          },
        ],
      },
      {
        type: 'section',
        title: 'Phased Roadmap',
      },
      {
        type: 'phases',
        items: [
          {
            num: '1',
            title: 'MVP',
            badge: 'Core Loop',
            description: 'Interactive hex grid rendering + tile claiming + basic economy. Single-player mode to validate the game loop.',
            outcomes: ['Hex grid with axial coordinates', 'Click-to-claim tiles', 'Credit economy tick', 'Minimal Canvas renderer'],
          },
          {
            num: '2',
            title: 'Multiplayer',
            badge: 'Real-Time',
            description: 'Supabase Realtime integration for shared game state. Multiple players can see each other on the same map.',
            outcomes: ['Real-time tile updates', 'Player presence', 'Conflict detection', 'RLS policies per tile'],
          },
          {
            num: '3',
            title: 'Strategy Layer',
            badge: 'Gameplay Depth',
            description: 'Add military units, resource generation, and territory bonuses. Combat resolution and attack/defend mechanics.',
            outcomes: ['Unit types & stats', 'Combat system', 'Resource generation', 'Territory bonuses'],
          },
          {
            num: '4',
            title: 'Polish',
            badge: 'Production',
            description: 'Visual effects, sound design, mobile support, and performance optimization for large maps with hundreds of players.',
            outcomes: ['Canvas performance tuning', 'Chunked map loading', 'Mobile touch support', 'Leaderboard / stats'],
          },
        ],
      },
      {
        type: 'section',
        title: 'Skills & Technologies',
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'Supabase Realtime', highlight: true },
          { text: 'PostgreSQL + PostGIS', highlight: true },
          { text: 'Canvas Rendering', highlight: true },
          { text: 'RLS', highlight: true },
          { text: 'Hex Grid Spatial Math', highlight: true },
          { text: 'Zustand' },
          { text: 'TypeScript' },
          { text: 'React' },
          { text: 'WebSocket Pub/Sub' },
          { text: 'Vite' },
          { text: 'Edge Functions' },
          { text: 'Viewport Culling' },
        ],
      },
    ],
    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'PostGIS', 'Canvas API', 'Zustand', 'WebSocket'],
    images: [],
    videos: [],
  },
  {
    id: 'bird-song-mathematical-model',
    title: 'Bird Song Mathematical Model',
    flagship: true,
    excerpt: 'Interactive 3D acoustic manifold visualization with MFCC feature extraction, PCA dimensionality reduction, kNN species classification, and a conversational AI assistant — powered by FastAPI, Three.js, and Groq.',
    link: 'https://hulashc.github.io/birdsong/',
    githubLink: 'https://github.com/hulashc/birdsong',
    sections: [
      {
        type: 'hero',
        subtitle: 'An interactive 3D acoustic manifold visualization of bird vocalisations. Extracts 57-dimensional MFCC feature vectors per frame, reduces them to 3 principal components via PCA, classifies species using kNN (cosine similarity, k=5), and serves it all through a FastAPI backend with a Three.js frontend and a conversational AI assistant powered by Llama 3.1.',
      },
      {
        type: 'embed',
        url: 'https://hulashc.github.io/birdsong/',
        height: '500px',
      },
      {
        type: 'section',
        title: 'Research Paper',
        content: 'A full academic paper documenting the mathematical model, feature extraction pipeline, PCA reduction, and system architecture.',
      },
      {
        type: 'paper-button',
        label: 'Birdsong_paper',
        url: '/Birdsong_paper.pdf',
      },
      {
        type: 'text',
        content: `Built to explore the intersection of audio DSP, machine learning, and real-time graphics, the project demonstrates how complex sound data can be converted into meaningful visual structures.`,
      },
      {
        type: 'section',
        title: 'Project Overview',
      },
      {
        type: 'text',
        content: `The system processes raw bird audio through a Python-based ML pipeline that extracts 57-dimensional feature vectors per frame using <a href="https://librosa.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">librosa</a>. The feature vector comprises MFCCs (1–13), delta and delta-delta MFCCs, spectral centroid, bandwidth, rolloff, zero-crossing rate, RMS energy, and mel-spectrogram bands — capturing timbre, texture, and spectral range of each 23ms frame.

Since visualizing 57 dimensions directly is impossible, the pipeline applies Principal Component Analysis (PCA) using <a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">scikit-learn</a> to reduce the feature space into 3 principal components — mapped to Timbre (X), Texture (Y), and Spectral range (Z) — while preserving the most important variation in the signal.

The reduced data is rendered as an animated 3D trajectory using <a href="https://threejs.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Three.js</a>, with points coloured by energy (dark → silence, amber → peak) and sized by amplitude. A <strong>kNN classifier</strong> (cosine similarity, k=5) identifies the closest matching species from the manifold.

A FastAPI backend serves the manifold data, processes uploaded audio files for real-time classification, and powers a conversational AI assistant built on <strong>Llama 3.1 8B Instant</strong> via Groq — enabling natural-language questions about each species.`,
      },
      {
        type: 'section',
        title: 'How It Works',
      },
      {
        type: 'text',
        content: `<strong>1. Audio Processing Pipeline</strong>
Raw bird audio is loaded and segmented into 23ms frames
57-dimensional MFCC + spectral features extracted per frame using librosa
Features are normalized and scaled
PCA compresses the data into 3 principal coordinates

<strong>2. Acoustic Manifold</strong>
X axis → Timbre (tonal colour of the voice)
Y axis → Texture (how rapidly the sound changes)
Z axis → Spectral range (frequency distribution)
Points coloured by energy, sized by amplitude

<strong>3. Real-Time 3D Visualization</strong>
Three.js renders the PCA trajectory as an animated comet trail
Orbit controls for free exploration of the sound structure
Points are coloured by energy (dark → silence, amber → peak)
Binary-search frame mapping keeps audio synced with animation

<strong>4. kNN Species Classification</strong>
Upload your own audio via drag-and-drop
Pipeline extracts features and projects into the same PCA space
Cosine similarity search (k=5) identifies the closest matching species

<strong>5. AI Assistant</strong>
Conversational ornithology assistant powered by Llama 3.1 8B Instant (Groq)
Ask natural-language questions about species behaviour, habitat, and characteristics
Full chat history maintained per session`,
      },
      {
        type: 'section',
        title: 'Technical Highlights',
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'MFCC Feature Extraction', highlight: true },
          { text: 'PCA Dimensionality Reduction', highlight: true },
          { text: 'kNN Species Classification', highlight: true },
          { text: 'FastAPI Backend', highlight: true },
          { text: 'Three.js 3D Rendering', highlight: true },
          { text: 'Groq LLM Integration', highlight: true },
          { text: 'Audio Upload & Classification', highlight: true },
          { text: 'GitHub Pages + Render', highlight: true },
        ],
      },
      {
        type: 'section',
        title: 'Tech Stack',
      },
      {
        type: 'text',
        content: `Technology — Purpose
Python — Audio processing pipeline
<a href="https://librosa.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">librosa</a> — MFCC + spectral feature extraction
<a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">scikit-learn</a> — PCA + kNN classifier
<a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">FastAPI</a> — REST API backend
<a href="https://threejs.org/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Three.js</a> — 3D WebGL rendering
<a href="https://groq.com/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Groq API</a> — Llama 3.1 conversational AI
Render — Backend hosting
GitHub Pages — Frontend hosting`,
      },
      {
        type: 'stats',
        items: [
          { num: '57', label: 'MFCC Features Per Frame' },
          { num: '3', label: 'PCA Dimensions' },
          { num: 'k=5', label: 'kNN Cosine Similarity' },
          { num: '13+', label: 'Bird Species Mapped' },
        ],
      },
      {
        type: 'section',
        title: 'Best Way to Explain It in Conversation',
      },
      {
        type: 'text',
        content: `<strong>Short Version (30 seconds)</strong>
"I built an interactive 3D acoustic manifold that visualizes bird vocalisations. It extracts 57 MFCC features per audio frame, reduces them to 3 dimensions via PCA, and renders the result as an animated trajectory in Three.js. It also classifies uploaded recordings using kNN and answers questions about each species through a Llama 3.1 AI assistant."

<strong>Medium Version (Interview Style)</strong>
"The project started as an experiment in turning sound into geometry. I used Python and librosa to extract 57-dimensional MFCC feature vectors from birdsong recordings frame-by-frame. Since that data is high-dimensional, I applied PCA to reduce it into 3 principal components — representing timbre, texture, and spectral range — while preserving the most important acoustic variation.

The reduced data is served through a FastAPI backend and rendered as a comet-trail animation in Three.js. I also built a kNN classifier (cosine similarity, k=5) that can identify species from uploaded audio, and integrated a Groq-powered Llama 3.1 assistant for natural-language conversations about each bird.

The full stack spans audio DSP, machine learning, REST API design, real-time 3D rendering, and LLM integration — all connected in a single end-to-end system."`,
      },
      {
        type: 'section',
        title: 'Why It Stands Out',
      },
      {
        type: 'text',
        content: `This project is a strong differentiator because it combines:

• Audio DSP and MFCC feature extraction
• PCA dimensionality reduction and manifold mapping
• kNN classification for species identification
• Real-time Three.js 3D rendering
• FastAPI backend architecture
• LLM integration (Groq + Llama 3.1)
• Full-stack deployment (GitHub Pages + Render)

Most projects focus on only one of these areas. This one demonstrates the ability to connect them all — from raw audio to interactive 3D visualization to conversational AI — in a single end-to-end system.`,
      },
    ],
    techStack: ['Python', 'librosa', 'scikit-learn', 'FastAPI', 'Three.js', 'Groq', 'Llama 3.1', 'PCA', 'kNN', 'NumPy', 'Render', 'GitHub Pages'],
    images: [],
  },
  {
    id: 'ar-gesture-menu',
    title: 'AR Gesture-Controlled Menu System',
    excerpt: 'Touchless computer interaction using hand gestures via a standard webcam — MediaPipe hand tracking, gesture recognition, and AR overlay rendering.',
    link: 'https://github.com/hulashc/ARGestures_controlled_system',
    sections: [
      {
        type: 'hero',
        subtitle: 'Touchless control. No hardware. Just a hand and a camera. A real-time AR interface for touchless human-computer interaction — hand tracking, gesture recognition, and Jarvis-style menu navigation.',
      },
      {
        type: 'section',
        title: 'The Question',
      },
      {
        type: 'text',
        content: `What would it take to control a system using only gestures, with nothing but a standard webcam? No depth sensors. No specialised gloves. No expensive AR headset. Just Python, a camera, and the right libraries. This project was my attempt to answer that.`,
      },
      {
        type: 'section',
        title: 'What It Does',
      },
      {
        type: 'text',
        content: `ARGestures is a real-time, hand gesture-controlled system that uses a webcam feed to track hand landmarks and translate distinct poses into system-level controls. An AR-style overlay renders directly onto the live camera feed, giving the user visual feedback as they interact.

The system is composed of several modular components:

hand_tracking.py — Interfaces with MediaPipe's Hand Landmarker model to detect and stream 21 hand landmarks per frame in real time
gesture_engine.py — Classifies those landmarks into recognised gestures using geometric and positional logic
ui_renderer.py — Renders the AR overlay and interactive UI elements directly onto the OpenCV camera feed
touch_engine.py — Simulates pointer and click interactions, bridging gesture recognition to actual system events
menu_state.py — A state machine that manages navigation through gesture-driven menus
config.py — Centralised configuration for confidence thresholds, camera index, and gesture sensitivity`,
      },
      {
        type: 'section',
        title: 'How It Was Built',
      },
      {
        type: 'text',
        content: `The foundation is MediaPipe's Hand Landmarker model, which returns a normalised set of 21 3D coordinates per hand on every frame — fingertips, knuckles, wrist, all of it. The challenge was not detecting hands; MediaPipe handles that elegantly. The challenge was interpreting meaning from those coordinates.

The gesture engine analyses the spatial relationships between landmarks — angles between joints, whether fingers are extended or curled, relative distances between fingertip positions — and maps those geometries to classified gestures. From there, the touch engine translates the recognised gesture into an OS-level event, simulating a click or cursor movement. The whole loop runs frame-by-frame through OpenCV, with the UI renderer drawing overlays directly onto the captured image before display.

The result is a system where the user sees their own hand on screen, surrounded by a responsive AR interface that reacts in real time.`,
      },
      {
        type: 'section',
        title: 'The Difficulties',
      },
      {
        type: 'text',
        content: `This was not a smooth build. Several problems surfaced that required real engineering patience.

Gesture ambiguity was the most persistent. Human hands are expressive and inconsistent — a relaxed open palm looks different under harsh lighting than in a dimly lit room, and the same gesture from two people can have meaningfully different landmark geometry. Tuning the confidence thresholds in config.py and building robust classification logic in the gesture engine took multiple iterations of testing and refinement.

Latency was another constraint. Computer vision pipelines are inherently expensive. Keeping the frame loop responsive enough to feel interactive meant being deliberate about processing order — hand detection, gesture classification, UI rendering, and touch simulation all had to be structured so no single step could block the others unnecessarily.

Camera compatibility proved more annoying than expected. Not all webcams expose themselves on the same device index, and on some systems the default index simply does not work. This is why find_camera.py exists — a small utility that probes available camera devices and returns what is actually accessible, so users can update config.py accordingly before running the main system.

The AR overlay required careful thought about coordinate space. MediaPipe returns normalised coordinates (0.0 to 1.0), but OpenCV works in pixel space. Every landmark, every rendered UI element, every interactive region had to be mapped correctly between these two systems — and when the camera resolution changes, everything has to scale cleanly with it.`,
      },
      {
        type: 'section',
        title: 'The Stack',
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'Python', highlight: true },
          { text: 'MediaPipe', highlight: true },
          { text: 'OpenCV', highlight: true },
          { text: 'Computer Vision', highlight: true },
          { text: 'NumPy' },
          { text: 'AR Overlay' },
          { text: 'Gesture Recognition' },
        ],
      },
      {
        type: 'section',
        title: 'Reflections',
      },
      {
        type: 'text',
        content: `What I found most rewarding about this project was not the technical execution — it was the moment the system worked and I waved my hand to trigger an action without touching a single key. There is something genuinely arresting about that. It stops feeling like code and starts feeling like the future.

It also taught me something important about the difference between detection and understanding. Detecting a hand is a solved problem in 2025. Making a machine understand what a hand means in a given moment — that is still an open, fascinating frontier. This project sits right at that edge, and I would not have learned that without building it.

The full source is available on GitHub.`,
      },
    ],
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy', 'Computer Vision', 'AR'],
    images: [],
    videos: ['/videos/argestures.mp4'],
  },

  {
    id: 'star-wars-timeline',
    title: 'Star Wars: Timeline of the Galaxy',
    flagship: true,
    excerpt: 'A comprehensive interactive timeline organizing Star Wars comics and books from both Legends and Canon continuities — spanning from the Dawn of the Jedi to the far future of Legacy.',
    link: 'https://github.com/hulashc/star-wars-timeline',
    sections: [
      {
        type: 'hero',
        subtitle: 'An interactive timeline mapping the Star Wars expanded universe across both Legends and Canon — from the Dawn of the Jedi (25,000 BBY) to the Final Order (35 ABY).',
      },
      {
        type: 'timeline',
        entries: [
          { year: '25,000 BBY', title: 'Dawn of the Republic', category: 'ORIGINS', ghostText: 'DAWN OF THE REPUBLIC', imageUrl: 'https://picsum.photos/seed/starwars1/1200/800' },
          { year: '7,000 BBY', title: 'The Great Hyperspace War', category: 'CONFLICT', ghostText: 'THE GREAT HYPERSPACE WAR', imageUrl: 'https://picsum.photos/seed/starwars2/1200/800' },
          { year: '3,956 BBY', title: 'Knights of the Old Republic', category: 'LEGENDS', ghostText: 'KNIGHTS OF THE OLD REPUBLIC', imageUrl: 'https://picsum.photos/seed/starwars3/1200/800' },
          { year: '1,000 BBY', title: 'Darth Bane & the Rule of Two', category: 'SITH', ghostText: 'DARTH BANE & THE RULE OF TWO', imageUrl: 'https://picsum.photos/seed/starwars4/1200/800' },
          { year: '32 BBY', title: 'The Phantom Menace', category: 'PROJECTS', ghostText: 'THE PHANTOM MENACE', imageUrl: 'https://picsum.photos/seed/starwars5/1200/800' },
          { year: '19 BBY', title: 'Order 66 & Fall of the Jedi', category: 'TRAGEDY', ghostText: 'ORDER 66 & FALL OF THE JEDI', imageUrl: 'https://picsum.photos/seed/starwars6/1200/800' },
          { year: '0 BBY', title: 'The Battle of Yavin', category: 'REBELLION', ghostText: 'THE BATTLE OF YAVIN', imageUrl: 'https://picsum.photos/seed/starwars7/1200/800' },
          { year: '4 ABY', title: 'Return of the Jedi', category: 'VICTORY', ghostText: 'RETURN OF THE JEDI', imageUrl: 'https://picsum.photos/seed/starwars8/1200/800' },
          { year: '34 ABY', title: 'The Rise of the First Order', category: 'THREAT', ghostText: 'THE RISE OF THE FIRST ORDER', imageUrl: 'https://picsum.photos/seed/starwars9/1200/800' },
          { year: '35 ABY', title: 'The Final Order Falls', category: 'LEGACY', ghostText: 'THE FINAL ORDER FALLS', imageUrl: 'https://picsum.photos/seed/starwars10/1200/800' },
        ],
      },
      {
        type: 'section',
        title: 'Skills & Technologies',
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'Timeline Visualization', highlight: true },
          { text: 'Data Modeling & Curation', highlight: true },
          { text: 'Dual-Continuity Architecture', highlight: true },
          { text: 'Responsive Web Design', highlight: true },
          { text: 'Search & Filtering', highlight: true },
          { text: 'JSON Schema Design', highlight: true },
          { text: 'D3.js', highlight: true },
          { text: 'React + TypeScript', highlight: true },
        ],
      },
      {
        type: 'section',
        title: 'Tech Stack',
      },
      {
        type: 'text',
        content: `React — UI framework
TypeScript — Type safety & data modeling
D3.js — Timeline visualization & zoom/pan
Fuse.js — Fuzzy search across entries
Vite — Build tool & dev server
JSON Schema — Structured entry data model
CSS Scroll Snap — Timeline scrolling
GitHub Pages — Frontend hosting`,
      },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Fuse.js', 'Vite', 'JSON Schema', 'CSS Scroll Snap', 'GitHub Pages'],
    images: [],
    videos: [],
  },
  {
    id: 'real-time-fraud-detection',
    title: 'Real-Time Fraud Detection Pipeline',
    excerpt: 'Streaming fraud detection that processes financial transactions in real time via Apache Kafka with rule-based detection and a live Streamlit dashboard.',
    link: 'https://github.com/hulashc/Real-Time-Fraud-Detection-Pipeline',
    sections: [
      {
        type: 'hero',
        subtitle: 'A streaming fraud detection system that processes financial transactions in real time using Apache Kafka, applies rule-based detection, and visualises everything on an interactive live dashboard built with Streamlit and Plotly.',
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'Python', highlight: true },
          { text: 'Apache Kafka', highlight: true },
          { text: 'Docker', highlight: true },
          { text: 'Streamlit', highlight: true },
          { text: 'Plotly' },
          { text: 'Pandas' },
          { text: 'KRaft Mode' },
        ],
      },
      {
        type: 'section',
        title: 'System Architecture',
      },
      {
        type: 'architecture-cards',
        items: [
          {
            icon: '⚡',
            title: 'Producer',
            description: 'Python script generates realistic financial transactions — 8% intentionally suspicious.',
            stack: ['Python'],
            color: '#e07a3a',
          },
          {
            icon: '📦',
            title: 'Kafka',
            description: 'Apache Kafka 3.8 in KRaft consensus mode via Docker — no Zookeeper, faster startup.',
            stack: ['Kafka', 'KRaft', 'Docker'],
            color: '#a86fdf',
          },
          {
            icon: '🔍',
            title: 'Consumer',
            description: 'Reads the stream, applies multi-signal fraud rules, and flags risky activity.',
            stack: ['Python', 'Pandas'],
            color: '#4eaa78',
          },
          {
            icon: '📄',
            title: 'CSV Store',
            description: 'Results are persisted to CSV for dashboard consumption and historical analysis.',
            stack: ['CSV', 'Pandas'],
            color: '#6ba3e0',
          },
          {
            icon: '🌐',
            title: 'Dashboard',
            description: 'Streamlit-powered live dashboard that auto-refreshes every 2 seconds with Plotly charts.',
            stack: ['Streamlit', 'Plotly'],
            color: '#dd6974',
          },
        ],
      },
      {
        type: 'section',
        title: 'How It Works',
        content: 'From stream to insight in milliseconds',
      },
      {
        type: 'text',
        content: `The pipeline starts with a producer generating realistic financial transactions — 8% are intentionally suspicious. Each transaction flows through Apache Kafka running in KRaft mode (no Zookeeper), where a consumer reads the stream, applies multi-signal fraud rules, and flags risky activity. Results are persisted to a CSV and visualised on a live Streamlit dashboard that auto-refreshes every 2 seconds.`,
      },
      {
        type: 'section',
        title: 'Key Features',
      },
      {
        type: 'text',
        content: `⚡ Real-Time Streaming — Transactions are generated and consumed in real time via Apache Kafka. No batch processing — every transaction is analysed as it arrives.
🔎 Rule-Based Detection — Multi-signal fraud detection using transaction amount, time of day, and geographic location. Flags trigger when 2+ rules fire simultaneously.
🎨 Interactive Dashboard — Streamlit-powered dashboard with risk gauges, heatmaps, sunburst charts, and live transaction feeds — all auto-refreshing.
📦 KRaft-Mode Kafka — Runs Apache Kafka 3.8 in KRaft consensus mode via Docker — no Zookeeper dependency, faster startup, simpler architecture.
🔧 One-Click Deploy — Start and stop the entire stack with batch scripts. Four components spin up in separate windows automatically.
📊 Rich Visualisations — Plotly-powered charts including spline timelines, fraud heatmaps, sunburst breakdowns, overlapping histograms, and horizontal risk rankings.`,
      },
      {
        type: 'section',
        title: 'Detection Logic',
        content: 'How fraud is identified — a transaction is flagged when it triggers two or more rules simultaneously.',
      },
      {
        type: 'decisions',
        items: [
          {
            num: '01',
            badge: 'Rule',
            title: 'High Amount > $4,000',
            description: 'Unusually large transactions are a common fraud indicator. Flags any single transaction exceeding the $4,000 threshold.',
          },
          {
            num: '02',
            badge: 'Rule',
            title: 'Unusual Hour (11 PM – 6 AM)',
            description: 'Transactions outside standard business hours carry higher risk. This rule captures activity during low-oversight windows.',
          },
          {
            num: '03',
            badge: 'Rule',
            title: 'Risky Location',
            description: 'Transactions originating from Lagos, Moscow, or Unknown locations — regions with elevated fraud patterns in the dataset.',
          },
        ],
      },
      {
        type: 'section',
        title: 'Dashboard Preview',
        content: 'The Streamlit dashboard auto-refreshes every 2 seconds with real-time metrics, interactive charts, and fraud alerts.',
      },
      {
        type: 'stats',
        items: [
          { num: '342', label: 'Transactions Monitored' },
          { num: '23', label: 'Fraud Detected' },
          { num: '6.8%', label: 'Fraud Rate' },
          { num: '$284K', label: 'Total Volume' },
          { num: '$831', label: 'Avg Transaction' },
        ],
      },
      {
        type: 'text',
        content: `⚠️ HIGH ALERT — 6.8% fraud rate detected across 342 transactions

Transaction Stream — ● Legitimate ● Fraudulent

Fraud Heatmap by Hour & Location — Lagos, Moscow, Unknown locations show concentrated fraud patterns across late-night and early-morning hours.

Top Risky Users:
USER-2847 — $18,400
USER-1193 — $14,250
USER-5521 — $11,800
USER-3390 — $8,600
USER-7762 — $5,300

Recent Fraud Alerts:
● Critical — TXN-482931 | USER-2847 | $12,450 | transfer | Lagos | high_amount, unusual_hour, risky_location
● High — TXN-330185 | USER-1193 | $8,200 | withdrawal | Moscow | high_amount, risky_location
● High — TXN-771204 | USER-5521 | $6,750 | purchase | Unknown | high_amount, risky_location`,
      },
    ],
    techStack: ['Python', 'Apache Kafka', 'Docker', 'Streamlit', 'Plotly', 'Pandas', 'KRaft'],
    images: [],
    videos: [],
  },
  {
    id: 'leet-journey',
    title: 'Leet Journey',
    excerpt: 'A living collection of LeetCode problem-solving notes — documenting patterns, approaches, and the thinking process behind each solution.',
    link: 'https://notes.hulash.com',
    sections: [
      {
        type: 'hero',
        subtitle: 'My LeetCode problem-solving journey. Notes on patterns, approaches, and solutions — written as I learn, not after I already know.',
      },
      {
        type: 'text',
        content: `This is a living collection of my LeetCode notes — not polished tutorials, but honest documentation of how I think through problems. Each note captures the problem-solving process: the approach I tried, the underlying pattern, optimizations, mistakes, and where I got stuck before arriving at a solution. The goal is to build deeper intuition for data structures and algorithms through consistent practice and reflection.

The project is built using <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Quartz v4</a>, an open-source framework for publishing digital gardens and interconnected notes. Inspired by the Obsidian-style note-taking workflow, the site functions as a searchable knowledge base where ideas, patterns, and problem categories are linked together over time.

Alongside algorithm practice, the project also helped me explore static site generation, markdown-based content systems, note-linking architectures, and developer-focused documentation workflows.`,
      },
    ],
    techStack: ['Quartz v4', 'LeetCode', 'Data Structures', 'Algorithms', 'Patterns', 'Markdown', 'Static Site'],
    images: [],
    videos: [],
  },
];