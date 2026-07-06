'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatINR, SHOW_AI_CREDITS, type Plan } from '@/data/pricing';

interface PlanCardProps {
  plan: Plan;
  billing: 'annual' | 'monthly';
}

export function PlanCard({ plan, billing }: PlanCardProps) {
  const featured = Boolean(plan.recommended);

  return (
    <Card
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300',
        featured
          ? 'border-transparent bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground shadow-xl shadow-primary/25 lg:-mt-3 lg:mb-3'
          : 'border-border/70 bg-gradient-to-br from-accent/40 via-background to-background shadow-sm hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg'
      )}
    >
      {/* Decorative glow on featured card */}
      {featured && (
        <>
          {/* Top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/15 via-white/5 to-transparent"
          />
          {/* Highlight orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl"
          />
          {/* Bottom darkening for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/15 to-transparent"
          />
        </>
      )}

      <CardHeader className="relative space-y-3 pt-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary shadow-sm">
              <Sparkles className="h-3 w-3" />
              Recommended
            </span>
          )}
        </div>
        <p
          className={cn(
            'min-h-[3.5rem] text-sm leading-relaxed',
            featured ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}
        >
          {plan.tagline}
        </p>
      </CardHeader>

      <CardContent className="relative flex flex-1 flex-col gap-6">
        {/* Price block */}
        <div className="min-h-[5.5rem]">
          {plan.customPricing ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={billing}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 md:mt-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.customLabel ?? 'Custom Pricing'}
                  </span>
                  {billing === 'monthly' && (
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        featured
                          ? 'bg-primary-foreground/15 text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      Billed quarterly
                    </span>
                  )}
                </div>
                {plan.customNote && (
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    {plan.customNote}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={billing}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                  <span className="text-4xl font-semibold tracking-tight md:text-5xl">
                    ₹{formatINR(billing === 'annual' ? plan.annualMonthlyPrice! : plan.monthlyPrice!)}
                  </span>
                  <span
                    className={cn(
                      'text-base',
                      featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    /mo
                  </span>
                  {billing === 'annual' && plan.monthlyPrice && plan.annualMonthlyPrice && (
                    <span
                      className={cn(
                        'ml-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        featured
                          ? 'bg-primary-foreground/15 text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      Save {Math.floor((1 - plan.annualMonthlyPrice / plan.monthlyPrice) * 100)}%
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-1 text-sm',
                    featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}
                >
                  {billing === 'annual'
                    ? `Billed annually at ₹${formatINR(plan.annualTotal!)}/year`
                    : 'Billed monthly'}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Usage */}
        <div
          className={cn(
            'space-y-2 rounded-xl p-4',
            featured
              ? 'border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm'
              : 'border border-border/60 bg-accent/40'
          )}
        >
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            Usage
          </p>
          <ul className="space-y-1.5 text-sm">
            {plan.customUsage
              ? (billing === 'monthly' && plan.customUsageMonthly
                  ? plan.customUsageMonthly
                  : plan.customUsage
                )
                  .filter((item) => SHOW_AI_CREDITS || !item.includes('AI Task Credits'))
                  .map((item) => (
                    <li
                      key={item}
                      className={featured ? 'text-primary-foreground/95' : 'text-foreground/90'}
                    >
                      {item}
                    </li>
                  ))
              : (() => {
                  const usage = plan.usage![billing];
                  const cls = featured ? 'text-primary-foreground/95' : 'text-foreground/90';
                  return (
                    <>
                      <li className={cls}>{usage.projects}</li>
                      {SHOW_AI_CREDITS && <li className={cls}>{usage.credits}</li>}
                      <li className={cls}>{usage.users}</li>
                    </>
                  );
                })()}
          </ul>
        </div>

        {/* Includes */}
        <div className="space-y-3">
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {plan.includesHeading ?? 'Includes'}
          </p>
          <ul className="space-y-2.5">
            {plan.includes.map((entry) => {
              const isNested = typeof entry !== 'string';
              const label = isNested ? entry.item : entry;
              return (
                <li key={label} className="space-y-1.5">
                  <div className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        featured
                          ? 'bg-primary-foreground/15 text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span
                      className={cn(
                        'leading-relaxed',
                        featured ? 'text-primary-foreground/95' : 'text-foreground/90'
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {isNested && entry.subItems.length > 0 && (
                    <ul className="ml-6 space-y-1 border-l border-current/15 pl-3">
                      {entry.subItems.map((sub) => (
                        <li
                          key={sub}
                          className={cn(
                            'flex items-start gap-2 text-[13px] leading-relaxed',
                            featured ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'mt-2 h-1 w-1 shrink-0 rounded-full',
                              featured ? 'bg-primary-foreground/60' : 'bg-foreground/40'
                            )}
                          />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="relative pt-2">
        <Button
          asChild
          size="lg"
          className={cn(
            'w-full',
            featured
              ? 'bg-primary-foreground text-primary shadow-md hover:bg-primary-foreground/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          <Link href={plan.cta.href}>{plan.cta.text}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
