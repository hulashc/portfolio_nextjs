import { SectionType } from './projects';

export interface Blog {
  id: string;
  title: string;
  sections: SectionType[];
  techStack?: string[];
  images: string[];
  videos?: string[];
  link?: string;
}

export const blogs: Blog[] = [
  {
    id: 'building-scalable-data-pipelines',
    title: 'Building Scalable Data Pipelines',
    sections: [
      {
        type: 'text',
        content: `A comprehensive guide to designing and implementing scalable data pipelines using modern data engineering tools and best practices.

This blog covers the fundamentals of data pipeline architecture, from batch processing to real-time streaming. Learn how to handle data quality issues, implement error handling and retry mechanisms, and build monitoring and alerting systems.

Topics include Apache Spark for distributed processing, Apache Airflow for workflow orchestration, data validation techniques, and strategies for handling schema evolution.`,
      },
    ],
    images: [],
    videos: [],
    link: 'https://medium.com/@hulashc',
  },
  {
    id: 'llm-integration-patterns',
    title: 'LLM Integration Patterns',
    sections: [
      {
        type: 'text',
        content: `Exploring practical patterns for integrating large language models into production applications, from API design to deployment strategies.

This blog dives deep into RAG architecture implementation, covering document processing, embedding strategies, vector database selection, and query optimization. Learn how to combine retrieval with generation for accurate, context-aware responses.

Additional topics include prompt engineering best practices, handling edge cases, cost optimization, and building evaluation frameworks for LLM-powered applications.`,
      },
    ],
    images: [],
    videos: [],
    link: 'https://medium.com/@hulashc',
  },
];