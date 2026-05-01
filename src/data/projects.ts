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
    title: 'Agricultural Yield Prediction Platform',
    sections: [
      {
        type: 'hero',
        subtitle: 'A production-grade machine learning pipeline that ingests IoT sensor data, satellite imagery, and weather streams — engineers temporal features — and serves crop yield predictions with full drift monitoring and automated retraining.',
      },
      {
        type: 'stats',
        items: [
          { num: '12', label: 'Weeks to Delivery' },
          { num: '6', label: 'Pipeline Phases' },
          { num: '14+', label: 'Integrated Tools' },
          { num: '~£0', label: 'Local Dev Cost' },
          { num: '500', label: 'Req/s Load Target' },
        ],
      },
      {
        type: 'section',
        title: 'Why I Built This',
      },
      {
        type: 'text',
        content: `Most ML tutorials stop at the Jupyter notebook. They show you how to train a model, maybe how to wrap it in a Flask endpoint — and then nothing. No versioning, no monitoring, no retraining, no production-grade feature engineering.

Agriculture is a deliberately hard domain for ML. Your data has strong seasonality, sparse coverage, multi-resolution sources, and ground truth that arrives weeks after prediction. Naive approaches fail visibly — a model trained on shuffled data leaks future harvest information into training, producing results that look great on paper and collapse in the real world.

I chose this domain because it demands rigor. You can't take shortcuts on temporal splits. You can't ignore missing satellite scenes. You can't treat seasonal drift as model failure. Every corner of this project forces an engineering decision that would be invisible in a generic ML demo.

The goal isn't just a working model — it's a traceable, maintainable, operationally honest system that a real team could run in production.`,
      },
      {
        type: 'skill-badges',
        items: [
          { text: 'Data Engineering', highlight: true },
          { text: 'MLOps', highlight: true },
          { text: 'Feature Stores', highlight: true },
          { text: 'Stream Processing', highlight: true },
          { text: 'Apache Kafka' },
          { text: 'Apache Spark' },
          { text: 'Feast' },
          { text: 'MLflow' },
          { text: 'DVC' },
          { text: 'XGBoost' },
          { text: 'Optuna' },
          { text: 'FastAPI' },
          { text: 'Kubernetes' },
          { text: 'Helm' },
          { text: 'Terraform' },
          { text: 'Prefect' },
          { text: 'Evidently AI' },
          { text: 'Great Expectations' },
          { text: 'Prometheus' },
          { text: 'Grafana' },
          { text: 'Redis' },
          { text: 'Python' },
          { text: 'SQL' },
          { text: 'Docker' },
        ],
      },
      {
        type: 'section',
        title: 'Pipeline Architecture',
        content: 'Seven layers working in sequence — from raw sensor events all the way to a monitored, self-retraining inference service.',
      },
      {
        type: 'architecture-cards',
        items: [
          {
            icon: '📡',
            title: 'Ingestion',
            description: 'Three Kafka topics ingest IoT sensor readings, satellite NDVI scenes, and weather events with schema enforcement at the wire level.',
            stack: ['Kafka', 'Avro', 'Schema Registry', 'Faker'],
            color: '#4eaa78',
          },
          {
            icon: '🛡️',
            title: 'Validation',
            description: 'Great Expectations suites check every batch. Invalid data is quarantined and alerted on — never silently passed downstream.',
            stack: ['Great Expectations', 'Prefect'],
            color: '#6ba3e0',
          },
          {
            icon: '⚙️',
            title: 'Feature Engineering',
            description: 'Spark aligns three sources (15-min, hourly, weekly) into weekly field-level aggregates. Gap-filling for satellite data uses temporal interpolation or spatial proxies — always flagged.',
            stack: ['Spark on k8s', 'Parquet', 'DVC'],
            color: '#e07a3a',
          },
          {
            icon: '🗄️',
            title: 'Feature Store',
            description: 'Feast manages point-in-time-correct training joins and nightly Redis materialization for sub-millisecond online lookups at inference time.',
            stack: ['Feast', 'Redis', 'S3 / GCS'],
            color: '#a86fdf',
          },
          {
            icon: '🏋️',
            title: 'Training Pipeline',
            description: 'XGBoost trained with Optuna hyperparameter search over time-aware cross-validation. Every run logged to MLflow with dataset hash, feature versions, and fold metrics.',
            stack: ['XGBoost', 'Optuna', 'MLflow', 'TimeSeriesSplit'],
            color: '#e8af34',
          },
          {
            icon: '🚀',
            title: 'Serving Layer',
            description: 'FastAPI exposes /predict and /predict/batch endpoints on Kubernetes with HPA scaling from 2 to 10 replicas. Health checks return 503 when Redis or the model are degraded.',
            stack: ['FastAPI', 'Helm', 'HPA', 'Prometheus'],
            color: '#4eaa78',
          },
          {
            icon: '📊',
            title: 'Monitoring',
            description: 'Evidently AI computes weekly PSI and concept drift. A two-window strategy separates seasonal shift from genuine degradation — triggering retraining only when necessary.',
            stack: ['Evidently AI', 'Grafana', 'Prefect'],
            color: '#dd6974',
          },
        ],
      },
      {
        type: 'section',
        title: '12-Week Build Plan',
        content: 'Each phase has concrete deliverables and a defined exit condition before the next phase begins.',
      },
      {
        type: 'phases',
        items: [
          {
            num: '0',
            title: 'Project Setup',
            badge: 'Days 1–3',
            description: 'Monorepo structure, pinned dependencies, pre-commit hooks (ruff, mypy, detect-secrets), local Kubernetes cluster with Kind or k3d, Terraform IaC for cloud infra, team ownership map. Get the foundation right before writing a single line of pipeline code.',
            outcomes: ['Repo live', 'IaC written', '3 namespaces'],
          },
          {
            num: '1',
            title: 'Data Ingestion Layer',
            badge: 'Weeks 1–2',
            description: 'Deploy Kafka with Schema Registry. Build a realistic IoT sensor simulator with deliberate fault modes (10% dropout, calibration drift, burst delivery). Integrate NASA Earthdata STAC API for NDVI. Connect NOAA GHCN and OpenAQ weather streams. Great Expectations validates every batch and quarantines bad data.',
            outcomes: ['3 Kafka topics', 'Schema enforced', 'GE suites active'],
          },
          {
            num: '2',
            title: 'Feature Engineering & Feature Store',
            badge: 'Weeks 3–4',
            description: 'Spark on Kubernetes aligns IoT (15-min), weather (hourly), and satellite (weekly) data into weekly field-level feature vectors. Two gap-fill strategies for cloud-covered satellite scenes, both with explicit boolean flags. Feast feature store with point-in-time-correct training joins. DVC versions every Parquet output.',
            outcomes: ['Spark jobs running', 'Feast configured', 'DVC versioning', 'No data leakage'],
          },
          {
            num: '3',
            title: 'Model Training Pipeline',
            badge: 'Weeks 5–6',
            description: 'Baseline mean-by-crop-type logged first. XGBoost trained with Optuna TPE hyperparameter search, using TimeSeriesSplit (5 folds) — never shuffle split. Every run logged to MLflow with DVC dataset hash, Feast feature versions, fold metrics, and season/crop tags. Promotion gated on 2% RMSE improvement with no crop-type regression.',
            outcomes: ['Baseline logged', 'Optuna tuning', 'MLflow registry', 'Promotion gate'],
          },
          {
            num: '4',
            title: 'Serving Layer',
            badge: 'Weeks 7–8',
            description: 'FastAPI serves /predict and /predict/batch with online Feast feature lookups from Redis. Multi-stage Docker build, Helm chart with HPA (min 2, max 10 replicas) scaling on CPU and prediction_queue_depth. /health endpoint validates model load, Redis connectivity, and Feast materialization freshness — returns 503 on any failure.',
            outcomes: ['API deployed', 'HPA configured', 'Health checks'],
          },
          {
            num: '5',
            title: 'Monitoring & Drift Detection',
            badge: 'Weeks 9–10',
            description: 'Evidently AI runs weekly PSI-based data drift and concept drift reports. Two reference windows: a 4-week rolling window for short-term checks and a season-matched historical window to distinguish expected seasonal change from genuine model degradation. Prefect triggers full retraining on PSI > 0.2 on 30% of features or 10% RMSE regression. Grafana dashboards expose all metrics via Prometheus.',
            outcomes: ['Drift reports live', 'Auto-retrain', 'Grafana dashboard'],
          },
          {
            num: '6',
            title: 'Integration, Hardening & Documentation',
            badge: 'Weeks 11–12',
            description: 'Parent Prefect DAG wires all phases with checkpoint logic — abort on GE failure, keep current model if promotion fails. Model cards per version. Data contract YAML specs per upstream source. Locust load test targeting 500 req/s with p99 < 200ms. Final integration test: full pipeline from synthetic data to registered model to drift report, unassisted, in under 4 hours.',
            outcomes: ['E2E DAG', 'Model cards', 'Load tested', 'Unassisted run'],
          },
        ],
      },
      {
        type: 'section',
        title: 'Three Decisions That Matter',
        content: 'These aren\'t implementation details — they\'re what separates a portfolio MLOps project from a toy demo.',
      },
      {
        type: 'decisions',
        items: [
          {
            num: '01',
            badge: 'Non-negotiable',
            title: 'Temporal train/test splitting',
            description: 'Any shuffle-based split in this pipeline is a bug, not a suboptimal choice. Yield data has strong temporal autocorrelation — shuffling leaks future harvest seasons into training, inflating every metric while the deployed model silently fails. This project uses TimeSeriesSplit with 5 folds throughout. The validation set is always in the future relative to training.',
          },
          {
            num: '02',
            badge: 'Architectural innovation',
            title: 'Two-window drift detection',
            description: 'A single PSI threshold would trigger retraining every autumn when soil temperatures shift predictably. Instead, the system runs two reference windows: a 4-week rolling window catches short-term instability, and a season-matched historical window (same week, prior growing cycle) catches genuine concept drift. Seasonal variation is expected and handled separately from real model degradation.',
          },
          {
            num: '03',
            badge: 'Data lineage',
            title: 'End-to-end traceable lineage',
            description: 'Every prediction traces back to its exact inputs. The chain is: raw Kafka message → DVC-versioned Parquet → Feast feature view → MLflow experiment run → deployed model → prediction log. Given a prediction made on any date, you can identify the exact sensor readings that produced it, which model version served it, and what dataset it was trained on.',
          },
        ],
      },
      {
        type: 'section',
        title: 'Is This Free to Run?',
        content: 'Most of the stack is open source and self-hostable. The honest answer is: it depends entirely on where you run it.',
      },
      {
        type: 'cost',
        sections: [
          {
            title: '✅ Fully free to use (open source / free APIs)',
            items: [
              'Kafka, Spark, Feast, DVC, MLflow — all open source, self-hosted',
              'XGBoost, Optuna, FastAPI, Prefect (self-hosted) — open source',
              'Evidently AI, Great Expectations, Grafana, Prometheus — open source',
              'Docker, Kubernetes — open source runtimes',
              'NASA Earthdata (Sentinel-2 scenes) — free with account registration',
              'NOAA GHCN, OpenAQ — free public APIs',
            ],
          },
          {
            title: '💰 Where real cost enters',
            items: [
              'Cloud Kubernetes (GKE/EKS) running 24/7 — main cost driver',
              'Spark executors for batch feature jobs — billed per compute hour',
              'Redis instance on cloud — small but not zero',
              'S3 / GCS object storage for DVC and MLflow artifacts — pennies at portfolio scale',
              'Confluent Cloud Kafka — free tier expires after 30 days; use self-hosted Strimzi instead',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'What This Project Proves',
        content: 'This isn\'t a tutorial follow-along. Each component demonstrates a distinct engineering capability that translates directly to a data engineering or MLOps role.',
      },
      {
        type: 'recruiter-cards',
        items: [
          {
            icon: '🔗',
            title: 'Pipeline Design at Scale',
            description: 'Designing, building, and integrating seven distinct pipeline layers — each with its own failure modes, latency requirements, and data contracts — proves system-level thinking beyond individual tool proficiency.',
          },
          {
            icon: '⏱️',
            title: 'Time-Series Engineering',
            description: 'Multi-resolution temporal alignment (15-min, hourly, weekly), point-in-time-correct feature joins, and time-aware cross-validation demonstrate the exact skills required for financial data, IoT, and operational analytics pipelines.',
          },
          {
            icon: '📐',
            title: 'Data Contracts & Governance',
            description: 'Schema Registry enforcement at ingestion, Great Expectations validation suites, and formal YAML data contracts per upstream source reflect enterprise-grade data governance practices.',
          },
          {
            icon: '🔄',
            title: 'Production ML Operations',
            description: 'MLflow model registry, DVC dataset versioning, promotion gates, and automated retraining DAGs demonstrate the ability to run ML systems reliably after deployment.',
          },
          {
            icon: '☁️',
            title: 'Cloud Infrastructure as Code',
            description: 'Terraform-provisioned GKE/EKS clusters, Kubernetes namespaces per environment, Helm charts with HPA, and CI/CD pipeline integration reflect the IaC skills required for senior data engineering roles.',
          },
          {
            icon: '📈',
            title: 'Intelligent Monitoring',
            description: 'The two-window drift detection design shows domain-aware thinking: knowing when not to retrain is as important as knowing when to. This goes well beyond standard MLOps tutorials.',
          },
        ],
      },
    ],
    techStack: ['Kafka', 'Spark', 'Feast', 'XGBoost', 'MLflow', 'FastAPI', 'Kubernetes', 'Prefect', 'Evidently AI'],
    images: [],
    videos: [],
    link: 'https://github.com/hchand',
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