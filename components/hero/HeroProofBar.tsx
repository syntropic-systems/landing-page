'use client';

import { ThemeAwareImage } from '@/components/theme-aware-image';

const LOGOS = [
    { src: '/client logos/Jha_client_logo.svg', alt: 'Jha Construction' },
    {
        src: '/client logos/Cortex_client_logo_black.svg',
        srcDark: '/client logos/Cortex_client_logo_white.svg',
        alt: 'Cortex Consulting Solutions',
    },
    { src: '/client logos/ABB_client_logo.svg', alt: 'ABB India' },
    {
        src: '/client logos/Welspun_client_logo.png',
        srcDark: '/client logos/Welspun_client_logo_white.png',
        alt: 'Welspun',
    },
    { src: '/client logos/SSA_client_logo.svg', alt: 'SSA Techno Construction' },
    {
        src: '/client logos/Texmaco_client_logo.png',
        srcDark: '/client logos/Texmaco_client_logo_white.png',
        alt: 'Texmaco Rail',
    },
];

export function HeroProofBar() {
    return (
        <div className="space-y-3 text-center">
            <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/50 font-medium">
                Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4 opacity-70">
                {LOGOS.map((logo) => (
                    <div
                        key={logo.src}
                        className="flex h-7 items-center"
                        aria-label={logo.alt}
                    >
                        <ThemeAwareImage
                            src={logo.src}
                            srcDark={logo.srcDark}
                            alt={logo.alt}
                            width={120}
                            height={28}
                            className="h-7 w-auto object-contain"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
