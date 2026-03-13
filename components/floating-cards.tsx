'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Tiny presentational helpers (document mockup pieces)              */
/* ------------------------------------------------------------------ */

function TextLines({ count, maxWidth = 100 }: { count: number; maxWidth?: number }) {
    const widths = [maxWidth, maxWidth * 0.85, maxWidth * 0.7, maxWidth * 0.92, maxWidth * 0.6];
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="bg-muted-foreground/10 h-1.5 rounded-full"
                    style={{ width: `${widths[i % widths.length]}%` }}
                />
            ))}
        </div>
    );
}

function MiniBarChart() {
    const heights = [40, 65, 50, 80, 55, 70, 45];
    return (
        <div className="flex items-end gap-1" style={{ height: 32 }}>
            {heights.map((h, i) => (
                <div key={i} className="bg-primary/15 w-2 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Card wrapper — glass panel with drift animation                   */
/* ------------------------------------------------------------------ */

function DocumentPanel({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`rounded-2xl border border-border/30 bg-card/20 p-5 shadow-lg backdrop-blur-xl ${className ?? ''}`}
        >
            {children}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Default card definitions                                          */
/* ------------------------------------------------------------------ */

const defaultCards = [
    {
        id: 'doc-text',
        position: 'top-[12%] left-[8%] w-52',
        drift: 'animate-drift-up',
        rotate: '-3deg',
        parallaxSpeed: -300,
        content: (
            <>
                <div className="mb-3 flex items-center gap-2">
                    <div className="bg-primary/25 h-2.5 w-2.5 rounded-sm" />
                    <div className="bg-muted-foreground/15 h-1.5 w-16 rounded-full" />
                </div>
                <TextLines count={5} />
                <div className="mt-3 flex gap-1.5">
                    <div className="bg-primary/10 h-1 w-8 rounded-full" />
                    <div className="bg-primary/10 h-1 w-6 rounded-full" />
                </div>
            </>
        ),
    },
    {
        id: 'doc-chart',
        position: 'top-[28%] right-[6%] w-48',
        drift: 'animate-drift-lateral',
        rotate: '2deg',
        parallaxSpeed: -150,
        content: (
            <>
                <div className="mb-3 flex items-center gap-2">
                    <div className="bg-accent-foreground/20 h-2.5 w-2.5 rounded-full" />
                    <div className="bg-muted-foreground/15 h-1.5 w-12 rounded-full" />
                </div>
                <MiniBarChart />
                <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                        <div className="bg-muted-foreground/10 h-1 w-10 rounded-full" />
                        <div className="bg-primary/10 h-1 w-6 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-muted-foreground/10 h-1 w-8 rounded-full" />
                        <div className="bg-primary/10 h-1 w-5 rounded-full" />
                    </div>
                </div>
            </>
        ),
    },
    {
        id: 'doc-data',
        position: 'bottom-[15%] left-[12%] w-44',
        drift: 'animate-drift-slow',
        rotate: '1.5deg',
        parallaxSpeed: -100,
        content: (
            <>
                <div className="mb-2 flex items-center gap-2">
                    <div className="bg-primary/20 h-2 w-2 rounded-sm" />
                    <div className="bg-muted-foreground/15 h-1.5 w-14 rounded-full" />
                </div>
                <div className="space-y-2">
                    {[75, 50, 90].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="bg-muted-foreground/[0.08] h-1 flex-1 rounded-full">
                                <div className="bg-primary/15 h-full rounded-full" style={{ width: `${w}%` }} />
                            </div>
                            <span className="text-muted-foreground/30 font-mono text-[9px]">{w}%</span>
                        </div>
                    ))}
                </div>
            </>
        ),
    },
];

/* ------------------------------------------------------------------ */
/*  FloatingCards component                                           */
/* ------------------------------------------------------------------ */

export function FloatingCards() {
    const { scrollYProgress } = useScroll();

    const y0 = useTransform(scrollYProgress, [0, 1], [0, defaultCards[0].parallaxSpeed]);
    const y1 = useTransform(scrollYProgress, [0, 1], [0, defaultCards[1].parallaxSpeed]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, defaultCards[2].parallaxSpeed]);
    const yValues = [y0, y1, y2];

    return (
        <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block opacity-40">
            {defaultCards.map((card, i) => (
                <motion.div
                    key={card.id}
                    style={{
                        y: yValues[i],
                        ['--panel-rotate' as string]: card.rotate,
                    }}
                    className={`absolute ${card.position}`}
                >
                    <DocumentPanel className={card.drift}>
                        {card.content}
                    </DocumentPanel>
                </motion.div>
            ))}
        </div>
    );
}
