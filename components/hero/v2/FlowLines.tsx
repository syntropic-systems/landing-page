'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Connector lines between the content-layer cards, drawn in real pixel
 * space measured from the DOM — NOT hand-tuned percentages.
 *
 * Why measured: the previous version used a 0–100 viewBox with
 * preserveAspectRatio="none", which stretched non-uniformly (elliptical
 * dots, uneven strokes) and drifted out of alignment whenever a card's
 * size changed. Here we read each card's offset box (which ignores the
 * parent's 3D transform, unlike getBoundingClientRect) and draw crisp
 * 1:1 beziers that always land on the actual card edges.
 *
 * Anchors are located by `data-flow="source|intel|bid|l1|compliance"`
 * on the card wrappers in HeroVisualScene.
 */
type Pt = { x: number; y: number };
type Strand = { links: [Pt, Pt][]; nodes: Pt[] };
// Right strands are keyed per target card so the lineage highlight can
// light exactly the hovered card's connections.
type Geometry = {
    w: number;
    h: number;
    source: Strand;
    right: Array<{ key: string; strand: Strand }>;
};
type StrandState = 'idle' | 'lit' | 'dim';

// Horizontal S-curve: control points pushed halfway along the x-gap so
// the curve leaves/enters each card edge horizontally.
function curve([a, b]: [Pt, Pt]): string {
    const dx = (b.x - a.x) * 0.5;
    return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

/**
 * `beat` gates the two strand groups for the scene choreography:
 *   source→intel draws in at beat >= 2, intel→right at beat >= 4.
 * Defaults high so the component shows everything when used standalone.
 *
 * `hovered` (interaction pass) — which hover unit the cursor is on:
 * its LINEAGE lights up (full-strength strands) while unrelated strands
 * dim. 'source' → the fan; 'intel' or 'outputs' (the right column hovers
 * as one unit) → everything. null = all strands at rest.
 */
export function FlowLines({
    className,
    beat = 99,
    hovered = null,
}: {
    className?: string;
    beat?: number;
    hovered?: string | null;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [geo, setGeo] = useState<Geometry | null>(null);

    useLayoutEffect(() => {
        const svg = svgRef.current;
        const layer = svg?.parentElement;
        if (!svg || !layer) return;

        const measure = () => {
            const pick = (name: string) =>
                layer.querySelector<HTMLElement>(`[data-flow="${name}"]`);
            const source = pick('source');
            const intel = pick('intel');
            const targets = [pick('bid'), pick('l1'), pick('compliance')];
            if (!source || !intel || targets.some((t) => !t)) return;

            const rightEdge = (el: HTMLElement, f: number): Pt => ({
                x: el.offsetLeft + el.offsetWidth,
                y: el.offsetTop + el.offsetHeight * f,
            });
            const leftEdge = (el: HTMLElement, f: number): Pt => ({
                x: el.offsetLeft,
                y: el.offsetTop + el.offsetHeight * f,
            });

            // Source → Intel: a criss-crossing fan — each source node
            // sends two strands to intel edges above & below it, so the
            // paths alternate and cross for a woven "many-to-many" feel.
            const sourceToIntel: [Pt, Pt][] = [];
            [0.28, 0.44, 0.6, 0.76].forEach((sf, i) => {
                const from = rightEdge(source, sf);
                // fan targets sit slightly tighter than the source spread
                sourceToIntel.push([from, leftEdge(intel, 0.32 + i * 0.12)]);
                sourceToIntel.push([from, leftEdge(intel, 0.44 + i * 0.12)]);
            });

            // Intel → each right card: two strands landing on the card's
            // upper & lower thirds, so each connection reads as a pair.
            // Kept per-card so the hovered card's pair can light alone.
            const rightKeys = ['bid', 'l1', 'compliance'];
            const right = targets.map((t, i) => {
                const el = t as HTMLElement;
                const src = rightEdge(intel, 0.3 + i * 0.18);
                const links: [Pt, Pt][] = [
                    [src, leftEdge(el, 0.36)],
                    [src, leftEdge(el, 0.64)],
                ];
                return {
                    key: rightKeys[i],
                    strand: { links, nodes: links.flat() },
                };
            });

            setGeo({
                w: layer.clientWidth,
                h: layer.clientHeight,
                source: { links: sourceToIntel, nodes: sourceToIntel.flat() },
                right,
            });
        };

        measure();
        // Re-measure if any card reflows (font load, content change, resize).
        const ro = new ResizeObserver(measure);
        ro.observe(layer);
        layer.querySelectorAll('[data-flow]').forEach((el) => ro.observe(el));
        return () => ro.disconnect();
    }, []);

    return (
        <svg
            ref={svgRef}
            className={cn(
                'absolute inset-0 w-full h-full z-20 pointer-events-none text-primary/45 dark:text-primary/50',
                className
            )}
            width={geo?.w}
            height={geo?.h}
            viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
            fill="none"
            aria-hidden="true"
        >
            {geo && (
                <>
                    <defs>
                        {/* Fade the strokes toward their middle so the
                            card edges read as the anchored, solid ends. */}
                        <linearGradient id="flow-fade" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
                        </linearGradient>
                        {/* Full-strength variant for lit lineage strands.
                            NOTE: gradient stops resolve currentColor from
                            the GRADIENT's own ancestry, not the element
                            using the stroke — so the lit color must live
                            here as a class, not on the strand group. */}
                        <linearGradient
                            id="flow-fade-lit"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                            className="text-primary"
                        >
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
                        </linearGradient>
                    </defs>

                    {/* Two strand groups. Each is revealed by a left→right
                        clip wipe at its beat, so the lines visibly travel
                        from the source column toward the target (the dash
                        flow keeps running underneath). Within a wipe, each
                        part carries its own lineage-highlight state. */}
                    {([
                        {
                            show: beat >= 2,
                            parts: [{ group: 'source', strand: geo.source }],
                        },
                        {
                            show: beat >= 4,
                            parts: geo.right.map((r) => ({
                                group: r.key,
                                strand: r.strand,
                            })),
                        },
                    ] as const).map(({ show, parts }, gi) => {
                        const all = parts.flatMap((p) => p.strand.nodes);
                        const xs = all.map((n) => n.x);
                        const minX = Math.min(...xs);
                        const maxX = Math.max(...xs);
                        const clipId = `flow-wipe-${gi}`;
                        return (
                            <g key={gi}>
                                <defs>
                                    <clipPath id={clipId}>
                                        {/* width 0 → hidden; animates to full
                                            span, revealing lines L→R */}
                                        <motion.rect
                                            x={minX}
                                            y={0}
                                            height={geo.h}
                                            initial={{ width: 0 }}
                                            animate={{ width: show ? maxX - minX : 0 }}
                                            transition={{
                                                duration: 0.7,
                                                ease: [0.4, 0, 0.2, 1],
                                            }}
                                        />
                                    </clipPath>
                                </defs>
                                <g clipPath={`url(#${clipId})`}>
                                    {parts.map(({ group, strand }) => {
                                        // Direct connections only: source →
                                        // the fan; outputs → the right
                                        // strands; intel (the hub, touching
                                        // both) → everything. The other
                                        // side dims.
                                        const state: StrandState = !hovered
                                            ? 'idle'
                                            : hovered === 'intel'
                                              ? 'lit'
                                              : hovered === 'source'
                                                ? group === 'source'
                                                    ? 'lit'
                                                    : 'dim'
                                                : group === 'source'
                                                  ? 'dim'
                                                  : 'lit';
                                        return (
                                            <g
                                                key={group}
                                                className={cn(
                                                    'transition-opacity duration-500',
                                                    state === 'dim' && 'opacity-40'
                                                )}
                                            >
                                                {/* Base strands — always on. */}
                                                <g
                                                    stroke="url(#flow-fade)"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    className="flow-path"
                                                >
                                                    {strand.links.map((link, i) => (
                                                        <path key={i} d={curve(link)} />
                                                    ))}
                                                </g>
                                                {/* Lit overlay — cross-fades
                                                    over the base (a straight
                                                    gradient-URL swap SNAPS;
                                                    this eases the brighten in
                                                    and out). Same dash anim,
                                                    mounted together → dashes
                                                    stay in sync. */}
                                                <g
                                                    stroke="url(#flow-fade-lit)"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    className={cn(
                                                        'flow-path transition-opacity duration-500',
                                                        state === 'lit'
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                >
                                                    {strand.links.map((link, i) => (
                                                        <path key={i} d={curve(link)} />
                                                    ))}
                                                </g>
                                                {/* Connection nodes — quiet
                                                    anchors; ease to full
                                                    primary when lit. */}
                                                <g
                                                    fill="currentColor"
                                                    className={cn(
                                                        'transition-[opacity,color] duration-500',
                                                        state === 'lit'
                                                            ? 'text-primary opacity-90'
                                                            : 'opacity-70'
                                                    )}
                                                >
                                                    {strand.nodes.map((p, i) => (
                                                        <circle key={i} cx={p.x} cy={p.y} r="2" />
                                                    ))}
                                                </g>
                                            </g>
                                        );
                                    })}
                                </g>
                            </g>
                        );
                    })}

                    <style>{`
                        .flow-path path {
                            stroke-dasharray: 5 7;
                            animation: flow-dash 1.1s linear infinite;
                            will-change: stroke-dashoffset;
                        }
                        @keyframes flow-dash {
                            to { stroke-dashoffset: -12; }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            .flow-path path { animation: none; }
                        }
                    `}</style>
                </>
            )}
        </svg>
    );
}
