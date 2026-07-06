'use client';

import { cn } from '@/lib/utils';
import { SourceDocumentsCard } from '@/components/hero/v2/SourceDocumentsCard';
import { ExtractedIntelligenceCard } from '@/components/hero/v2/ExtractedIntelligenceCard';

/**
 * Static "shard" of the homepage hero scene for the Product hub hero:
 * the transformation pair — messy source documents in, structured
 * intelligence out — which is the product headline made visible. Both
 * are the real scene cards in their settled states (their defaults),
 * joined by the scene's dashed-connector language. Natural width
 * ≈ 210 + connector + 240px, so it fits every visual-column width
 * without scaling or truncation.
 */
export function IntelligenceShard({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            {/* Slight vertical stagger echoes the scene's diagonal layout —
                a still frame of a composition, not a diagram. */}
            <SourceDocumentsCard className="sm:translate-y-3" />
            <div
                aria-hidden="true"
                className="w-6 md:w-8 shrink-0 border-t border-dashed border-foreground/30"
            />
            <ExtractedIntelligenceCard className="sm:-translate-y-3" />
        </div>
    );
}
