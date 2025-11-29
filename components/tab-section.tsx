'use client';

import React from "react";
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

    const [activeTab, setActiveTab] = React.useState(initialValue);

    React.useEffect(() => {
        if (defaultValue && tabs.some((tab) => tab.value === defaultValue)) {
            setActiveTab(defaultValue);
        } else {
            setActiveTab(tabs[0].value);
        }
    }, [defaultValue, tabs]);

    return (
        <div className={cn("w-full space-y-6", className)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                                        "grid items-start gap-6 lg:grid-cols-2 lg:gap-10"
                                    )}
                                >
                                    <div className="flex flex-col gap-3 pt-2">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-2">
                                            {tab.title}
                                        </h3>
                                        {tab.highlights?.length ? (
                                            <div className="space-y-6">
                                                {tab.highlights.slice(0, 3).map((item, idx) => {
                                                    // Parse body to handle bullet points
                                                    const parseBody = (body: string) => {
                                                        const normalized = body.replace(/\r\n/g, '\n');
                                                        const lines = normalized.split('\n').filter(line => line.trim() !== '');
                                                        
                                                        const hasBullets = lines.some(line => line.trim().startsWith('-'));
                                                        
                                                        if (hasBullets) {
                                                            return (
                                                                <ul className="list-disc list-outside space-y-2 my-2 ml-5 pl-2">
                                                                    {lines.map((line, lineIdx) => {
                                                                        const trimmedLine = line.trim();
                                                                        if (trimmedLine.startsWith('-')) {
                                                                            const bulletText = trimmedLine.substring(1).trim();
                                                                            return (
                                                                                <li key={lineIdx} className="text-sm md:text-base text-muted-foreground">
                                                                                    {bulletText}
                                                                                </li>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    })}
                                                                </ul>
                                                            );
                                                        }
                                                        
                                                        return (
                                                            <p className="text-sm md:text-base text-muted-foreground">
                                                                {body}
                                                            </p>
                                                        );
                                                    };
                                                    
                                                    return (
                                                        <div key={`${tab.value}-highlight-${idx}`}>
                                                            <p className="text-lg md:text-xl font-semibold text-foreground mb-1">
                                                                {item.subtitle}
                                                            </p>
                                                            {parseBody(item.body)}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
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

