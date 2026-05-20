"use client";

interface CertificationsSectionProps {
  isDark: boolean;
  text: string;
  borderColor: string;
}

interface Certification {
  name: string;
  issuer: string;
  category: string;
  logo: React.ReactNode;
}

const AWS = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#FF9900"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial,sans-serif" fontWeight="bold">AWS</text>
  </svg>
);

const MS = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#00A4EF"/>
    <rect x="10" y="10" width="12" height="12" rx="1" fill="#F25022"/>
    <rect x="26" y="10" width="12" height="12" rx="1" fill="#7FBA00"/>
    <rect x="10" y="26" width="12" height="12" rx="1" fill="#00A4EF"/>
    <rect x="26" y="26" width="12" height="12" rx="1" fill="#FFB900"/>
  </svg>
);

const AnthropicLogo = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#1A1A2E"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Arial,sans-serif" fontWeight="bold">AI</text>
  </svg>
);

const DatabricksLogo = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#FF3621"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Arial,sans-serif" fontWeight="bold">DB</text>
  </svg>
);

const TableauLogo = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#E97627"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial,sans-serif" fontWeight="bold">T</text>
  </svg>
);

const MongoDBLogo = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#47A248"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Arial,sans-serif" fontWeight="bold">MDB</text>
  </svg>
);

const BCSLogo = (
  <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
    <rect width="48" height="48" rx="6" fill="#003A70"/>
    <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Arial,sans-serif" fontWeight="bold">BCS</text>
  </svg>
);

const certData: Certification[] = [
  { name: "AWS Certified Data Engineer – Associate", issuer: "Amazon Web Services", category: "Cloud", logo: AWS },
  { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", category: "Cloud", logo: AWS },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", category: "Cloud", logo: AWS },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft", category: "Cloud", logo: MS },
  { name: "Anthropic - Model Context Protocol: Advanced Topics", issuer: "Anthropic", category: "AI", logo: AnthropicLogo },
  { name: "DataBricks - Fundamentals", issuer: "Databricks", category: "Data", logo: DatabricksLogo },
  { name: "Tableau Certified Data Analyst", issuer: "Tableau", category: "Data", logo: TableauLogo },
  { name: "MongoDB Certified Developer", issuer: "MongoDB", category: "Data", logo: MongoDBLogo },
  { name: "UK GDPR Practitioner Certificate · Online", issuer: "BCS / IT Governance", category: "Compliance", logo: BCSLogo },
];

export default function CertificationsSection({ isDark, text, borderColor }: CertificationsSectionProps) {
  const hoverBg = isDark ? "#DADADA" : "#161616";
  const hoverText = isDark ? "#161616" : "#DADADA";

  return (
    <div style={{ border: `1px solid ${borderColor}` }} className="p-3 md:p-4">
      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 pb-2" style={{ color: text, borderBottom: `2px solid ${borderColor}` }}>
        Certifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {certData.map((cert) => (
          <div
            key={cert.name}
            className="cert-badge rounded-lg px-3 py-2.5 text-xs md:text-sm font-medium flex items-center gap-2"
            style={{
              border: `1px solid ${borderColor}`,
              color: text,
            }}
          >
            {cert.logo}
            <span>{cert.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        .cert-badge {
          transition: background-color 0.3s ease, color 0.3s ease !important;
        }
        .cert-badge:hover {
          background-color: ${hoverBg} !important;
          color: ${hoverText} !important;
        }
      `}</style>
    </div>
  );
}
