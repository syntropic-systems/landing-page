import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { RevealOnScroll } from "@/components/animations";
import { CTASection } from "@/components/cta-section";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Tender Automation & Procurement Insights",
  description:
    "Insights on tender automation, procurement workflows, bid management and AI-powered document intelligence. Learn how to automate tender bidding, evaluation and RFX responses.",
  alternates: {
    canonical: "https://cloudglancelab.com/blog",
  },
  keywords: [
    "tender automation blog",
    "procurement automation insights",
    "tender bidding tips",
    "bid management guide",
    "RFX automation",
    "procurement technology",
  ],
  openGraph: {
    title: "Blog - CloudGlance",
    description:
      "Insights on tender automation, procurement workflows and AI-powered document intelligence.",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const cardGradients = [
  "from-primary/15 via-primary/5 to-transparent",
  "from-blue-500/15 via-blue-500/5 to-transparent",
  "from-emerald-500/15 via-emerald-500/5 to-transparent",
  "from-violet-500/15 via-violet-500/5 to-transparent",
  "from-amber-500/15 via-amber-500/5 to-transparent",
  "from-rose-500/15 via-rose-500/5 to-transparent",
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Insights on tender automation, procurement workflows and AI-powered document intelligence."
      />

      <Section>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <RevealOnScroll key={post.slug} direction="up" duration={0.5} delay={index % 2 === 1 ? 0.15 : 0}>
                <Link
                          href={`/blog/${post.slug}`}
                          className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                        >
                          {/* Cover area */}
                          {post.coverImage ? (
                            <div className="relative w-full aspect-[2/1] overflow-hidden">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index < 2}
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div
                              className={`relative w-full aspect-[2/1] bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-6xl font-bold text-primary/10 select-none">
                                  {post.title.charAt(0)}
                                </div>
                              </div>
                              {/* Decorative grid lines */}
                              <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                  backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                                  backgroundSize: "40px 40px",
                                }}
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex flex-col flex-1 p-5 md:p-6">
                            {/* Keywords as tags */}
                            {post.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {post.keywords.slice(0, 3).map((keyword) => (
                                  <span
                                    key={keyword}
                                    className="text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2.5 py-0.5"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}

                            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                              {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {post.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 mt-auto border-t border-border/60">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="h-3 w-3" />
                                  {post.readingTime}
                                </span>
                              </div>
                              <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Read
                                <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </Section>

      <CTASection
        title="Ready to Automate Your Tender Workflows?"
        description="See how CloudGlance transforms document-heavy procurement into streamlined, automated processes."
        primaryCta={{ text: "Book a Demo", href: "/contact" }}
      />
    </div>
  );
}
