"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu as MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
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

type DropdownHighlight = {
    title: string;
    description?: string;
    href: string;
    src: string;
};

type DropdownSection = {
    title?: string;
    links: {
        label: string;
        description?: string;
        href: string;
    }[];
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
                    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
                },
                {
                    title: "Tender Evaluation",
                    description: "Compare bids with AI-driven scoring, compliance checks, and reporting.",
                    href: "/automations/tender-evaluation",
                    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
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
                            href: "/solutions?tab=operations#by-team",
                        },
                        {
                            label: "Business Development & Sales",
                            href: "/solutions?tab=business#by-team",
                        },
                        {
                            label: "Compliance, Legal & Risk",
                            href: "/solutions?tab=compliance#by-team",
                        },
                        {
                            label: "Management",
                            href: "/solutions?tab=management#by-team",
                        }
                    ],
                },
                {
                    title: "By industry",
                    links: [
                        {
                            label: "Construction & Infrastructure",
                            href: "/solutions?section=industry&tab=construction#by-industry",
                        },
                        {
                            label: "Technology & IT",
                            href: "/solutions?section=industry&tab=technology#by-industry",
                        },
                        {
                            label: "Energy",
                            href: "/solutions?section=industry&tab=energy#by-industry",
                        },
                        {
                            label: "Manufacturing",
                            href: "/solutions?section=industry&tab=manufacturing#by-industry",
                        },
                        {
                            label: "Real Estate & Property Development",
                            href: "/solutions?section=industry&tab=real-estate#by-industry",
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

function DropdownContent({
    dropdown,
    onNavigate,
}: {
    dropdown: NavDropdown;
    onNavigate: () => void;
}) {
    const sectionCount = dropdown.sections?.length ?? 0;
    const hasSections = sectionCount > 0;

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
                            src={highlight.src}
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
                            section.links.map((link) => link.href).join("|") ||
                            `section-${index}`;
                        return (
                            <div key={sectionKey} className="flex flex-col gap-2">
                                {section.title ? (
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground pt-1 pl-1">
                                        {section.title}
                                    </p>
                                ) : null}
                                <div className="flex flex-col gap-1">
                                    {section.links.map((link) => (
                                        <HoveredLink
                                            key={link.href}
                                            href={link.href}
                                            className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                                            onClick={onNavigate}
                                        >
                                            <span className="text-sm font-medium text-foreground">
                                                {link.label}
                                            </span>
                                        </HoveredLink>
                                    ))}
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
        <header className={headerClassName}>
            <div className="container">
                <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm min-w-0"
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
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle>Navigation</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-2 mt-6" role="navigation" aria-label="Mobile navigation">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const hasDropdown = Boolean(item.dropdown);
                                    
                                    return (
                                        <div key={item.href} className="flex flex-col">
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "px-4 py-3 text-base font-medium rounded-md transition-colors",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                    isActive
                                                        ? "bg-accent text-accent-foreground cursor-default pointer-events-none"
                                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                                                                const linkIsActive = pathname === link.href;
                                                                return (
                                                                    <Link
                                                                        key={link.href}
                                                                        href={link.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className={cn(
                                                                            "px-4 py-2 text-sm rounded-md transition-colors",
                                                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                                            linkIsActive
                                                                                ? "bg-accent text-accent-foreground font-medium"
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
                                                                        ? "bg-accent text-accent-foreground font-medium"
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
                                <div className="flex flex-col gap-2 pt-4 border-t">
                                    <Button className="w-full justify-center" asChild>
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                                            Book a Demo
                                        </Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                </div>
            </div>
        </header>
    );
}
