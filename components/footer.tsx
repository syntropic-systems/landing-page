'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/animations';
import { setScrollTarget } from '@/components/scroll-to-section';

type FooterLink = { name: string; href: string; section?: string };

function FooterLinkItem({ link, className }: { link: FooterLink; className?: string }) {
    const router = useRouter();

    if (link.section) {
        return (
            <button
                onClick={() => {
                    setScrollTarget(link.section!);
                    router.push(link.href);
                }}
                className={className}
            >
                {link.name}
            </button>
        );
    }

    return (
        <Link href={link.href} className={className}>
            {link.name}
        </Link>
    );
}

export function Footer() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && resolvedTheme === 'dark'
        ? '/logo dark_lg.svg'
        : '/logo light_lg.svg';
    const footerLinks = {
        product: {
            main: { name: 'Product', href: '/product' },
            links: [
                { name: 'Platform', href: '/product', section: 'platform' },
                { name: 'Features', href: '/product', section: 'features' },
                { name: 'Integrations', href: '/product', section: 'integrations' },
                { name: 'Security', href: '/product', section: 'security' },
            ],
        },
        automations: {
            main: { name: 'Automations', href: '/automations' },
            links: [
                { name: 'Tender Bidding', href: '/automations/tender-bidding' },
                { name: 'Tender Evaluation', href: '/automations/tender-evaluation' },
                { name: 'RFX Response', href: '/automations/rfx' },
            ],
        },
        solutions: {
            main: { name: 'Solutions', href: '/solutions' },
            links: [
                { name: 'By Team', href: '/solutions', section: 'by-team' },
                { name: 'By Industry', href: '/solutions', section: 'by-industry' },
            ],
        },
        company: {
            main: { name: 'Company', href: '/company' },
            links: [
                { name: 'About Us', href: '/company', section: 'about-us' },
                { name: 'Our Mission', href: '/company', section: 'our-mission' },
                { name: 'Our Team', href: '/company', section: 'team' },
                { name: 'Contact Us', href: '/contact' },
            ],
        },
        resources: {
            main: { name: 'Resources', href: '' },
            links: [
                { name: 'Pricing', href: '/pricing' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Blog', href: '/blog' },
            ],
        },
    };

    const socialLinks = [
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/cloudglance-lab-pvt-ltd', icon: Linkedin }
    ];

    return (
        // border-foreground/10 rather than the default border token: card and
        // background are near-identical, so this line is the footer's whole
        // edge — softened to the hero family's divider weight
        // (HeroSectionV2's border-foreground/10) instead of the harder chrome
        // hairline.
        <footer className="relative border-t border-foreground/10 bg-card">
            {/* Same brand wash as Hero2/PageHeader — identical radial at the
                identical 70%/30% anchor, so the light that opens every page
                also closes it. Footer height varies with link groups, so the
                wash just fills the element rather than a fixed stage. */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,hsl(208_46%_33%/0.25),transparent_70%)]" />
            <div className="container relative z-10 pt-12 md:pt-16 lg:pt-20">
                <div className="max-w-7xl mx-auto">
                <RevealOnScroll direction="up" duration={0.6}>
                    <div className="flex flex-col gap-4 mb-10">
                        <Link href="/" className="flex items-center space-x-2 self-start" aria-label="CloudGlance home">
                            <Image
                                src={logoSrc}
                                alt="CloudGlance logo"
                                width={546}
                                height={101}
                                className="h-8 w-auto flex-shrink-0"
                                unoptimized
                            />
                        </Link>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                            CloudGlance is an AI-powered document intelligence platform that transforms document-heavy workflows into automated, efficient processes.
                        </p>
                    </div>
                </RevealOnScroll>
                <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8" stagger={0.08}>
                    {Object.values(footerLinks).map((group) => (
                        <StaggerItem key={group.main.name}>
                            <div>
                                {group.main.href ? (
                                    <Link
                                        href={group.main.href}
                                        className="text-sm font-semibold mb-3 block hover:text-primary transition-colors"
                                    >
                                        {group.main.name}
                                    </Link>
                                ) : (
                                    <span className="text-sm font-semibold mb-3 block">
                                        {group.main.name}
                                    </span>
                                )}
                                {'links' in group && (
                                    <ul className="space-y-2">
                                        {group.links.map((link) => (
                                            <li key={link.name}>
                                                <FooterLinkItem
                                                    link={link}
                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerChildren>

                {/* Copyright and Social */}
                <div className="py-5 md:py-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <Link
                                key={name}
                                href={href}
                                aria-label={name}
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Icon className="h-4 w-4" style={{ fill: 'currentColor', stroke: 'none' }} />
                            </Link>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} CloudGlance Sensing Lab Pvt. Ltd. All rights reserved.
                    </p>
                </div>
                </div>
            </div>
        </footer>
    );
}
