import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, extractToc } from "@/lib/blog";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { Calendar, Clock } from "lucide-react";
import { BlogToc } from "@/components/blog-toc";
import { RevealOnScroll } from "@/components/animations";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function createHeading(level: number) {
  const Tag = `h${level}` as "h2" | "h3";
  return function HeadingComponent({ children }: { children?: ReactNode }) {
    const text = getTextContent(children);
    const id = slugify(text);
    return <Tag id={id}>{children}</Tag>;
  };
}

const mdxComponents = {
  h2: createHeading(2),
  h3: createHeading(3),
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://cloudglancelab.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} - CloudGlance`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    other: {
      "article:published_time": post.date,
      "article:author": post.author,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CloudGlance",
      url: "https://cloudglancelab.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cloudglancelab.com/blog/${slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title={post.title}
        description={post.description}
        button={{
          text: "View All Posts",
          href: "/blog",
          variant: "ghost",
        }}
      />

      <Section>
        <RevealOnScroll direction="up" duration={0.6}>
        {/* Cover image */}
        {post.coverImage ? (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/20 border border-border">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-primary/10 select-none">
                {post.title.charAt(0)}
              </span>
            </div>
          </div>
        )}
        </RevealOnScroll>

        {/* Two-column: TOC left, content right */}
        <RevealOnScroll direction="up" duration={0.6} delay={0.15}>
        <div className="flex gap-6 lg:gap-8 relative">
          {/* TOC sidebar — sticky, hidden on mobile */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <BlogToc items={extractToc(post.content)} />
            </div>
          </aside>

          {/* Article content */}
          <div className="flex-1 min-w-0">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="h-3.5 w-px bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>

            <article className="prose md:prose-lg max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-p:text-muted-foreground prose-strong:text-foreground/80 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground prose-li:marker:text-muted-foreground prose-ol:marker:text-muted-foreground prose-ul:marker:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-code:text-foreground prose-th:text-foreground prose-td:text-muted-foreground prose-hr:border-border prose-thead:border-border prose-tr:border-border prose-h2:mb-3 prose-h3:mb-2 prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-blockquote:my-4 prose-hr:my-6 prose-pre:my-4 prose-table:my-4">
              <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </article>
          </div>
        </div>
        </RevealOnScroll>
      </Section>

      <CTASection
        title={post.ctaTitle ?? "Ready to Automate Your Tender Workflows?"}
        description={post.ctaDescription ?? "See how CloudGlance transforms document-heavy procurement into streamlined, automated processes."}
        primaryCta={{ text: "Book a Demo", href: "/contact" }}
      />
    </div>
  );
}
