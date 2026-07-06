'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Renders the real value at all times so it reserves its exact box
 * (width AND height) — the value is just invisible until `show`, with a
 * pulsing skeleton laid over the reserved box while loading. This means
 * the skeleton→value swap causes ZERO reflow, so card heights never jump
 * as the extraction "resolves".
 *
 * `className` should carry the value's text sizing (e.g. text-[11px]
 * font-semibold …) — the skeleton height is em-relative so it matches.
 */
export function ValueSwap({
    show,
    className,
    children,
}: {
    show: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <span className={cn('relative inline-flex items-center', className)}>
            <motion.span
                initial={false}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 2 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.span>
            {!show && (
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[0.7em] rounded bg-foreground/15 animate-pulse" />
            )}
        </span>
    );
}
