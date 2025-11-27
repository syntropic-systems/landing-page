import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

interface PageHeaderButton {
    text: string;
    href: string;
    variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "destructive";
}

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
    button?: PageHeaderButton;
}

export function PageHeader({ title, description, className, button }: PageHeaderProps) {
    return (
        <Section
            className={cn("bg-gradient-to-b from-primary/20 to-transparent !pt-20 md:!pt-28 lg:!pt-32 !pb-0 [&>div>div>div]:!mb-0", className)}
            disableDefaultHeader
            header={
                <div className="space-y-4 !mb-0">
                    {button && (
                        <div>
                            <Button
                                variant={button.variant || "ghost"}
                                className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-wide"
                                asChild
                            >
                                <Link href={button.href}>
                                    <ArrowLeft className="h-3 w-3" />
                                    <span>{button.text}</span>
                                </Link>
                            </Button>
                        </div>
                    )}
                    <div className="space-y-3">
                        <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-xl text-muted-foreground max-w-3xl">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            }
        >
            {null}
        </Section>
    );
}
