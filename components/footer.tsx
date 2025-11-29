'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';

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
                { name: 'Platform', href: '/product#platform' },
                { name: 'Features', href: '/product#features' },
                { name: 'Integrations', href: '/product#integrations' },
                { name: 'Security', href: '/product#security' },
        ],
        },
        automations: {
            main: { name: 'Automations', href: '/automations' },
            links: [
                { name: 'Tender Bidding', href: '/automations/tender-bidding' },
                { name: 'Tender Evaluation', href: '/automations/tender-evaluation' },
                { name: 'Contract Review', href: '/automations#contract-review' },
            ],
        },
        solutions: {
            main: { name: 'Solutions', href: '/solutions' },
            links: [
                { name: 'By Team', href: '/solutions#by-team' },
                { name: 'By Industry', href: '/solutions#by-industry' },
        ],
        },
        company: {
            main: { name: 'Company', href: '/company' },
            links: [
            { name: 'About Us', href: '/company#about-us' },
            { name: 'Our Mission', href: '/company#our-mission' },
            { name: 'Our Team', href: '/company#team' },
            { name: 'Contact', href: '/contact' },
        ],
        },
        resources: {
            main: { name: 'FAQ', href: '/faq' },
        },
    };

    const socialLinks = [
        { name: 'LinkedIn', href: '#', icon: Linkedin },
        { name: 'X / Twitter', href: '#', icon: Twitter },
        { name: 'GitHub', href: '#', icon: Github },
    ];

    return (
        <footer className="border-t bg-card">
            <div className="container pt-12 md:pt-16 lg:pt-20">
                <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
                    <Link href="/" className="flex items-center space-x-2" aria-label="CloudGlance home">
                        <Image
                            src={logoSrc}
                            alt="CloudGlance logo"
                            width={546}
                            height={101}
                            className="h-10 w-auto flex-shrink-0"
                            priority
                            unoptimized
                        />
                    </Link>
                    <div className="flex items-center gap-4 sm:mt-0 mt-2">
                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <Link
                                key={name}
                                href={href}
                                aria-label={name}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Icon className="h-4 w-4" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                    {/* Product */}
                    <div>
                        <Link
                            href={footerLinks.product.main.href}
                            className="font-semibold mb-3 block hover:text-primary transition-colors"
                        >
                            {footerLinks.product.main.name}
                        </Link>
                        <ul className="space-y-2">
                            {footerLinks.product.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Automations */}
                    <div>
                        <Link
                            href={footerLinks.automations.main.href}
                            className="font-semibold mb-3 block hover:text-primary transition-colors"
                        >
                            {footerLinks.automations.main.name}
                        </Link>
                        <ul className="space-y-2">
                            {footerLinks.automations.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <Link
                            href={footerLinks.solutions.main.href}
                            className="font-semibold mb-3 block hover:text-primary transition-colors"
                        >
                            {footerLinks.solutions.main.name}
                        </Link>
                        <ul className="space-y-2">
                            {footerLinks.solutions.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <Link
                            href={footerLinks.company.main.href}
                            className="font-semibold mb-3 block hover:text-primary transition-colors"
                        >
                            {footerLinks.company.main.name}
                        </Link>
                        <ul className="space-y-2">
                            {footerLinks.company.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <Link
                            href={footerLinks.resources.main.href}
                            className="font-semibold mb-3 block hover:text-primary transition-colors"
                        >
                            {footerLinks.resources.main.name}
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="py-3 border-t text-left text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CloudGlance. All rights reserved.
                </div>
                </div>
            </div>
        </footer>
    );
}
