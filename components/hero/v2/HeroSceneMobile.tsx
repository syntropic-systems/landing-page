'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeAwareImage } from '@/components/theme-aware-image';
import { STAGES } from './PipelineStrip';
import { STATUS_BADGE, type PipelineStatus } from './AppWindow';
import { SourceDocumentsCard } from './SourceDocumentsCard';
import { ExtractedIntelligenceCard } from './ExtractedIntelligenceCard';
import { BidPackageCard } from './BidPackageCard';
import { L1EvaluationCard } from './L1EvaluationCard';
import { ComplianceCard } from './ComplianceCard';

const PROJECT_NAME = 'NHAI Highway Widening Bid';

// The 5 pipeline stages are 3 phases (= the 3 desktop columns). Each phase
// lights its pill(s) then shows its card — same grammar as desktop:
//   phase 0 → stage 1        → Source Documents
//   phase 1 → stages 2·3     → Extracted Intelligence
//   phase 2 → stages 4·5     → the result stack (Bid / L1 / Compliance)
const BEATS = [{ stages: [0] }, { stages: [1, 2] }, { stages: [3, 4] }];
const RESULTS = [BidPackageCard, L1EvaluationCard, ComplianceCard];
const DWELL = 3600; // ms each phase holds before the loop advances
const EMPTY_MS = 1200; // initial empty window (idle) before the run starts
const SETTLE_MS = 2600; // settled rest (Completed) before the loop wraps

/**
 * The full 5-stage pipeline in one row — all stages always visible as
 * COMPACT icon tiles (the idle state; desktop hides future steps, mobile
 * idles them), and the stage currently in work EXPANDS to the full pill
 * (label + sub slide open via max-width, solid-primary icon tile, glow).
 * The active state walks left→right through the row like the desktop strip.
 */
function PipelineRow({ activeStage }: { activeStage: number }) {
    return (
        <div className="flex items-center">
            {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const lit = i === activeStage;
                return (
                    <Fragment key={stage.label}>
                        {i > 0 && (
                            <div
                                className="flex-1 min-w-1 mx-1 border-t border-dashed border-foreground/30"
                                aria-hidden="true"
                            />
                        )}
                        <div
                            // min-w-0 is load-bearing: during the active
                            // handoff BOTH labels are briefly open (old
                            // closing, new opening) — without it the pills'
                            // implicit min-width:auto makes the row overflow
                            // the window edge; with it flex squeezes the
                            // labels (clipped by overflow-hidden) instead.
                            className={cn(
                                'relative isolate min-w-0 flex items-center p-1.5 rounded-lg border shadow-sm transition-all duration-300',
                                lit
                                    ? 'border-primary/30 shadow-md shadow-primary/10 delay-200'
                                    : 'border-border/50 bg-card/60'
                            )}
                        >
                            {/* Breathing glow + opaque cover (desktop pattern —
                                negative-z children paint above the parent bg,
                                so the cover stops the glow leaking inside).
                                Always mounted, opacity-toggled, so they fade
                                with the same delayed rhythm as the label. */}
                            <div
                                className={cn(
                                    'absolute -inset-1.5 -z-10 rounded-xl bg-primary/15 blur-md animate-pulse transition-opacity duration-300',
                                    lit ? 'opacity-100 delay-200' : 'opacity-0'
                                )}
                                aria-hidden="true"
                            />
                            <div
                                className={cn(
                                    'absolute inset-0 -z-[5] rounded-lg bg-card transition-opacity duration-300',
                                    lit ? 'opacity-100 delay-200' : 'opacity-0'
                                )}
                                aria-hidden="true"
                            >
                                <div className="absolute inset-0 rounded-lg bg-accent/20" />
                            </div>
                            <div
                                className={cn(
                                    'h-5 w-5 shrink-0 rounded flex items-center justify-center transition-colors duration-300',
                                    lit
                                        ? 'bg-primary text-primary-foreground shadow-sm delay-200'
                                        : 'bg-accent/50 text-accent-foreground'
                                )}
                            >
                                <Icon className="h-3 w-3" />
                            </div>
                            {/* Label block — slides open on the active stage.
                                max-width (not display) so the expansion is a
                                smooth width animation. The INCOMING side waits
                                (delay-200) while the outgoing closes first —
                                sequenced handoff, so the row width only moves
                                one way at a time (kills the tug-of-war jitter). */}
                            <div
                                className={cn(
                                    'min-w-0 overflow-hidden transition-all duration-300',
                                    lit
                                        ? 'max-w-[120px] ml-1.5 opacity-100 delay-200'
                                        : 'max-w-0 ml-0 opacity-0'
                                )}
                            >
                                <p className="text-[10px] font-semibold tracking-tight text-foreground whitespace-nowrap leading-tight">
                                    {stage.label}
                                </p>
                                <p className="text-[9px] text-foreground/70 whitespace-nowrap leading-tight mt-0.5">
                                    {stage.sub}
                                </p>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}

/** Flowing dashed strands at a card edge — the desktop flow lines, adapted
 *  to one-card-at-a-time: Source streams OUT the right, Intel both sides,
 *  Results streams IN from the left. Dashes always travel left→right (the
 *  pipeline direction); the mask fades each strand toward its outer end so
 *  it reads as flowing off toward / in from the neighbouring stage. */
function EdgeFlow({ side }: { side: 'left' | 'right' }) {
    const rows = [0.36, 0.5, 0.64];
    return (
        <div
            className={cn(
                'absolute inset-y-0 w-7 z-10 pointer-events-none text-primary/50',
                side === 'right' ? 'left-full' : 'right-full'
            )}
            aria-hidden="true"
        >
            {rows.map((r, i) => (
                <Fragment key={i}>
                    <div
                        className="absolute h-[1.5px] w-full mobile-flow"
                        style={{
                            top: `${r * 100}%`,
                            WebkitMaskImage: `linear-gradient(to ${side}, #000 15%, transparent)`,
                            maskImage: `linear-gradient(to ${side}, #000 15%, transparent)`,
                        }}
                    />
                    {/* Endpoint node at the card-edge end of the strand —
                        the desktop FlowLines' r=2 dots (h-1 w-1, opacity-70).
                        Offset centers the 4px dot on the 1.5px strand. */}
                    <div
                        className={cn(
                            'absolute h-1 w-1 rounded-full bg-current opacity-70',
                            side === 'right'
                                ? 'left-0 -translate-x-1/2'
                                : 'right-0 translate-x-1/2'
                        )}
                        style={{ top: `calc(${r * 100}% - 1.25px)` }}
                    />
                </Fragment>
            ))}
        </div>
    );
}

/** The card(s) for a phase. Phase 2 fans the three result cards so all three
 *  titles peek while the front (Compliance) shows its content. */
function BeatCard({
    index,
    structureUp,
    resolved,
    settled,
}: {
    index: number;
    structureUp: boolean;
    resolved: boolean;
    settled: boolean;
}) {
    if (index === 0)
        return <SourceDocumentsCard reveal={structureUp} indexed={resolved} />;
    if (index === 1)
        return (
            <ExtractedIntelligenceCard
                showStructure={structureUp}
                showValues={resolved}
            />
        );
    return (
        // The fan SPANS the slot height (set by the tallest phase — the
        // Intel card): first card pinned top, last pinned bottom, middle
        // centered. The overlap derives from the container height instead
        // of a fixed peek, so there's no dead band under the fan. All
        // children are absolute (the fan contributes no height of its own —
        // the slot stays owned by the other phases).
        <div className="relative h-full">
            {RESULTS.map((Card, idx) => (
                <div
                    key={idx}
                    // Desktop order top-to-bottom, but REVERSED in depth:
                    // Compliance (3rd) top + most behind, L1 centered,
                    // Bid (1st) bottom + in FRONT showing full content.
                    // Positioning stays on THIS div — the inner motion.div
                    // writes inline transform, which would clobber the
                    // -translate-y-1/2 class if they shared an element.
                    className={cn(
                        'absolute inset-x-0',
                        idx === 0 && 'bottom-0',
                        idx === 1 && 'top-1/2 -translate-y-1/2',
                        idx === 2 && 'top-0'
                    )}
                    style={{ zIndex: RESULTS.length - 1 - idx }}
                >
                    {/* Staggered entrance BACK→FRONT (Compliance → L1 →
                        Bid), desktop's i*0.18 right-column stagger with the
                        same spring. Opaque backing + separation shadow live
                        here so nothing shows before the card arrives. */}
                    <motion.div
                        className={cn(
                            'rounded-xl bg-background',
                            idx < 2 &&
                                'shadow-[0_-10px_24px_-6px_rgb(0_0_0/0.25)] dark:shadow-[0_-10px_24px_-6px_rgb(0_0_0/0.6)]'
                        )}
                        initial={false}
                        animate={
                            structureUp
                                ? { opacity: 1, scale: 1, y: 0 }
                                : { opacity: 0, scale: 0.9, y: 14 }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 17,
                            mass: 0.8,
                            delay: structureUp
                                ? 0.3 + (RESULTS.length - 1 - idx) * 0.18
                                : 0,
                        }}
                    >
                        {/* `settled` is its own step (desktop: settle happens
                            when the pill goes idle, AFTER resolve) — this is
                            when the Bid card's Filling… form flips to Filled. */}
                        <Card resolved={resolved} settled={settled} />
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

/**
 * Mobile hero scene (< sm). The desktop exploded scene shrinks to ~0.4×
 * (unreadable) on a phone, so below sm we swap to this: the app-window
 * chrome over a single slot that shows ONE phase at a time and loops.
 * Keeps the desktop identity cues — window chrome + lifecycle status badge,
 * the bottom fade-mask, the flow lines (now at the card edges), and the
 * pill-then-card stepping. Reduced motion: no loop, settled.
 */
export function HeroSceneMobile({ className }: { className?: string }) {
    const reduced = useReducedMotion();
    // Cycle step, mirroring the desktop lifecycle:
    //   -1  = EMPTY — window idle, all pills compact, no card, no badge
    //         (desktop's empty entrance before the run starts)
    //   0–2 = the three phases (pill steps + card)
    //   3   = SETTLED rest — validation pill reverts to idle, badge flips
    //         to Completed, the Bid card finishes Filling→Filled, and the
    //         scene RESTS before wrapping back to empty ("a new run").
    const [step, setStep] = useState(-1);
    // Within a phase the pills light ONE AT A TIME, like the desktop steps.
    // activePill = index of the currently-lit pill in this phase's stages
    // (-1 = none yet). The card's values resolve as the LAST pill lights.
    const [activePill, setActivePill] = useState(-1);
    const [resolveValues, setResolveValues] = useState(false);

    // Advance the cycle: empty (brief) → phases → settled (rest) → empty.
    useEffect(() => {
        if (reduced) {
            setStep(3); // rest on the settled, completed scene
            return;
        }
        const dur = step === -1 ? EMPTY_MS : step === 3 ? SETTLE_MS : DWELL;
        const t = setTimeout(() => setStep((s) => (s >= 3 ? -1 : s + 1)), dur);
        return () => clearTimeout(t);
    }, [step, reduced]);

    // Replay each phase's step sequence: pill(s) idle → 1st pill lights
    // (card structure appears) → last pill lights, the previous one idles
    // (card values resolve). Only one pill active at a time. Outside the
    // phases (empty/settled) no pill is active — desktop's settle state is
    // exactly "all pills visible, none active".
    useEffect(() => {
        if (reduced || step < 0 || step > 2) {
            setActivePill(-1);
            setResolveValues(false);
            return;
        }
        const n = BEATS[step].stages.length;
        setActivePill(-1);
        setResolveValues(false);
        const t1 = setTimeout(() => setActivePill(0), 300);
        const t2 = setTimeout(() => setActivePill(n - 1), 1500);
        const t3 = setTimeout(() => setResolveValues(true), 1700);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [step, reduced]);

    // Which phase's card occupies the slot — the results fan STAYS through
    // the settled rest — and the settled flag itself.
    const phase = step >= 0 && step <= 2 ? step : step === 3 ? 2 : -1;
    const settled = step === 3;

    // Header badge — the same lifecycle as the desktop window: hidden while
    // idle (empty) → Initializing (Source building) → Running → Completed
    // only at the SETTLE (like desktop: pillBeat > FINAL_BEAT), not while
    // Validation is still lit.
    const status: PipelineStatus =
        step === -1
            ? 'idle'
            : settled
              ? 'complete'
              : step === 0 && !resolveValues
                ? 'initializing'
                : 'running';
    const badge = status === 'idle' ? null : STATUS_BADGE[status];

    return (
        <div
            className={cn('w-full max-w-[420px] mx-auto select-none', className)}
            aria-hidden="true"
        >
            <div
                className="rounded-2xl border border-border/60 bg-card/55 dark:bg-card/40 backdrop-blur-sm shadow-xl shadow-primary/5 overflow-hidden"
                // Bottom fade-mask — the window's lower edge melts into the
                // page (the desktop "screenshot melts in" cue). The body has
                // extra pb so the fade lands on empty space, not the card.
                style={{
                    WebkitMaskImage:
                        'linear-gradient(to bottom, #000 84%, transparent 100%)',
                    maskImage:
                        'linear-gradient(to bottom, #000 84%, transparent 100%)',
                }}
            >
                {/* Window chrome — logo mark + project title + lifecycle badge + bell */}
                <div className="flex items-center justify-between gap-2 h-10 px-3 border-b border-border/50">
                    <div className="flex items-center gap-2 min-w-0">
                        <ThemeAwareImage
                            src="/logo light_sm.svg"
                            srcDark="/logo dark_sm.svg"
                            alt=""
                            width={101}
                            height={101}
                            className="h-5 w-5 shrink-0"
                            draggable={false}
                        />
                        {/* leading-tight, NOT leading-none — truncate's
                            overflow-hidden clips descenders (g/y tails) at
                            line-height 1. */}
                        <p className="text-[12px] font-semibold text-foreground leading-tight truncate">
                            {PROJECT_NAME}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <AnimatePresence mode="wait" initial={false}>
                            {badge && (
                                <motion.div
                                    key={status}
                                    initial={{ opacity: 0, y: -3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 3 }}
                                    transition={{ duration: 0.25 }}
                                    className={cn(
                                        'flex items-center gap-1.5 px-2 py-1 rounded-md border',
                                        badge.pill
                                    )}
                                >
                                    <badge.icon className={cn('h-3 w-3', badge.iconClass)} />
                                    <span className={cn('text-[10px] font-medium', badge.text)}>
                                        {badge.label}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Bell className="h-3.5 w-3.5 text-foreground/45" />
                    </div>
                </div>

                {/* Body — pill carousel + card slot. Extra pb-8 gives the
                    bottom fade empty space to land on. */}
                <div className="px-4 pt-3 pb-8">
                    {/* Pipeline — all 5 stages always in the row (compact,
                        idle); the stage in work expands to the full pill.
                        The active state walks the row like the desktop strip. */}
                    <PipelineRow
                        activeStage={
                            step >= 0 && step <= 2 && activePill >= 0
                                ? BEATS[step].stages[activePill]
                                : -1
                        }
                    />

                    {/* Card slot — all phases stacked in one grid cell (equal
                        height = tallest phase). The active card pops in a beat
                        AFTER the pill leads, flashes an arrival ring, then runs
                        its internal reveal. Edge flow lines carry the pipeline
                        direction into/out of the card. */}
                    <div className="grid grid-cols-1 mt-3">
                        {BEATS.map((_, i) => {
                            const active = phase === i;
                            return (
                                <motion.div
                                    key={i}
                                    style={{ gridArea: '1 / 1' }}
                                    className="relative min-w-0"
                                    initial={false}
                                    // Desktop CARD_ENTER spring (260/17/0.8,
                                    // scale 0.9 → overshoot pop). delay 0.55:
                                    // the pill finishes lighting (~0.3s state
                                    // + 0.2s handoff delay) BEFORE the card
                                    // arrives — stage lights, content responds
                                    // (desktop's CONTENT_OFFSET grammar).
                                    // The fan phase (i=2) only fades here —
                                    // its three cards spring individually.
                                    animate={
                                        active
                                            ? { opacity: 1, scale: 1, y: 0 }
                                            : i === 2
                                              ? { opacity: 0, scale: 1, y: 0 }
                                              : { opacity: 0, scale: 0.9, y: 14 }
                                    }
                                    transition={
                                        active
                                            ? i === 2
                                                ? { duration: 0.25, delay: 0.3 }
                                                : {
                                                      type: 'spring',
                                                      stiffness: 260,
                                                      damping: 17,
                                                      mass: 0.8,
                                                      delay: 0.55,
                                                  }
                                            : { duration: 0.3, ease: 'easeInOut' }
                                    }
                                    aria-hidden={!active}
                                >
                                    {/* Tight wrapper hugging the card's real
                                        bounds — the grid cell stretches to the
                                        slot height (tallest phase), so the ring
                                        and edge flows must anchor HERE, not on
                                        the cell, or they'd span the empty band
                                        below shorter cards. The fan phase DOES
                                        span the slot (h-full) — its cards
                                        distribute across the full height. */}
                                    <div className={cn('relative', i === 2 && 'h-full')}>
                                        {/* Edge flow: Source→right, Intel→both,
                                            Results→left */}
                                        {i !== 2 && <EdgeFlow side="right" />}
                                        {i !== 0 && <EdgeFlow side="left" />}

                                        {/* Inactive cards HOLD their final
                                            (resolved) look — so a card fades
                                            OUT showing its last frame, never
                                            flashing back to skeletons. The
                                            reset to initial state happens at
                                            re-activation, while the card is
                                            still invisible (activePill is -1
                                            for the first 300ms). */}
                                        <BeatCard
                                            index={i}
                                            structureUp={
                                                !active || activePill >= 0 || settled
                                            }
                                            resolved={
                                                !active || resolveValues || settled
                                            }
                                            settled={!active || settled}
                                        />

                                        {/* Arrival ring flash — keyed per phase;
                                            unmounts at empty so it replays fresh
                                            each cycle (but NOT again at settle,
                                            since phase stays on the fan). */}
                                        {active && (
                                            <motion.span
                                                key={`ring-${i}`}
                                                aria-hidden="true"
                                                className="absolute inset-0 rounded-xl ring-2 ring-primary/10 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{
                                                    duration: 0.7,
                                                    // card delay + 0.08 (desktop);
                                                    // the fan rings after its LAST
                                                    // card (Bid) lands.
                                                    delay: i === 2 ? 1.1 : 0.63,
                                                    times: [0, 0.3, 1],
                                                }}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Flowing dashed line — a repeating gradient scrolled left→right,
                so the card edge flows travel in the pipeline direction. */}
            <style>{`
                .mobile-flow {
                    background-image: repeating-linear-gradient(
                        to right, currentColor 0 5px, transparent 5px 12px
                    );
                    background-size: 12px 100%;
                    background-repeat: repeat-x;
                    animation: mobile-flow-dash 1.1s linear infinite;
                }
                @keyframes mobile-flow-dash {
                    to { background-position: 12px 0; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .mobile-flow { animation: none; }
                }
            `}</style>
        </div>
    );
}
