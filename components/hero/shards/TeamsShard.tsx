'use client';

import { Briefcase, Award, ShieldCheck, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeAwareImage } from '@/components/theme-aware-image';

/**
 * Static "shard" for the Solutions hub hero: one platform powering many
 * teams. A scene-style floating canvas (fixed 440×400 stage, absolute
 * pieces — not a flexbox diagram): the CloudGlance node glows on the
 * left — the platform as the literal light source the site's bloom
 * language alludes to — and true drawn curves fan out to three persona
 * cards in a staggered arc. Artifact-true: each card shows a sliver of
 * what that team sees in the app, reusing the same NHAI tender
 * story-world as the Product and Automations shards (forms 23/25, L1
 * winner BJ Mehta, quality 81/100) so all heroes depict one project.
 * The node says "One platform" (the whole product), NOT "Workflow
 * Studio" — that's the pipeline module, which is Automations vocabulary.
 */

type TeamRow = {
    label: string;
    value: string;
    /** scene-style semantic pill treatment for notable values */
    pill?: 'primary' | 'warning';
};

const TEAMS: {
    name: string;
    icon: LucideIcon;
    /** icon tile tint — per-team accent, like the scene's file-type colors */
    tint: string;
    members: string[];
    rows: TeamRow[];
    position: string;
}[] = [
    {
        name: 'Bid & Proposal Teams',
        icon: Briefcase,
        tint: 'bg-info/40 text-info-foreground',
        members: ['RS', 'AK', '+4'],
        rows: [
            { label: 'Forms Ready', value: '23 / 25' },
            { label: 'Bid Due', value: '27 Feb 2026' },
        ],
        position: 'top-0 right-6',
    },
    {
        name: 'Evaluation Committees',
        icon: Award,
        tint: 'bg-success/40 text-success-foreground',
        members: ['PM', 'VT', '+2'],
        rows: [
            { label: 'L1 Winner', value: 'BJ Mehta', pill: 'primary' },
            { label: 'Technical Score', value: '61 / 100' },
        ],
        position: 'top-1/2 -translate-y-1/2 right-0',
    },
    {
        name: 'Operations & Compliance',
        icon: ShieldCheck,
        tint: 'bg-caution/40 text-caution-foreground',
        members: ['NK', 'SD', '+3'],
        rows: [
            { label: 'Quality Score', value: '81 / 100' },
            { label: 'Gaps Flagged', value: '5 Missing', pill: 'warning' },
        ],
        position: 'bottom-0 right-6',
    },
];

export function TeamsShard({ className }: { className?: string }) {
    return (
        <div className={cn('flex justify-center', className)}>
            {/* Fixed canvas — pieces are absolutely placed like the scene's
                composition, so curves are drawn with true coordinates. */}
            <div className="relative w-[440px] h-[400px]">
                {/* Node glow — the platform as light source (the bloom
                    motif, miniaturized). Static, no animation. */}
                <div
                    aria-hidden="true"
                    className="absolute left-[-10px] top-1/2 -translate-y-1/2 h-[132px] w-[132px] rounded-full bg-primary/15 blur-2xl"
                />

                {/* Fan — true cubic curves from the node's right edge to
                    each card's left edge, with endpoint dots. */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 440 400"
                    className="absolute inset-0 h-full w-full text-foreground/30"
                >
                    <path
                        d="M 112 200 C 145 200, 125 48, 154 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <path
                        d="M 112 200 L 178 200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <path
                        d="M 112 200 C 145 200, 125 352, 154 352"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                    />
                    <circle cx="156" cy="48" r="2.5" fill="currentColor" />
                    <circle cx="180" cy="200" r="2.5" fill="currentColor" />
                    <circle cx="156" cy="352" r="2.5" fill="currentColor" />
                </svg>

                {/* Platform node — square, the whole product */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[112px] aspect-square rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-3 flex flex-col items-center justify-center gap-1.5 text-center">
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
                        One platform
                    </p>
                </div>

                {/* Persona cards — staggered arc, middle card furthest */}
                {TEAMS.map((team) => {
                    const Icon = team.icon;
                    return (
                        <div
                            key={team.name}
                            className={cn(
                                'absolute w-[260px] rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-3',
                                team.position
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className={cn(
                                        'h-6 w-6 shrink-0 rounded flex items-center justify-center',
                                        team.tint
                                    )}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-[11px] font-semibold text-foreground truncate flex-1">
                                    {team.name}
                                </p>
                                <div className="flex -space-x-1.5 shrink-0">
                                    {team.members.map((m) => (
                                        <span
                                            key={m}
                                            className="h-4.5 w-4.5 rounded-full bg-accent border border-card text-[7px] font-semibold text-accent-foreground flex items-center justify-center"
                                        >
                                            {m}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-lg bg-background border border-border/40 px-2.5 py-1 divide-y divide-border/30">
                                {team.rows.map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-center justify-between gap-2 py-1"
                                    >
                                        <span className="text-[10px] text-foreground/55 shrink-0">
                                            {row.label}
                                        </span>
                                        {row.pill === 'primary' ? (
                                            <span className="flex items-center gap-1 min-w-0">
                                                <span className="text-[10px] font-semibold text-foreground truncate">
                                                    {row.value}
                                                </span>
                                                <span className="text-[8px] font-semibold text-primary px-1 py-px rounded bg-primary/10 border border-primary/20">
                                                    L1
                                                </span>
                                            </span>
                                        ) : row.pill === 'warning' ? (
                                            <span className="text-[8px] font-medium text-warning-foreground px-1 py-0.5 rounded bg-warning/40 border border-warning-foreground/20 whitespace-nowrap">
                                                {row.value}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-semibold text-foreground tabular-nums">
                                                {row.value}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
