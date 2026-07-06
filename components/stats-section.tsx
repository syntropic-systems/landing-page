import { ReactNode } from 'react';
import { Section } from '@/components/section';
import { CountUp, StaggerChildren, StaggerItem } from '@/components/animations';

interface Stat {
    target: number;
    suffix?: string;
    decimals?: number;
    label: string;
    description: string;
}

// The canonical impact numbers — shared by every page that renders this
// section (home, automations hub). Update copy here, not per-page.
const DEFAULT_STATS: Stat[] = [
    {
        target: 80,
        suffix: '%',
        label: 'Faster Response Time',
        description:
            'AI reads and understands documents, organizing required information instantly & solving review, preparation and analysis faster.',
    },
    {
        target: 3,
        suffix: 'x',
        label: 'More Opportunities',
        description:
            'With AI handling time-consuming and repetitive manual processes, teams can take on more projects without extra hiring or burnout.',
    },
    {
        target: 99.7,
        suffix: '%',
        decimals: 1,
        label: 'Accuracy',
        description:
            'AI detects every requirement, clause and attachment, even those buried in fine print, with the same consistency, so nothing gets missed.',
    },
];

interface StatsSectionProps {
    title?: ReactNode;
    description?: string;
    stats?: Stat[];
}

// The one three-number stats section for the whole site — was duplicated
// inline on home + automations; shell, type tiers, and stagger live here.
export function StatsSection({
    title = (
        <>
            What Changes with <span className="text-primary">CloudGlance</span>
        </>
    ),
    description = 'Teams use CloudGlance to move faster, reduce risk and deliver more with the same resources.',
    stats = DEFAULT_STATS,
}: StatsSectionProps) {
    return (
        <Section title={title} description={description}>
            <StaggerChildren
                className="grid md:grid-cols-3 gap-12 text-center mx-auto pt-8"
                stagger={0.15}
            >
                {stats.map((stat) => (
                    <StaggerItem key={stat.label}>
                        {/* Display tier = h1 ladder + 2 steps (48→60→72px):
                            stat numerals may exceed the h1 ceiling, but they
                            scale in proportion. tabular-nums keeps digit
                            widths fixed so the CountUp doesn't wobble. */}
                        <div className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight tabular-nums text-primary mb-4">
                            <CountUp
                                target={stat.target}
                                suffix={stat.suffix}
                                decimals={stat.decimals}
                            />
                        </div>
                        <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground pb-2">
                            {stat.label}
                        </h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {stat.description}
                        </p>
                    </StaggerItem>
                ))}
            </StaggerChildren>
        </Section>
    );
}
