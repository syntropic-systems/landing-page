export type FaqCategory = 'general' | 'pricing';

export interface Faq {
  question: string;
  answer: string;
  categories?: FaqCategory[];
}

export const faqs: Faq[] = [
  {
    question: 'How is Cloudglance different from generic AI tools like ChatGPT?',
    answer:
      "Generic AI tools hallucinate, can't handle large technical documents and don't support accuracy, collaboration or end-to-end workflows. Cloudglance fixes all of this by processing thousands of pages reliably with citations, maintaining high accuracy and powering complete operational workflows.",
    categories: ['general'],
  },
  {
    question: 'How does CloudGlance handle security and compliance?',
    answer:
      'CloudGlance is built with enterprise-grade security from the ground up. All data is encrypted at rest (AES-256) and in transit (TLS 1.3), with strict tenant isolation, role-based access controls, and full audit logging. We are currently completing SOC 2 Type II and ISO 27001 certification processes.',
    categories: ['general'],
  },
  {
    question: 'How fast is onboarding?',
    answer:
      'Onboarding is immediate. You can start using Cloudglance the same day you sign up. If you need company-specific customisations, that may take a little additional time depending on the scope.',
    categories: ['general'],
  },
  {
    question: 'What file types can Cloudglance read?',
    answer:
      'Almost all common formats: PDFs, Word, Excel, images, drawings and scanned docs. Even complex tables, BOQs and multi-structure files are read and processed into structured data.',
    categories: ['general'],
  },
  {
    question: 'Does Cloudglance only work for tenders?',
    answer:
      'No. Any process that is document-heavy and you want to cut time on review, extraction or compliance, Cloudglance can help.',
    categories: ['general'],
  },
  {
    question: 'How much training does my team need?',
    answer:
      'None. On the day of onboarding, we will run a personalised demo before your team starts using the platform. If your team faces any trouble, our customer success team is always available for support.',
    categories: ['general'],
  },
  {
    question: 'Can we keep using our existing tools?',
    answer:
      'Yes. Cloudglance integrates with drives, ERPs, SSO and document systems so you can keep your current workflows and start working from day one.',
    categories: ['general'],
  },
  {
    question: 'How accurate is the AI?',
    answer:
      'We measure very high accuracy in our extraction and compliance checks (internal benchmarks ~99.7%). Every extracted item includes a citation so teams can verify the source quickly.',
    categories: ['general'],
  },
  {
    question: 'Do you handle company-specific templates and terminology?',
    answer:
      'Yes. Organisation-specific formats and terminology are covered through our customisation process so the platform works reliably with your templates.',
    categories: ['general'],
  },
  {
    question: 'Does Cloudglance hold a SOC 2 Type II Report?',
    answer:
      'We are currently in our observation period for SOC 2 Type II and expect to receive our attestation later this year. However, our entire underlying infrastructure (Azure, Vercel, AWS S3) is fully SOC 2 Type II compliant.',
    categories: ['general'],
  },
  {
    question: 'Does Cloudglance encrypt data?',
    answer:
      'Yes. All data is encrypted at rest using AES-256 standards and in transit using TLS 1.3. We enforce HTTPS for all connections.',
    categories: ['general'],
  },
  {
    question: 'What is a Tender Project?',
    answer:
      'A Tender Project is a dedicated space for one tender or bid. It includes uploaded files, AI analysis, chats, bid package outputs, activity history, and related workflow data.',
    categories: ['pricing'],
  },
  {
    question: 'What are AI Task Credits?',
    answer:
      'AI Task Credits are used for major AI-powered actions inside a tender project, such as project analysis, document review, risk analysis, and bid package creation. AI-based Tender Finder Auto Analysis, AI Chat, Email Digest, and Smart Document Search are included as part of the plan and are not credit-based.',
    categories: ['pricing'],
  },
  {
    question: 'What happens when I need more projects or AI credits?',
    answer:
      'Additional usage packs can be added based on your plan. Base supports limited usage add-ons, while Professional supports higher volume, team, automation, and source-level add-ons.',
    categories: ['pricing'],
  },
  {
    question: 'Is annual usage monthly-restricted?',
    answer:
      'No. Annual plans include yearly project and credit pools, giving teams more flexibility across busy and slow tender months.',
    categories: ['pricing'],
  },
  {
    question: 'Is Issuer or RFX automation included in Base or Professional Pricing Plan?',
    answer:
      'No. Issuer and RFX workflows are handled under Enterprise because they usually require custom workflows, organization-specific evaluation logic, governance, and deeper configuration.',
    categories: ['pricing'],
  },
  {
    question: 'Can CloudGlance support private cloud or own storage?',
    answer:
      'Yes. Private cloud, own storage, custom deployment, and enterprise integrations are available under Enterprise.',
    categories: ['pricing'],
  },
];

export function getFaqsByCategory(category: FaqCategory): Faq[] {
  return faqs.filter((faq) => faq.categories?.includes(category));
}
