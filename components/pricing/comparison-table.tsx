import { Check, Minus } from 'lucide-react';
import { Section } from '@/components/section';
import { Card } from '@/components/ui/card';
import { RevealOnScroll } from '@/components/animations';
import { cn } from '@/lib/utils';
import { comparisonRows, plans, SHOW_AI_CREDITS, type ComparisonValue } from '@/data/pricing';

const visibleRows = SHOW_AI_CREDITS
  ? comparisonRows
  : comparisonRows.filter((row) => row.feature !== 'AI Task Credits');

function CellValue({ value, highlight = false }: { value: ComparisonValue; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check
        className={cn('mx-auto h-4 w-4', highlight ? 'text-primary' : 'text-foreground/70')}
        aria-label="Included"
      />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="Not included" />
    );
  }
  return (
    <span
      className={cn('text-sm', highlight ? 'text-primary font-medium' : 'text-foreground/85')}
    >
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <Section
      id="compare"
      title={
        <>
          Compare <span className="text-primary">Plans</span>
        </>
      }
      description="Find the right plan for your team by comparing capabilities side by side."
      titleAlign="center"
      className="bg-muted"
    >
      <RevealOnScroll direction="up" duration={0.6}>
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-card">
                <tr className="border-b border-border/70">
                  <th
                    scope="col"
                    className="w-[34%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={cn(
                        'px-5 py-4 text-center text-sm font-semibold',
                        plan.recommended ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{plan.name}</span>
                        {plan.recommended && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                            Recommended
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      'border-b border-border/50 last:border-b-0',
                      idx % 2 === 1 ? 'bg-muted/40' : 'bg-card'
                    )}
                  >
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-sm font-medium text-foreground/90"
                    >
                      {row.feature}
                    </th>
                    <td className="px-5 py-3.5 text-center align-middle">
                      <CellValue value={row.base} />
                    </td>
                    <td
                      className={cn(
                        'px-5 py-3.5 text-center align-middle',
                        'bg-primary/[0.04]'
                      )}
                    >
                      <CellValue value={row.professional} highlight />
                    </td>
                    <td className="px-5 py-3.5 text-center align-middle">
                      <CellValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </RevealOnScroll>
    </Section>
  );
}
