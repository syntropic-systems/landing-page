"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";

const faqData = [
  {
    question: "How does CloudGlance handle complex, multi-document tenders?",
    answer:
      "Our platform is specifically engineered for this. You can upload all related documents—the main RFP, all annexures, technical drawings, and spreadsheets—into a single project. Our AI then reads and connects the information across all files, ensuring that a requirement on page 347 of the main document is linked to the relevant table in Annexure 9.",
  },
  {
    question: "Can we customize the AI's analysis for our specific industry and needs?",
    answer:
      "Absolutely. While our AI has been trained on thousands of public tenders across various industries, you can create custom 'Keyword Groups' and 'Analysis Templates.' This allows you to teach the AI what's most important to your business, whether it's specific technical standards, legal clauses, or financial terms.",
  },
  {
    question: "Is our data used to train models for other customers?",
    answer:
      "No. Your data is yours alone. We use a single-tenant architecture, meaning your data is completely isolated in its own secure environment. It is never used to train our core models or for any other customer's benefit. We also offer on-premise deployment options for maximum control.",
  },
  {
    question: "How does the 'Go/No-Go' analysis actually work?",
    answer:
      "Our Go/No-Go feature provides a data-driven recommendation by scoring the tender against key business drivers. It analyzes factors like your technical fit, the commercial viability, potential risks, and strategic alignment based on your company's profile and past performance. This moves your decision-making from 'gut feel' to a quantifiable, defensible choice.",
  },
  {
    question: "What does the implementation process look like?",
    answer:
      "You can be analyzing your first document within 5 minutes of signing up. For a full enterprise rollout, our dedicated success team will guide you through a one-week process that includes integration planning with your existing systems (like SharePoint or Salesforce), data migration, and a comprehensive training program for your team.",
  },
  {
    question: "How is CloudGlance different from a generic AI chatbot?",
    answer:
      "Generic chatbots are designed for broad, conversational queries and are prone to 'hallucinating' or making up answers. Our platform uses a custom RAG (Retrieval-Augmented Generation) architecture. This means it is specifically designed to first retrieve factual information from your documents and then generate an answer, which is always cited back to the source. It’s an expert system, not a generalist.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };
  return (
    <div
      className={`w-full bg-[var(--bg-overlay-08)] shadow-[0px_2px_4px_var(--shadow-black-16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">
          {question}
        </div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${
              isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
            }`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${
            isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"
          }`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  return (
    <Section
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about CloudGlance"
    >
      <div className="w-full pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            {...faq}
            isOpen={openItem === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </Section>
  );
}
