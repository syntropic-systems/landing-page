'use client';

import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, FileType, FileCode, FileImage, Folder, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Deliberately spans file types (PDF · Excel · Word · text · image) to
// back the hero's "PDFs, Excels, and technical files" claim. Icon colors
// follow the file-type palette: PDF→destructive, Excel→success,
// docs/images→info, text/technical→caution.
const FILES = [
    { name: 'Tender_Document.pdf', size: '2.4 MB', type: 'PDF', icon: FileText, accent: 'text-destructive-foreground' },
    { name: 'BoQ_Schedule.xlsx', size: '1.2 MB', type: 'XLSX', icon: FileSpreadsheet, accent: 'text-success-foreground' },
    { name: 'Technical_Proposal.docx', size: '890 KB', type: 'DOCX', icon: FileType, accent: 'text-info-foreground' },
    { name: 'Corrigendum_Notice.txt', size: '48 KB', type: 'TXT', icon: FileCode, accent: 'text-caution-foreground' },
    { name: 'Signed_Certificates.jpg', size: '1.6 MB', type: 'JPG', icon: FileImage, accent: 'text-info-foreground' },
];

// File rows cascade in one after another once the card is revealed.
const LIST_VARIANTS = {
    hidden: {},
    show: { transition: { delayChildren: 0.35, staggerChildren: 0.11 } },
};
const ITEM_VARIANTS = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * `reveal` (beat ≥ 1) triggers the file rows to stagger in. The card
 * shell (border, title) is always rendered at full size so the empty
 * state reserves the same footprint — no reflow, flow-line anchors stay.
 */
export function SourceDocumentsCard({
    className,
    reveal = true,
    indexed = true,
}: {
    className?: string;
    reveal?: boolean;
    indexed?: boolean;
}) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-3.5 w-full sm:w-[210px]',
                className
            )}
        >
            <div className="flex items-center gap-2 mb-3">
                <Folder className="h-3.5 w-3.5 text-foreground/60" />
                <p className="text-[11px] font-semibold text-foreground">
                    Source Documents
                </p>
            </div>

            <motion.div
                className="space-y-1.5"
                variants={LIST_VARIANTS}
                initial="hidden"
                animate={reveal ? 'show' : 'hidden'}
            >
                {FILES.map((file, i) => {
                    const Icon = file.icon;
                    return (
                        <motion.div
                            key={file.name}
                            variants={ITEM_VARIANTS}
                            className="flex items-center gap-2 rounded-md border border-border/40 bg-background/50 px-2 py-1.5"
                        >
                            <div className="h-6 w-6 shrink-0 rounded bg-foreground/5 flex items-center justify-center">
                                <Icon className={cn('h-3 w-3', file.accent)} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-medium text-foreground truncate leading-tight">
                                    {file.name}
                                </p>
                                <p className="text-[9px] text-foreground/50 leading-tight mt-0.5">
                                    {file.size} · {file.type}
                                </p>
                            </div>
                            {/* Indexing → indexed status (CloudGlance).
                                Each file finishes on its own beat: the
                                check fades in staggered by row so they
                                complete one after another, not all at once. */}
                            <div className="relative shrink-0 h-3 w-3">
                                <Loader2
                                    className="absolute inset-0 h-3 w-3 text-primary/70 animate-spin transition-opacity duration-300"
                                    style={{
                                        opacity: indexed ? 0 : 1,
                                        transitionDelay: indexed ? `${i * 220}ms` : '0ms',
                                    }}
                                />
                                <motion.span
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={
                                        indexed
                                            ? { opacity: 1, scale: 1 }
                                            : { opacity: 0, scale: 0.6 }
                                    }
                                    transition={{ duration: 0.25, delay: indexed ? i * 0.22 : 0 }}
                                >
                                    <CheckCircle2 className="h-3 w-3 text-success-foreground" />
                                </motion.span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={reveal ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                    delay: reveal ? 0.35 + FILES.length * 0.11 + 0.1 : 0,
                    duration: 0.3,
                }}
                className="mt-2.5 w-full flex items-center justify-center gap-1 text-[10px] text-primary/85 font-medium py-1 rounded-md border border-dashed border-primary/30 bg-primary/5"
            >
                <Plus className="h-2.5 w-2.5" />
                Add more files
            </motion.div>
        </div>
    );
}
