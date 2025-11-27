import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TabSectionProps {
    tabs: {
        value: string;
        label: string;
        title: string;
        highlights?: {
            subtitle: string;
            body: string;
        }[];
        image: string;
        imageAlt?: string;
    }[];
    defaultValue?: string;
    className?: string;
    tabsListClassName?: string;
    tabsTriggerClassName?: string;
    tabsContentClassName?: string;
}

export function TabSection({
    tabs,
    defaultValue,
    className,
    tabsListClassName,
    tabsTriggerClassName,
    tabsContentClassName,
}: TabSectionProps) {
    if (!tabs?.length) {
        return null;
    }

    const initialValue =
        defaultValue && tabs.some((tab) => tab.value === defaultValue)
            ? defaultValue
            : tabs[0].value;

    return (
        <div className={cn("w-full space-y-6", className)}>
            <Tabs defaultValue={initialValue} className="w-full">
                <TabsList
                    className={cn(
                        "flex flex-wrap gap-3 w-full justify-start bg-transparent p-0 h-auto text-muted-foreground",
                        tabsListClassName
                    )}
                >
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={cn(
                                "rounded-xl px-4 py-2 text-sm font-medium hover:text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
                                "transition-colors duration-200",
                                tabsTriggerClassName
                            )}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="mt-4">
                    {tabs.map((tab) => (
                        <TabsContent
                            key={tab.value}
                            value={tab.value}
                            className={cn("m-0", tabsContentClassName)}
                        >
                            <Card className="w-full p-6 border-border/60 shadow-md">
                                <div
                                    className={cn(
                                        "grid items-stretch md:grid-cols-2 md:gap-10"
                                    )}
                                >
                                    <div className="flex flex-col gap-3 py-8">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-8">
                                            {tab.title}
                                        </h3>
                                        {tab.highlights?.length ? (
                                            <div className="space-y-6">
                                                {tab.highlights.slice(0, 3).map((item, idx) => (
                                                    <div key={`${tab.value}-highlight-${idx}`}>
                                                        <p className="text-lg md:text-xl font-semibold text-foreground mb-1">
                                                            {item.subtitle}
                                                        </p>
                                                        <p className="text-sm md:text-base text-muted-foreground">
                                                            {item.body}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                                        <Image
                                            src={tab.image}
                                            alt={tab.imageAlt || tab.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    );
}

