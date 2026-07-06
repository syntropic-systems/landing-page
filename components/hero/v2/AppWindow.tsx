'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Home,
    Target,
    Folder,
    FileSearch,
    Search,
    Bell,
    Activity,
    Play,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeAwareImage } from '@/components/theme-aware-image';

// Real CloudGlance nav (Projects view active). Target = Projects.
const RAIL_ICONS = [
    { icon: Home, active: false }, // Dashboard
    { icon: Target, active: true }, // Projects (active)
    { icon: Folder, active: false }, // File Manager
    { icon: FileSearch, active: false }, // Tender Search
    { icon: Search, active: false }, // Search
];

// The project this screen is viewing — reads as a real tender project.
const PROJECT_NAME = 'NHAI Highway Widening Bid';

export type PipelineStatus = 'idle' | 'initializing' | 'running' | 'complete';

// Header status badge per pipeline lifecycle stage.
export const STATUS_BADGE: Record<
    Exclude<PipelineStatus, 'idle'>,
    { icon: typeof Activity; iconClass: string; pill: string; text: string; label: string }
> = {
    initializing: {
        icon: Loader2,
        iconClass: 'text-primary animate-spin',
        pill: 'bg-primary/10 border-primary/20',
        text: 'text-primary',
        label: 'Initializing',
    },
    running: {
        icon: Activity,
        iconClass: 'text-success-foreground animate-pulse',
        pill: 'bg-success/40 border-success-foreground/20',
        text: 'text-success-foreground',
        label: 'Running',
    },
    complete: {
        icon: CheckCircle2,
        iconClass: 'text-success-foreground',
        pill: 'bg-success/40 border-success-foreground/20',
        text: 'text-success-foreground',
        label: 'Completed',
    },
};

/**
 * Back "UI layer" of the hero scene — an app-window shell borrowing the
 * real CloudGlance chrome (logo mark atop the icon rail, avatar chip
 * pinned bottom, solid-primary active tile, title-left/actions-right
 * page header). Framed as a real tender PROJECT view — Projects nav
 * active in the rail, a "Projects › [project name]" breadcrumb header —
 * so it reads as project management, not an invented page. The pipeline
 * renders on top of the empty body via the scene's in-flow padding, not
 * as a child here.
 */
export function AppWindow({
    className,
    status = 'running',
}: {
    className?: string;
    status?: PipelineStatus;
}) {
    const badge = status === 'idle' ? null : STATUS_BADGE[status];
    return (
        <div
            className={cn(
                'rounded-2xl border border-border/60 bg-card/55 dark:bg-card/40 backdrop-blur-sm shadow-xl shadow-primary/5 overflow-hidden',
                className
            )}
            // Fade the window's empty bottom into the page (premium
            // "screenshot melts into the page" look). The front cards are
            // a separate layer, so they stay crisp — sharpening the
            // two-layer depth. Tune the 68%/100% stops to taste.
            style={{
                WebkitMaskImage:
                    'linear-gradient(to bottom, #000 68%, transparent 100%)',
                maskImage:
                    'linear-gradient(to bottom, #000 68%, transparent 100%)',
            }}
        >
            <div className="flex h-full">
                {/* Icon rail — logo mark top, nav icons, avatar pinned bottom */}
                <div className="w-12 shrink-0 border-r border-border/50 bg-muted/30 flex flex-col items-center gap-1.5 py-2.5">
                    <ThemeAwareImage
                        src="/logo light_sm.svg"
                        srcDark="/logo dark_sm.svg"
                        alt=""
                        width={101}
                        height={101}
                        className="h-6 w-6 mb-2"
                        draggable={false}
                    />
                    {RAIL_ICONS.map(({ icon: Icon, active }, i) => (
                        <div
                            key={i}
                            className={cn(
                                'h-7 w-7 rounded-md flex items-center justify-center',
                                active
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-foreground/45'
                            )}
                        >
                            <Icon className="h-3.5 w-3.5" />
                        </div>
                    ))}
                    <div className="mt-auto h-7 w-7 rounded-md bg-foreground/5 border border-border/40 flex items-center justify-center">
                        <span className="text-[8px] font-medium text-foreground/45">
                            AM
                        </span>
                    </div>
                </div>

                {/* Main area: page header + empty body */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="h-10 shrink-0 flex items-center justify-between gap-2 px-4 border-b border-border/50">
                        {/* Project name — the active Projects rail icon
                            already gives the "this is a project" context */}
                        {/* leading-tight, NOT leading-none — truncate's
                            overflow-hidden clips descenders (g/y tails) at
                            line-height 1. */}
                        <p className="text-[12px] font-semibold text-foreground leading-tight truncate min-w-0">
                            {PROJECT_NAME}
                        </p>
                        <div className="flex items-center gap-1.5">
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
                            <div className="flex items-center gap-1 px-2 py-1 rounded-md border border-border/60 bg-background/60 text-[10px] font-medium text-foreground/75">
                                <Play className="h-2.5 w-2.5" />
                                View Runs
                            </div>
                            <Bell className="h-3.5 w-3.5 text-foreground/45" />
                        </div>
                    </div>
                    <div className="flex-1" />
                </div>
            </div>
        </div>
    );
}
