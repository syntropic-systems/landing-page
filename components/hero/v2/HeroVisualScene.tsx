'use client';

import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import {
    MotionConfig,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppWindow } from './AppWindow';
import { PipelineStrip } from './PipelineStrip';
import { SourceDocumentsCard } from './SourceDocumentsCard';
import { ExtractedIntelligenceCard } from './ExtractedIntelligenceCard';
import { L1EvaluationCard } from './L1EvaluationCard';
import { BidPackageCard } from './BidPackageCard';
import { ComplianceCard } from './ComplianceCard';
import { FlowLines } from './FlowLines';

/**
 * Scene choreography (plays once). A single `beat` counter (0→5) is
 * advanced on a timed schedule and drives every element:
 *   beat 1 → pipeline pill 1 + Source card       (files ingested)
 *   beat 2 → pill 2 + lines L→C + Intel card      (reading)
 *   beat 3 → pill 3 + Intel values resolve        (structuring)
 *   beat 4 → pill 4 + lines C→R + 3 right cards   (running)
 *   beat 5 → pill 5 + right cards resolve          (validating)
 * activeIndex = beat - 1. Timings below are the rhythm knobs — tune
 * the gaps to taste. Reduced-motion jumps straight to the final beat.
 */
const FINAL_BEAT = 5;
// Absolute (NOT scaled by SPEED): the pipeline waits for the window to
// fully land first — the entrance settles ~1.25s (0.35s delay + 0.9s
// rise in HeroSectionV2), so pill 1 starts a beat after that.
const INITIAL_DELAY = 900;
const BEAT_GAPS = [1600, 1300, 1050, 1500]; // 1→2, 2→3, 3→4, 4→5 (ms)
// The top (content) layer trails the behind (pipeline) layer by this at
// each checkpoint — the stage lights up, then the content responds.
const CONTENT_OFFSET = 250;
// The final pill stays active as long as the others do on average (the
// mean beat gap), then goes idle so it doesn't linger lit at rest.
const PILL_SETTLE = Math.round(
    BEAT_GAPS.reduce((a, b) => a + b, 0) / BEAT_GAPS.length
);
// Global pacing multiplier for the whole schedule — higher = faster.
// 1.0 ≈ 8s total; 1.2 ≈ 6.7s. Scales only the beat schedule, not the
// per-element animation durations (those are already well-judged).
const SPEED = 1.2;

// Card entrance — a springy pop (slight overshoot) so each card snaps
// into place with life rather than a flat fade.
const CARD_ENTER = {
    initial: { opacity: 0, scale: 0.9, y: 14 },
    show: { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring' as const, stiffness: 260, damping: 17, mass: 0.8 },
};

/**
 * Wraps a content card: springy entrance + a one-time primary ring
 * flash that traces the card edge as it lands (the "just arrived" cue).
 * `dataFlow` stays on this element so FlowLines still measures the box.
 */
function RevealCard({
    show,
    delay = 0,
    dataFlow,
    hover = false,
    onHover,
    children,
}: {
    show: boolean;
    delay?: number;
    dataFlow: string;
    hover?: boolean;
    onHover?: (key: string | null) => void;
    children: ReactNode;
}) {
    return (
        <motion.div
            data-flow={dataFlow}
            className="relative"
            initial={CARD_ENTER.initial}
            animate={show ? CARD_ENTER.show : CARD_ENTER.initial}
            // z only exists for the hover lift, so keying its exit to the
            // hover spring keeps the settle-back soft (scale exits on the
            // entrance spring — its 1.02→1 bounce is imperceptible).
            transition={{
                ...CARD_ENTER.transition,
                delay: show ? delay : 0,
                z: HOVER_TRANS,
            }}
            // Hover lift (interaction pass) — only when the capability gate
            // matches; Framer composes it with the entrance transform, and
            // MotionConfig reducedMotion snaps it away for reduced users.
            whileHover={
                hover ? { ...HOVER_LIFT, transition: HOVER_TRANS } : undefined
            }
            // Lineage highlight — report which card the cursor is on so
            // FlowLines can light its connected strands.
            onHoverStart={hover && onHover ? () => onHover(dataFlow) : undefined}
            onHoverEnd={hover && onHover ? () => onHover(null) : undefined}
        >
            {children}
            <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl ring-2 ring-primary/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={{
                    duration: 0.7,
                    delay: show ? delay + 0.08 : 0,
                    times: [0, 0.3, 1],
                }}
            />
        </motion.div>
    );
}

function useSceneBeat() {
    const reduced = useReducedMotion();
    // pillBeat drives the behind layer (pipeline pills); contentBeat drives
    // the top layer (cards + flow lines) and trails it by CONTENT_OFFSET.
    const [pillBeat, setPillBeat] = useState(0);
    const [contentBeat, setContentBeat] = useState(0);

    useEffect(() => {
        if (reduced) {
            // All pills revealed, none active; content resolved.
            setPillBeat(FINAL_BEAT + 1);
            setContentBeat(FINAL_BEAT);
            return;
        }
        const timers: ReturnType<typeof setTimeout>[] = [];
        const s = (ms: number) => ms / SPEED; // apply global pacing
        // INITIAL_DELAY stays absolute (unscaled) so the pipeline always
        // waits for the window entrance; SPEED only tightens what follows.
        let at = INITIAL_DELAY;
        for (let b = 1; b <= FINAL_BEAT; b++) {
            const fire = at;
            timers.push(setTimeout(() => setPillBeat(b), fire));
            timers.push(setTimeout(() => setContentBeat(b), fire + s(CONTENT_OFFSET)));
            at += s(BEAT_GAPS[b - 1] ?? 0);
        }
        // `at` now holds the moment the final pill lit up. Deactivate it
        // after PILL_SETTLE so it doesn't stay highlighted at rest —
        // pillBeat = FINAL_BEAT + 1 keeps all pills visible, none active.
        timers.push(
            setTimeout(() => setPillBeat(FINAL_BEAT + 1), at + s(PILL_SETTLE))
        );
        return () => timers.forEach(clearTimeout);
    }, [reduced]);

    return { pillBeat, contentBeat };
}

// The scene is authored at this fixed width — its perfect size in the
// ~750px hero column at 1920 (the x1 baseline). Everything narrower
// scales the whole composition DOWN from here; nothing scales up past it.
const DESIGN_W = 750;

// V2.5 interaction — parallax steering knobs (desktop mouse only).
// PAR_ROT modulates the resting tilt by ±deg toward the cursor; PAR_DRIFT
// translates the content layer by ±px in the same direction, opening the
// exploded gap. Flip a sign here if the steering feels inverted live.
const PAR_ROT = 2.5; // deg
const PAR_DRIFT = 7; // px
// Card hover lift: scale + a real translateZ nudge (needs preserve-3d on
// the content layer) so the hovered card comes toward the viewer.
const HOVER_LIFT = { scale: 1.02, z: 12 }; // z in px on top of the layer's 48
// Hover gets its OWN soft spring — without it the lift inherits the
// entrance spring (260/17, deliberately bouncy) on source/intel and
// Framer's default on the group: overshooty and inconsistent.
const HOVER_TRANS = {
    type: 'spring' as const,
    stiffness: 190,
    damping: 25,
    mass: 0.8,
};
// One capability gate for all scene interactions: the 3D view + a real mouse.
const INTERACT_MQ =
    '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

/**
 * Mouse parallax over the scene. Pointer position (normalized −1…1 from
 * the scene box center) drives two springs, which write CSS variables
 * consumed by the lg+ tilt styles:
 *   --par-ry / --par-rx  → screen-aligned rotations composed OUTSIDE the
 *                          base tilt (leftmost in the transform list), so
 *                          steering is predictable regardless of the tilt
 *   --par-dx / --par-dy  → content-layer counter-drift (its translateZ(48)
 *                          already shifts it more under perspective; the
 *                          drift amplifies the layer separation)
 * All vars default to 0 — at rest, on touch, below lg, and under reduced
 * motion the scene renders its exact settled pose. Springs ease everything
 * back on pointer leave.
 */
function useSceneParallax(hostRef: RefObject<HTMLDivElement | null>) {
    const reduced = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 110, damping: 22, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 110, damping: 22, mass: 0.6 });

    useEffect(() => {
        const host = hostRef.current;
        if (!host || reduced) return;
        // Real mouse + the 3D view only — capability, not just width.
        const mq = window.matchMedia(INTERACT_MQ);
        const onMove = (e: PointerEvent) => {
            if (!mq.matches) return;
            const r = host.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        };
        const onLeave = () => {
            mx.set(0);
            my.set(0);
        };
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
        return () => {
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
        };
    }, [hostRef, reduced, mx, my]);

    // Write vars on spring change — no React re-render per frame.
    useMotionValueEvent(sx, 'change', (v) => {
        const host = hostRef.current;
        if (!host) return;
        host.style.setProperty('--par-ry', `${v * PAR_ROT}deg`);
        host.style.setProperty('--par-dx', `${v * PAR_DRIFT}px`);
    });
    useMotionValueEvent(sy, 'change', (v) => {
        const host = hostRef.current;
        if (!host) return;
        host.style.setProperty('--par-rx', `${-v * PAR_ROT}deg`);
        host.style.setProperty('--par-dy', `${v * PAR_DRIFT}px`);
    });
}

/**
 * Scale-to-fit. The scene is a fixed-width composition (fixed-width cards
 * + gaps), so instead of reflowing it we shrink it as one unit to fit the
 * available column: k = min(1, columnWidth / DESIGN_W). A CSS scale zooms
 * everything — text, gaps, shadows, flow lines — by the same factor, so
 * the scaled view is pixel-identical, just smaller. It's a no-op (k = 1)
 * whenever the column is ≥ DESIGN_W and only bites once it's narrower
 * (~below 800px). Since transform: scale doesn't shrink the layout box,
 * we also reserve the scaled height on the outer box so the content below
 * (proof bar) doesn't get pushed down by the unscaled height.
 */
function useFitScale() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [reservedH, setReservedH] = useState<number>();

    useEffect(() => {
        const container = containerRef.current;
        const scene = sceneRef.current;
        if (!container || !scene) return;
        // The hero row that height-budgets the scene at lg+ (the section is
        // 100vh-locked there). Below lg the row's height DERIVES from the
        // scene, so height-fitting would be circular — gated off by the
        // media query inside measure().
        const viewport = container.closest<HTMLElement>('[data-scene-viewport]');
        const measure = () => {
            const kW = Math.min(1, container.clientWidth / DESIGN_W);
            // Height fit: on short viewports the width-scaled scene can
            // still exceed the locked row height and get clipped — scale
            // down further to whichever budget is tighter. The row is
            // items-center / justify-center, so the smaller scene stays
            // centered both ways.
            let kH = 1;
            if (viewport && window.matchMedia('(min-width: 1024px)').matches) {
                kH = viewport.clientHeight / scene.offsetHeight;
            }
            const k = Math.min(1, kW, kH);
            setScale(k);
            // offsetHeight is the untransformed layout height (scale
            // doesn't affect it), so this is the natural height × k.
            setReservedH(scene.offsetHeight * k);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(container);
        ro.observe(scene);
        if (viewport) ro.observe(viewport);
        return () => ro.disconnect();
    }, []);

    return { containerRef, sceneRef, scale, reservedH };
}

/**
 * V2.4 — two-layer scene.
 *
 * UI layer (behind):   AppWindow shell — chrome bar, icon rail, body
 *                      surface — with the Workflow Studio pipeline
 *                      rendered on its main area.
 * Content layer (front): the three card columns + flow lines, floating
 *                      above the window at translateZ(48px) inside the
 *                      lg+ tilt's preserve-3d context. Cards overhang
 *                      the window's left and bottom edges.
 *
 * The window is absolutely positioned (inset from left, short of the
 * bottom) so the in-flow pipeline + card row define the scene height.
 * The pipeline container's pt/pl clear the window's chrome bar (h-10)
 * and icon rail (w-12) + the window's left-8 inset.
 *
 * Note: rotate3d() with commas isn't parsed by Tailwind arbitrary values
 * reliably, so we use a real <style> block keyed off a class.
 *
 * Future:
 *   V2.5 — per-card translateZ + mouse parallax
 */
export function HeroVisualScene({ className }: { className?: string }) {
    const { pillBeat, contentBeat } = useSceneBeat();
    const { containerRef, sceneRef, scale, reservedH } = useFitScale();
    // Parallax vars land on the measuring container (they inherit down to
    // the tilt + content layer, which consume them at lg+ only).
    useSceneParallax(containerRef);
    // Card hover lift shares the same capability gate (3D view + real mouse).
    const [hoverable, setHoverable] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(INTERACT_MQ);
        const update = () => setHoverable(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);
    // Which card the cursor is on — drives the flow-line lineage highlight.
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    // Pipeline lifecycle for the window header badge:
    // idle (nothing) → initializing (pill 1) → running → completed (settled).
    const status =
        pillBeat <= 0
            ? 'idle'
            : pillBeat === 1
              ? 'initializing'
              : pillBeat <= FINAL_BEAT
                ? 'running'
                : 'complete';
    return (
        // reducedMotion="user": when the OS prefers reduced motion, Framer
        // snaps all movement (pops, slides, wipes) to final. Combined with
        // useSceneBeat jumping straight to the final beat, the scene simply
        // renders finished — no cascade — with only gentle opacity fades.
        <MotionConfig reducedMotion="user">
        {/* Measuring container — spans the full hero column; its width
            drives the scale, and it reserves the scaled height so the
            proof bar below isn't pushed down by the unscaled layout box. */}
        <div
            ref={containerRef}
            // items-start is load-bearing: this box's height is set to the
            // *scaled* height below, and a stretched flex child would grow
            // to match it, shrinking its own offsetHeight, which we then
            // re-measure into an even smaller height — a runaway shrink
            // loop. items-start keeps the scale box at its natural height
            // (immune to the height we set), so the measurement is stable.
            className={cn('w-full flex justify-center items-start', className)}
            style={reservedH ? { height: reservedH } : undefined}
            aria-hidden="true"
        >
        {/* Scale box — fixed at DESIGN_W, shrunk as one unit to fit. Kept
            separate from the perspective element so the 3D tilt and the
            fit-scale never fight over the same transform. */}
        <div
            ref={sceneRef}
            className="shrink-0"
            style={{
                width: DESIGN_W,
                transform: scale < 1 ? `scale(${scale})` : undefined,
                transformOrigin: 'top center',
            }}
        >
        <div className="relative w-full hero-scene-perspective select-none">
            {/* No transition-transform here — the parallax springs do the
                smoothing; a CSS transition on top would double-smooth and
                make the steering feel laggy. */}
            <div className="relative hero-scene-tilt">
                {/* ── UI layer: app window shell (absolute, behind) ──
                    bottom-8 lets the card row overhang the window bottom.
                    On lg+ (3D) the window grows LEFT into the grid's column
                    gap (-left-8 = the gap-8 between text and scene) and its
                    right edge stays at the container (right-0 — don't extend
                    past it, breaks the site's padding line). Below lg (flat
                    2D) it spans nearly the full scene width with a small
                    SYMMETRIC inset (left-2 right-2) so it reads centered,
                    cards slightly overhanging both edges. */}
                <AppWindow
                    status={status}
                    className="absolute top-0 bottom-8 left-2 right-2 lg:-left-8 lg:right-0"
                />

                {/* Pipeline — belongs to the UI layer; padded into the
                    window's main area: pt clears the header (h-10) + 16px
                    breathing room; pl clears the window's left inset +
                    icon rail (w-12) + 16px — below lg: 8+48+16=72 (pl-18),
                    lg+: 32 (pl-8, window extends -left-8). pr mirrors the
                    right inset: below lg 8+16=24 (pr-6), lg+ 16 (pr-4). */}
                <div className="relative pt-14 pl-18 lg:pl-8 pr-6 lg:pr-4 mb-5">
                    {/* Pills (behind layer) revealed one-by-one:
                        activeIndex = pillBeat - 1 (0 → -1 → empty strip). */}
                    <PipelineStrip activeIndex={pillBeat - 1} />
                </div>

                {/* ── Content layer: card columns float above the window.
                    Full scene width, so the left card overhangs the
                    window's inset edge. justify-between + items-center
                    keeps each column centered in the row height (set by
                    the right column). `relative` so FlowLines (absolute
                    SVG overlay) positions over this row. */}
                <div className="hero-content-layer relative flex justify-between items-center">
                    {/* FlowLines measures these cards by their data-flow
                        anchors (offset boxes, unaffected by the entrance
                        transforms) and draws each strand group at its beat. */}
                    <FlowLines beat={contentBeat} hovered={hoveredCard} />

                    {/* Left: Source documents — reveals at content beat 1.
                        RevealCard animates opacity/scale/y only, so the
                        offset boxes stay put and the flow lines stay anchored. */}
                    <RevealCard
                        show={contentBeat >= 1}
                        dataFlow="source"
                        hover={hoverable}
                        onHover={setHoveredCard}
                    >
                        {/* files ingest at beat 1, index-complete by beat 2 */}
                        <SourceDocumentsCard
                            reveal={contentBeat >= 1}
                            indexed={contentBeat >= 2}
                        />
                    </RevealCard>

                    {/* Middle: Extracted intelligence — reveals at content beat 2 */}
                    <RevealCard
                        show={contentBeat >= 2}
                        dataFlow="intel"
                        hover={hoverable}
                        onHover={setHoveredCard}
                    >
                        <ExtractedIntelligenceCard
                            showStructure={contentBeat >= 2}
                            showValues={contentBeat >= 3}
                        />
                    </RevealCard>

                    {/* Right column: reveals at beat 4, the three cards
                        staggered one after another. flex-col + min-h forces
                        equal heights, footers pinned via mt-auto. */}
                    {/* The right column hovers as ONE unit (user call): a
                        per-card z-lift this far from the perspective origin
                        slides sideways instead of coming forward, and three
                        cards twitching individually reads noisy. The column
                        lifts together and lights its full lineage. */}
                    <motion.div
                        className="flex flex-col gap-3"
                        transition={HOVER_TRANS}
                        whileHover={hoverable ? HOVER_LIFT : undefined}
                        onHoverStart={
                            hoverable ? () => setHoveredCard('outputs') : undefined
                        }
                        onHoverEnd={
                            hoverable ? () => setHoveredCard(null) : undefined
                        }
                    >
                        {[
                            { key: 'bid', Card: BidPackageCard },
                            { key: 'l1', Card: L1EvaluationCard },
                            { key: 'compliance', Card: ComplianceCard },
                        ].map(({ key, Card }, i) => (
                            <RevealCard
                                key={key}
                                show={contentBeat >= 4}
                                delay={i * 0.18}
                                dataFlow={key}
                            >
                                {/* enter (processing) at beat 4, resolve at
                                    beat 5; `settled` (pipeline complete) lets
                                    the Bid card finish its last filling form. */}
                                <Card
                                    className="flex flex-col min-h-[130px]"
                                    resolved={contentBeat >= 5}
                                    settled={pillBeat > FINAL_BEAT}
                                />
                            </RevealCard>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/*
              Tilt only at lg+ — keeps the scene flat on mobile/tablet.
              rotate3d(1, -1, 0, 14deg): CSS uses Y-down, so axis (1,-1,0)
              puts TR/BL on the rotation axis (stationary), letting TL
              swing into the screen and BR push forward out of it.
              rotateZ(2deg) adds the slight clockwise twist.

              The content layer's translateZ only takes visual effect
              inside this preserve-3d context, so below lg both layers
              render flat and DOM order keeps cards above the window.
            */}
            <style>{`
                @media (min-width: 1024px) {
                    .hero-scene-perspective {
                        perspective: 1200px;
                        perspective-origin: 50% 50%;
                    }
                    .hero-scene-tilt {
                        /* Parallax rotations sit LEFTMOST (applied in the
                           parent/screen frame) so mouse steering reads
                           predictably on top of the base tilt. Vars default
                           to 0 → resting pose is exactly the base tilt. */
                        transform: rotateY(var(--par-ry, 0deg))
                            rotateX(var(--par-rx, 0deg))
                            rotate3d(1, -1, 0, 14deg) rotateZ(2deg) scale(0.95);
                        transform-style: preserve-3d;
                        transform-origin: 50% 50%;
                        will-change: transform;
                    }
                    .hero-content-layer {
                        /* Base pop = translateZ(48px). The corner warp
                           rotates on the SAME diagonal axis the scene
                           tilt uses (1,-1,0), so it's predictable in
                           screen space: TR + BL sit ON that axis and stay
                           put, while the sign of --content-warp tilts the
                           TL / BR pair. Parent tilts TL back (+angle);
                           a NEGATIVE angle here lifts the content-layer
                           TL corner forward (→ drifts up-left under the
                           perspective). Tune --content-warp to taste. */
                        --content-warp: -6deg;
                        /* --par-dx/dy: parallax counter-drift — the content
                           layer slides a few px with the cursor, amplifying
                           the layer separation the perspective already gives
                           its translateZ. Defaults 0 = settled pose. */
                        transform: translate3d(
                                var(--par-dx, 0px),
                                var(--par-dy, 0px),
                                48px
                            )
                            rotate3d(1, -1, 0, var(--content-warp));
                        transform-origin: 50% 50%;
                        will-change: transform;
                        /* Per-card hover lift uses a real translateZ — the
                           layer must preserve-3d for children's z to read
                           under the perspective (no filters here, which
                           would flatten it). */
                        transform-style: preserve-3d;
                    }
                }
            `}</style>
        </div>
        </div>
        </div>
        </MotionConfig>
    );
}
