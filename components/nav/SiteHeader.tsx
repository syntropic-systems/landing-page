"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu as MenuIcon, X, Search, Scale, GitCompare } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    Menu as NavbarMenu,
    MenuItem as NavbarMenuItem,
    HoveredLink,
    ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { setScrollTarget, setNavData } from "@/components/scroll-to-section";
import { motion } from "framer-motion";

type DropdownHighlight = {
    title: string;
    description?: string;
    href: string;
    src?: string;
    srcDark?: string;
    icon?: React.ReactNode;
};

type DropdownLink = {
    label: string;
    description?: string;
    href: string;
    /** Key-value data stored in sessionStorage for the target page (e.g. tab selection) */
    data?: Record<string, string>;
};

type DropdownSection = {
    title?: string;
    links: DropdownLink[];
};

type NavDropdown = {
    highlights?: DropdownHighlight[];
    sections?: DropdownSection[];
    footer?: {
        label: string;
        href: string;
    };
};

type NavItem = {
    href: string;
    label: string;
    dropdown?: NavDropdown;
};

const navItems: NavItem[] = [
    {
        href: "/product",
        label: "Product",
        dropdown: {
            sections: [
                {
                    links: [
                        {
                            label: "Platform",
                            href: "/product#platform",
                        },
                        {
                            label: "Features",
                            href: "/product#features",
                        },
                        {
                            label: "Integrations",
                            href: "/product#integrations",
                        },
                        {
                            label: "Security",
                            href: "/product#security",
                        },
                    ],
                },
            ],
            footer: {
                label: "See Product Overview",
                href: "/product",
            }
        },
    },
    {
        href: "/automations",
        label: "Automations",
        dropdown: {
            highlights: [
                {
                    title: "Tender Bidding",
                    description: "Upload tender document and CloudGlance will extract all requirements automatically.",
                    href: "/automations/tender-bidding",
                    icon: <Search className="h-8 w-8 text-primary" />,
                },
                {
                    title: "Tender Evaluation",
                    description: "Compare bids with AI-driven scoring, compliance checks, and reporting.",
                    href: "/automations/tender-evaluation",
                    icon: <Scale className="h-8 w-8 text-primary" />,
                },
                {
                    title: "RFX Response",
                    description: "Match products to RFX requirements and surface deviations automatically.",
                    href: "/automations/rfx",
                    icon: <GitCompare className="h-8 w-8 text-primary" />,
                },
            ],
            footer: {
                label: "Browse All Automations",
                href: "/automations",
            }
        },
    },
    {
        href: "/solutions",
        label: "Solutions",
        dropdown: {
            sections: [
                {
                    title: "By team",
                    links: [
                        {
                            label: "Operations & Project",
                            href: "/solutions#by-team",
                            data: { tab: "operations" },
                        },
                        {
                            label: "Business Development & Sales",
                            href: "/solutions#by-team",
                            data: { tab: "business" },
                        },
                        {
                            label: "Compliance, Legal & Risk",
                            href: "/solutions#by-team",
                            data: { tab: "compliance" },
                        },
                        {
                            label: "Management",
                            href: "/solutions#by-team",
                            data: { tab: "management" },
                        }
                    ],
                },
                {
                    title: "By industry",
                    links: [
                        {
                            label: "Construction & Infrastructure",
                            href: "/solutions#by-industry",
                            data: { section: "industry", tab: "construction" },
                        },
                        {
                            label: "Technology & IT",
                            href: "/solutions#by-industry",
                            data: { section: "industry", tab: "technology" },
                        },
                        {
                            label: "Energy",
                            href: "/solutions#by-industry",
                            data: { section: "industry", tab: "energy" },
                        },
                        {
                            label: "Manufacturing",
                            href: "/solutions#by-industry",
                            data: { section: "industry", tab: "manufacturing" },
                        },
                        {
                            label: "Real Estate & Property Development",
                            href: "/solutions#by-industry",
                            data: { section: "industry", tab: "real-estate" },
                        },
                    ],
                },
            ],
            footer: {
                label: "See All Solutions",
                href: "/solutions",
            },
        },
    },
    {
        href: "/company",
        label: "Company",
        dropdown: {
            sections: [
                {
                    links: [
                        {
                            label: "About Us",
                            href: "/company#about-us",
                        },
                        {
                            label: "Our Mission",
                            href: "/company#our-mission",
                        },
                        {
                            label: "Our Team",
                            href: "/company#team",
                        },
                        {
                            label: "Contact Us",
                            href: "/contact",
                        }
                    ],
                },
            ],
            footer: {
                label: "See All Company Info",
                href: "/company",
            },
        },
    },
    { href: "/faq", label: "FAQ" },
];

/**
 * Parse an href like "/product#features" or "/solutions?tab=operations#by-team"
 * into a clean URL (no hash) and an optional section ID to scroll to.
 */
function parseScrollHref(href: string): { cleanHref: string; sectionId: string | null } {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return { cleanHref: href, sectionId: null };
    return {
        cleanHref: href.slice(0, hashIndex),
        sectionId: href.slice(hashIndex + 1),
    };
}

function DropdownContent({
    dropdown,
    onNavigate,
}: {
    dropdown: NavDropdown;
    onNavigate: () => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const sectionCount = dropdown.sections?.length ?? 0;
    const hasSections = sectionCount > 0;

    const handleScrollLink = React.useCallback(
        (href: string, data?: Record<string, string>) => {
            const { cleanHref, sectionId } = parseScrollHref(href);
            onNavigate();

            if (data) {
                setNavData(data);
            }

            if (sectionId) {
                // If already on the same page, just scroll (and let page handle data)
                const targetPath = cleanHref.split("?")[0] || "/";
                if (pathname === targetPath) {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    // Dispatch event so the page can react to nav data
                    window.dispatchEvent(new Event("nav-data-updated"));
                    return;
                }
                // Otherwise store scroll target and navigate
                setScrollTarget(sectionId);
            }
            router.push(cleanHref || "/");
        },
        [onNavigate, pathname, router]
    );

    return (
        <div className="flex flex-col gap-3">
            {dropdown.highlights?.length ? (
                <div className="grid grid-cols-1 gap-2" style={{ maxWidth: "480px" }}>
                    {dropdown.highlights.map((highlight) => (
                        <ProductItem
                            key={highlight.title}
                            title={highlight.title}
                            description={highlight.description}
                            href={highlight.href}
                            src={(isDark && highlight.srcDark) ? highlight.srcDark : highlight.src}
                            icon={highlight.icon}
                            onClick={onNavigate}
                            showArrow
                        />
                    ))}
                </div>
            ) : null}
            {hasSections ? (
                <div
                    className={sectionCount === 1 ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"}
                    style={{ width: sectionCount === 1 ? "160px" : "480px" }}
                >
                    {dropdown.sections?.map((section, index) => {
                        const sectionKey =
                            section.title ||
                            section.links.map((link) => link.label).join("|") ||
                            `section-${index}`;
                        return (
                            <div key={sectionKey} className="flex flex-col gap-2">
                                {section.title ? (
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground pt-1 pl-1">
                                        {section.title}
                                    </p>
                                ) : null}
                                <div className="flex flex-col gap-1">
                                    {section.links.map((link) => {
                                        const { sectionId } = parseScrollHref(link.href);
                                        const linkKey = link.data ? `${link.href}-${Object.values(link.data).join("-")}` : link.href;
                                        return sectionId ? (
                                            <button
                                                key={linkKey}
                                                type="button"
                                                className="block w-full text-left rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                                                onClick={() => handleScrollLink(link.href, link.data)}
                                            >
                                                <span className="text-sm font-medium text-foreground">
                                                    {link.label}
                                                </span>
                                            </button>
                                        ) : (
                                            <HoveredLink
                                                key={linkKey}
                                                href={link.href}
                                                className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                                                onClick={onNavigate}
                                            >
                                                <span className="text-sm font-medium text-foreground">
                                                    {link.label}
                                                </span>
                                            </HoveredLink>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
            {dropdown.footer ? (
                <HoveredLink
                    href={dropdown.footer.href}
                    className="inline-flex items-center gap-1 border-t pt-2 text-xs font-semibold text-primary hover:text-primary/80"
                    onClick={onNavigate}
                >
                    <span>{dropdown.footer.label}</span>
                    <ArrowRight className="h-3 w-3" />
                </HoveredLink>
            ) : null}
        </div>
    );
}

export function SiteHeader() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isNearTop, setIsNearTop] = React.useState(true);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        let frame: number | null = null;

        const updateState = () => {
            const currentScrollY = window.scrollY;
            const nearTop = currentScrollY <= 10;
            setIsNearTop(nearTop);
            frame = null;
        };

        const handleScroll = () => {
            if (frame === null) {
                frame = window.requestAnimationFrame(updateState);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateState();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame !== null) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, []);

    // Determine which logo to use based on theme
    const isDark = mounted && resolvedTheme === "dark";
    const logoSrc = isDark
        ? "/logo dark_lg.svg"
        : "/logo light_lg.svg";

    const headerClassName = cn(
        "sticky top-0 z-50 w-full backdrop-blur-md supports-[backdrop-filter]:bg-card/50 transition-all duration-300 border-b",
        !isNearTop ? "border-border shadow-sm" : "border-transparent"
    );

    return (
        <motion.header
            className={headerClassName}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="container">
                <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm min-w-0 transition-all duration-200 hover:scale-[1.03] hover:[filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.1))]"
                    >
                        <Image
                            src={logoSrc}
                            alt="Logo"
                            width={546}
                            height={101}
                            className="h-8 w-auto flex-shrink-0"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavbarMenu
                        aria-label="Main navigation"
                        setActive={setActiveDropdown}
                        className="hidden gap-1 rounded-none border-none bg-transparent px-0 py-0 text-sm shadow-none backdrop-blur-none lg:relative lg:flex lg:items-center lg:gap-2"
                    >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <NavbarMenuItem
                                key={item.href}
                                item={item.label}
                                href={item.href}
                                setActive={setActiveDropdown}
                                active={activeDropdown}
                                isRouteActive={isActive}
                                onNavigate={() => setActiveDropdown(null)}
                            >
                                {item.dropdown ? (
                                    <DropdownContent
                                        dropdown={item.dropdown}
                                        onNavigate={() => setActiveDropdown(null)}
                                    />
                                ) : null}
                            </NavbarMenuItem>
                        );
                    })}
                    </NavbarMenu>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden lg:flex items-center gap-2">
                        <Button
                            variant="default"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            asChild
                        >
                            <Link href="/contact">Book a Demo</Link>
                        </Button>
                        <Button
                            variant="secondary"
                            size="default"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            asChild
                        >
                            <a href="https://app.cloudglancelab.com" target="_blank" rel="noopener noreferrer">Sign In</a>
                        </Button>
                    </div>
                    <ThemeToggle />

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden h-9 w-9"
                                aria-label="Open menu"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col backdrop-blur-md bg-card/80 border-border/50">
                            <SheetHeader className="flex flex-row items-center justify-between pb-2 border-b">
                                <SheetTitle>Menu</SheetTitle>
                                <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </SheetClose>
                            </SheetHeader>
                            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto" role="navigation" aria-label="Mobile navigation">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "py-2 px-3 text-base font-medium rounded-md transition-colors",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                        pathname === "/"
                                            ? "bg-secondary text-secondary-foreground cursor-default pointer-events-none"
                                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                    aria-current={pathname === "/" ? "page" : undefined}
                                >
                                    Home
                                </Link>
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const hasDropdown = Boolean(item.dropdown);
                                    
                                    return (
                                        <div key={item.href} className="flex flex-col">
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "py-2 px-3 text-base font-medium rounded-md transition-colors",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                    isActive
                                                        ? "bg-secondary text-secondary-foreground cursor-default pointer-events-none"
                                                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                                )}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                {item.label}
                                            </Link>
                                            {hasDropdown && item.dropdown && (
                                                <div className="pl-4 pb-2 flex flex-col gap-1">
                                                    {item.dropdown.sections?.map((section, sectionIndex) => (
                                                        <div key={sectionIndex} className="flex flex-col gap-1">
                                                            {section.links.map((link) => {
                                                                const { cleanHref, sectionId } = parseScrollHref(link.href);
                                                                const linkIsActive = pathname === (cleanHref.split("?")[0] || "/");
                                                                const mobileLinkKey = link.data ? `${link.href}-${Object.values(link.data).join("-")}` : link.href;
                                                                const handleMobileClick = () => {
                                                                    setIsOpen(false);
                                                                    if (link.data) {
                                                                        setNavData(link.data);
                                                                    }
                                                                    if (sectionId) {
                                                                        if (pathname === (cleanHref.split("?")[0] || "/")) {
                                                                            setTimeout(() => {
                                                                                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                                                window.dispatchEvent(new Event("nav-data-updated"));
                                                                            }, 300);
                                                                            return;
                                                                        }
                                                                        setScrollTarget(sectionId);
                                                                    }
                                                                };
                                                                return sectionId ? (
                                                                    <Link
                                                                        key={mobileLinkKey}
                                                                        href={cleanHref || "/"}
                                                                        onClick={handleMobileClick}
                                                                        className={cn(
                                                                            "px-4 py-2 text-sm rounded-md transition-colors",
                                                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                                            linkIsActive
                                                                                ? "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                                                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                                                        )}
                                                                    >
                                                                        {link.label}
                                                                    </Link>
                                                                ) : (
                                                                    <Link
                                                                        key={link.href}
                                                                        href={link.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className={cn(
                                                                            "px-4 py-2 text-sm rounded-md transition-colors",
                                                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                                            linkIsActive
                                                                                ? "bg-primary text-primary-foreground font-medium"
                                                                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                                                        )}
                                                                        aria-current={linkIsActive ? "page" : undefined}
                                                                    >
                                                                        {link.label}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    ))}
                                                    {item.dropdown.highlights?.map((highlight) => {
                                                        const highlightIsActive = pathname === highlight.href;
                                                        return (
                                                            <Link
                                                                key={highlight.href}
                                                                href={highlight.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className={cn(
                                                                    "px-4 py-2 text-sm rounded-md transition-colors",
                                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                                    highlightIsActive
                                                                        ? "bg-primary text-primary-foreground font-medium"
                                                                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                                                )}
                                                                aria-current={highlightIsActive ? "page" : undefined}
                                                            >
                                                                {highlight.title}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                            <SheetFooter className="border-t pt-4 flex flex-col gap-2">
                                <Button variant="secondary" className="w-full justify-center" asChild>
                                    <a href="https://app.cloudglancelab.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                                        Sign In
                                    </a>
                                </Button>
                                <Button className="w-full justify-center" asChild>
                                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                                        Book a Demo
                                    </Link>
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
                </div>
            </div>
        </motion.header>
    );
}
