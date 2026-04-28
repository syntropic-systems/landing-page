import { Plus, Sparkles } from 'lucide-react';
import { Section } from '@/components/section';
import { Card } from '@/components/ui/card';
import { RevealOnScroll, StaggerChildren, StaggerItem } from '@/components/animations';
import { addonGroups, plans, SHOW_AI_CREDITS } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function AddonsSection() {
  return (
    <Section
      id="addons"
      title={
        <>
          Add-ons that <span className="text-primary">Scale</span> with Your Team
        </>
      }
      description="CloudGlance plans can be extended based on your tender volume, team size, workflow depth, and deployment requirements."
      titleAlign="center"
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {addonGroups.map((group, index) => {
          const plan = plans[index];
          const featured = Boolean(plan?.recommended);
          return (
            <RevealOnScroll
              key={group.heading}
              direction="up"
              delay={0.1 + index * 0.1}
              duration={0.6}
              className="h-full"
            >
              <Card
                className={cn(
                  'flex h-full flex-col gap-6 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                  featured
                    ? 'border-primary/40 bg-gradient-to-br from-primary/5 via-accent/30 to-background hover:border-primary/60'
                    : 'border-border/70 bg-gradient-to-br from-accent/30 to-background hover:border-primary/40'
                )}
              >
                {/* Plan tag */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
                      featured
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'border border-border/70 bg-card text-foreground/80'
                    )}
                  >
                    {plan?.name ?? 'Plan'}
                  </span>
                  {featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      <Sparkles className="h-3 w-3" />
                      Recommended
                    </span>
                  )}
                </div>

                {/* Heading + description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">{group.heading}</h3>
                  {group.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  )}
                </div>

                {/* Sections */}
                <StaggerChildren className="flex flex-1 flex-col" stagger={0.08}>
                  {group.sections.map((section, sIdx) => (
                    <StaggerItem key={section.title}>
                      <div
                        className={cn(
                          'space-y-2.5',
                          sIdx > 0 && 'mt-5 border-t border-border/50 pt-5'
                        )}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {section.title}
                        </p>
                        <ul className="space-y-2">
                          {section.items
                            .filter(
                              (item) =>
                                SHOW_AI_CREDITS || !item.includes('AI Task Credits')
                            )
                            .map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-foreground/90"
                              >
                                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <Plus className="h-3 w-3" strokeWidth={3} />
                                </span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>

                {/* Note */}
                {group.note && (
                  <p className="rounded-lg border border-border/60 bg-card px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {group.note}
                  </p>
                )}
              </Card>
            </RevealOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
