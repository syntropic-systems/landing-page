// Feature flag — flip to true to surface AI Task Credits across plan cards,
// comparison table, add-ons, and pricing FAQ. Data stays intact when off.
export const SHOW_AI_CREDITS = false;

export type PlanId = 'base' | 'professional' | 'enterprise';

export interface PlanUsage {
  projects: string;
  credits: string;
  users: string;
}

export type IncludeItem = string | { item: string; subItems: string[] };

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  recommended?: boolean;
  customPricing?: boolean;
  monthlyPrice?: number;
  annualMonthlyPrice?: number;
  annualTotal?: number;
  customLabel?: string;
  customNote?: string;
  usage?: {
    annual: PlanUsage;
    monthly: PlanUsage;
  };
  customUsage?: string[];
  customUsageMonthly?: string[];
  includesHeading?: string;
  includes: IncludeItem[];
  cta: {
    text: string;
    href: string;
  };
}

export const plans: Plan[] = [
  {
    id: 'base',
    name: 'Base',
    tagline:
      'For small bidder teams starting with AI-assisted tender discovery, analysis, and bid preparation.',
    monthlyPrice: 7000,
    annualMonthlyPrice: 5000,
    annualTotal: 60000,
    usage: {
      annual: {
        projects: '120 Tender Projects / year',
        credits: '2,400 AI Task Credits / year',
        users: '1 user',
      },
      monthly: {
        projects: '10 Tender Projects / month',
        credits: '200 AI Task Credits / month',
        users: '1 user',
      },
    },
    includes: [
      'Tender AI Search',
      'Tender AI Analysis and Recommendation',
      'Project AI Analysis',
      'Go/No-Go Analysis and Eligibility Criteria',
      'AI Chat',
      'Email Digest',
      'Basic Cloud Storage',
      'Basic Document Intelligence - Single Answer Mode',
      {
        item: 'Basic Bid Package Creation',
        subItems: [
          'Required Forms Extraction',
          'Attachment Check',
          'BOQ Extraction',
        ],
      },
    ],
    cta: { text: 'Get Started', href: '/contact' },
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline:
      'For active bidding teams managing tender discovery, review, risk analysis, and bid preparation regularly.',
    recommended: true,
    monthlyPrice: 12000,
    annualMonthlyPrice: 9000,
    annualTotal: 108000,
    usage: {
      annual: {
        projects: '240 Tender Projects / year',
        credits: '7,200 AI Task Credits / year',
        users: 'Up to 5 users',
      },
      monthly: {
        projects: '20 Tender Projects / month',
        credits: '600 AI Task Credits / month',
        users: 'Up to 5 users',
      },
    },
    includesHeading: 'Everything in Base, plus:',
    includes: [
      'Multi-user Access',
      'Admin Management',
      'Audit / Activity Controls',
      'Agentic AI Chat',
      'Smart Document Search',
      'Higher Cloud Storage',
      'Advanced Document Intelligence - Multiple Modes',
      'Risk Analysis',
      {
        item: 'Advanced Bid Package Creation',
        subItems: [
          'Everything from Basic Bid Package',
          'AI Form-Fill Support',
        ],
      },
      '1 Custom Workflow',
      'Priority Support',
    ],
    cta: { text: 'Choose Professional', href: '/contact' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline:
      'For high-volume bidder teams, evaluation workflows, RFX workflows, private cloud needs, and custom workflows.',
    customPricing: true,
    customLabel: 'Custom Pricing',
    customNote: 'Tailored to your team, volume, and deployment',
    customUsage: [
      'Custom Tender Projects / year',
      'Custom AI Task Credits',
      'Custom users',
    ],
    customUsageMonthly: [
      'Custom Tender Projects / quarter',
      'Custom AI Task Credits',
      'Custom users',
    ],
    includesHeading: 'Everything in Professional, plus:',
    includes: [
      'On-premises Deployment (for 100% data security)',
      'Custom Tender Portal Integration',
      'Custom Integrations',
      'Advanced Admin Controls',
      'Advanced Audit / Governance Controls',
      'Advanced Risk & Compliance Analysis',
      'Custom Bid Package Automation',
      'Custom Workflows',

      'Tender Evaluation Workflows',
      'RFX Workflows',
      'Dedicated Onboarding',
      'Enterprise Support / SLA-based response',
    ],
    cta: { text: 'Contact Sales', href: '/contact' },
  },
];

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  base: ComparisonValue;
  professional: ComparisonValue;
  enterprise: ComparisonValue;
}

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Pricing',
    base: '₹7k/mo · ₹60k/yr',
    professional: '₹12k/mo · ₹1.08L/yr',
    enterprise: 'Custom',
  },
  {
    feature: 'Tender Projects',
    base: '10/mo or 120/yr',
    professional: '20/mo or 240/yr',
    enterprise: 'Custom',
  },
  {
    feature: 'AI Task Credits',
    base: '200/mo or 2,400/yr',
    professional: '600/mo or 7,200/yr',
    enterprise: 'Custom',
  },
  {
    feature: 'Users',
    base: '1',
    professional: 'Up to 5',
    enterprise: 'Custom',
  },
  { feature: 'Tender AI Search', base: true, professional: true, enterprise: true },
  {
    feature: 'Tender AI Analysis and Recommendation',
    base: true,
    professional: true,
    enterprise: true,
  },
  { feature: 'Email Digest', base: true, professional: true, enterprise: true },
  { feature: 'Project AI Analysis', base: true, professional: true, enterprise: true },
  {
    feature: 'Go/No-Go Analysis & Eligibility',
    base: true,
    professional: true,
    enterprise: true,
  },
  { feature: 'AI Chat', base: true, professional: true, enterprise: true },
  {
    feature: 'Agentic AI Chat',
    base: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Smart Document Search',
    base: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Document Intelligence',
    base: 'Basic',
    professional: 'Advanced',
    enterprise: 'Advanced / Custom',
  },
  {
    feature: 'Bid Package Creation',
    base: 'Basic',
    professional: 'Advanced',
    enterprise: 'Advanced / Custom',
  },
  {
    feature: 'BOQ Extraction',
    base: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'AI Form-Fill Support',
    base: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Risk Analysis',
    base: false,
    professional: true,
    enterprise: 'Advanced',
  },
  {
    feature: 'Multi-user Access',
    base: false,
    professional: true,
    enterprise: 'Custom',
  },
  {
    feature: 'Admin Management',
    base: false,
    professional: true,
    enterprise: 'Advanced',
  },
  {
    feature: 'Audit / Activity Controls',
    base: false,
    professional: true,
    enterprise: 'Advanced',
  },
  {
    feature: 'Cloud Storage',
    base: 'Basic',
    professional: 'Higher',
    enterprise: 'Custom',
  },
  {
    feature: 'Custom Workflows',
    base: false,
    professional: '1',
    enterprise: 'Custom',
  },
  {
    feature: 'Tender Evaluation Workflows',
    base: false,
    professional: false,
    enterprise: 'Custom',
  },
  {
    feature: 'RFX Workflows',
    base: false,
    professional: false,
    enterprise: 'Custom',
  },
  {
    feature: 'Custom Tender Search Portal Integrations',
    base: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'Custom Integrations (SAP / OneDrive)',
    base: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'On-premises Deployment',
    base: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'Onboarding',
    base: 'Standard',
    professional: 'Standard',
    enterprise: 'Dedicated',
  },
  {
    feature: 'Support',
    base: 'Standard',
    professional: 'Priority',
    enterprise: 'Dedicated / SLA-based',
  },
];

export interface AddonSection {
  title: string;
  items: string[];
}

export interface AddonGroup {
  heading: string;
  description?: string;
  sections: AddonSection[];
  note?: string;
}

export const addonGroups: AddonGroup[] = [
  {
    heading: 'Available with Base',
    sections: [
      {
        title: 'Usage Add-ons',
        items: [
          'Additional Tender Projects',
          'Additional AI Task Credits',
        ],
      },
    ],
    note: 'Base supports limited usage expansion. For higher team volume or advanced workflows, Professional is recommended.',
  },
  {
    heading: 'Available with Professional',
    sections: [
      {
        title: 'Usage Add-ons',
        items: [
          'Additional Tender Projects',
          'Additional AI Task Credits',
        ],
      },
      {
        title: 'Team Add-ons',
        items: [
          'Additional users',
          'Additional admin seats',
          'Role-based access, where applicable',
        ],
      },
      {
        title: 'Automation Add-ons',
        items: [
          'Additional custom workflows',
          'Custom risk parameters',
          'Custom approval or checking stages',
        ],
      },
    ],
  },
  {
    heading: 'Enterprise Options',
    sections: [
      {
        title: 'Optional Add-ons',
        items: [
          'State portal configuration',
          'Historical tender / document migration',
          'Security review support',
          'Private cloud / own storage',
        ],
      },
    ],
    note: 'Enterprise requirements are scoped based on workflow, volume, deployment, integrations, and governance needs.',
  },
];

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}
