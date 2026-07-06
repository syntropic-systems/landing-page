'use client';

import { Code2, Sparkles, Users, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeAwareImage } from '@/components/theme-aware-image';

/**
 * Static "shard" for the Company hub hero — the exact MIRROR of the
 * Solutions shard (TeamsShard), reversed. Solutions: CloudGlance node
 * (left) fans OUT to three cards (right) — one platform → many teams.
 * Company: three people cards (left) converge IN to the CloudGlance node
 * (right) — the people → one company. Same canvas, same dashed-curve
 * language, flipped.
 *
 * The cards are the PEOPLE building it, by discipline (no initial-chip
 * avatars — a clean icon-tile + role treatment instead). Node label "One
 * team" parallels Solutions' "One platform". Fixed-size → no scaling.
 */

const CARDS: {
    title: string;
    sub: string;
    icon: LucideIcon;
    tint: string;
    // vertical center of the card's right edge, for the converging line
    y: number;
    position: string;
}[] = [
    {
        title: 'Engineering & Research',
        sub: 'Platform, models & infrastructure',
        icon: Code2,
        tint: 'bg-info/40 text-info-foreground',
        y: 34,
        position: 'top-0 left-6',
    },
    {
        title: 'Product & Design',
        sub: 'Experience & interface',
        icon: Sparkles,
        tint: 'bg-success/40 text-success-foreground',
        y: 200,
        position: 'top-1/2 -translate-y-1/2 left-0',
    },
    {
        title: 'Operations & Growth',
        sub: 'Delivery & customer success',
        icon: Users,
        tint: 'bg-caution/40 text-caution-foreground',
        y: 366,
        position: 'bottom-0 left-6',
    },
];

export function TeamConstellationShard({ className }: { className?: string }) {
    return (
        <div className={cn('flex justify-center', className)}>
            <div className="relative w-[440px] h-[400px]">
                {/* Node glow on the right — the company everyone converges on
                    (the bloom motif, miniaturized). Static, no animation. */}
                <div
                    aria-hidden="true"
                    className="absolute right-[-10px] top-1/2 -translate-y-1/2 h-[132px] w-[132px] rounded-full bg-primary/15 blur-2xl"
                />

                {/* Converging dashed curves — from each card's right edge IN to
                    the node's left edge (328,200), with endpoint dots at the
                    card side. Mirror of the Solutions fan. */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 440 400"
                    className="absolute inset-0 h-full w-full text-foreground/30"
                >
                    <path
                        d="M 328 200 C 300 200, 292 34, 268 34"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <path
                        d="M 328 200 L 244 200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <path
                        d="M 328 200 C 300 200, 292 366, 268 366"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <circle cx="266" cy="34" r="2.5" fill="currentColor" />
                    <circle cx="242" cy="200" r="2.5" fill="currentColor" />
                    <circle cx="266" cy="366" r="2.5" fill="currentColor" />
                </svg>

                {/* People cards */}
                {CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className={cn(
                                'absolute w-[236px] rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-3',
                                card.position
                            )}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={cn(
                                        'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center',
                                        card.tint
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[12px] font-semibold text-foreground truncate leading-tight">
                                        {card.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                                        {card.sub}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* CloudGlance node — the one the people build, on the right. */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[112px] aspect-square rounded-xl border border-border/60 bg-card/90 shadow-xl shadow-primary/20 p-3 flex flex-col items-center justify-center gap-1.5 text-center">
                    <ThemeAwareImage
                        src="/logo light_sm.svg"
                        srcDark="/logo dark_sm.svg"
                        alt="CloudGlance"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                    />
                    <p className="text-[11px] font-semibold text-foreground leading-tight">
                        CloudGlance
                    </p>
                    <p className="text-[9px] text-muted-foreground leading-tight">
                        One team
                    </p>
                </div>
            </div>
        </div>
    );
}
