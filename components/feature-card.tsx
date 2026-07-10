import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon?: ReactNode;
    title?: string;
    description?: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-accent/40 to-card text-card-foreground shadow-sm h-full">
            <div className="flex flex-col p-6 gap-3">
                {icon && <div className="mb-2 mx-auto flex items-center justify-center [&>svg]:w-16 [&>svg]:h-16">{icon}</div>}
                {title && (
                    <h4 className="text-xl md:text-2xl font-semibold tracking-tight md:leading-snug text-center">
                        {title}
                    </h4>
                )}
                {description && (
                    <p
                        className={cn(
                            "text-base text-muted-foreground leading-relaxed text-center",
                            title ? "mt-1" : "mt-0"
                        )}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

interface FeatureGridProps {
    children: ReactNode;
    columns?: 1 | 2 | 3 | 4;
}

export function FeatureGrid({ children, columns = 3 }: FeatureGridProps) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4`}>
            {children}
        </div>
    );
}
