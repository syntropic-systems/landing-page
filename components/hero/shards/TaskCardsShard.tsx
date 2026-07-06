'use client';

import { cn } from '@/lib/utils';
import { BidPackageCard } from '@/components/hero/v2/BidPackageCard';
import { L1EvaluationCard } from '@/components/hero/v2/L1EvaluationCard';
import { ComplianceCard } from '@/components/hero/v2/ComplianceCard';

/**
 * Static "shard" of the homepage hero scene for the Automations hub hero:
 * the scene's right stack — the three task cards in their settled states.
 * They map 1:1 to the page's automations (Bid Package Creation ↔ tender
 * bidding, L1 Bidder Evaluation ↔ tender evaluation, Compliance ↔ RFX /
 * contract review), so the hero previews exactly what the page details.
 * Gentle zigzag offsets echo the scene's cascade; fixed-width cards mean
 * no scaling or truncation at any column width.
 */
export function TaskCardsShard({ className }: { className?: string }) {
    return (
        <div className={cn('flex flex-col items-center space-y-3', className)}>
            <BidPackageCard className="sm:-translate-x-10" />
            <L1EvaluationCard className="sm:translate-x-10" />
            <ComplianceCard className="sm:-translate-x-10" />
        </div>
    );
}
