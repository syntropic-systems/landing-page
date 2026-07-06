'use client';

import React from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/animations";

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
    /** Key in nav data to read tab value from (e.g. "tab") */
    navDataKey?: string;
    /** Only consume nav data if these key-value pairs match */
    navDataMatch?: Record<string, string>;
    className?: string;
    tabsListClassName?: string;
    tabsTriggerClassName?: string;
    tabsContentClassName?: string;
}

export function TabSection({
    tabs,
    defaultValue,
    navDataKey,
    navDataMatch,
    className,
    tabsListClassName,
    tabsTriggerClassName,
    tabsContentClassName,
}: TabSectionProps) {
    const matchesNavData = React.useCallback((data: Record<string, string> | null) => {
        if (!data || !navDataKey || !data[navDataKey]) return false;
        if (navDataMatch) {
            return Object.entries(navDataMatch).every(([k, v]) => data[k] === v);
        }
        // If no match criteria, accept if the key exists and no "section" field is present
        return true;
    }, [navDataKey, navDataMatch]);

    const initialValue = React.useMemo(() => {
        if (defaultValue && tabs?.some((tab) => tab.value === defaultValue)) {
            return defaultValue;
        }
        return tabs?.[0]?.value ?? "";
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [activeTab, setActiveTab] = React.useState(initialValue);
    const navDataConsumedRef = React.useRef(false);
    const contentRef = React.useRef(null);
    const contentInView = useInView(contentRef, { once: true, margin: "-60px" });

    // On mount, check sessionStorage for nav data
    React.useEffect(() => {
        if (!navDataKey || typeof sessionStorage === "undefined") return;
        const raw = sessionStorage.getItem("nav-data");
        if (!raw) return;
        try {
            const data = JSON.parse(raw) as Record<string, string>;
            if (matchesNavData(data) && tabs?.some((tab) => tab.value === data[navDataKey])) {
                sessionStorage.removeItem("nav-data");
                navDataConsumedRef.current = true;
                setActiveTab(data[navDataKey]);
            }
        } catch { /* ignore */ }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Listen for nav-data-updated events (same-page navigation)
    React.useEffect(() => {
        if (!navDataKey) return;
        const handleNavData = () => {
            const raw = sessionStorage.getItem("nav-data");
            if (!raw) return;
            try {
                const data = JSON.parse(raw) as Record<string, string>;
                if (matchesNavData(data) && tabs?.some((tab) => tab.value === data[navDataKey])) {
                    sessionStorage.removeItem("nav-data");
                    setActiveTab(data[navDataKey]);
                }
            } catch { /* ignore */ }
        };
        window.addEventListener("nav-data-updated", handleNavData);
        return () => window.removeEventListener("nav-data-updated", handleNavData);
    }, [navDataKey, navDataMatch, matchesNavData, tabs]);

    React.useEffect(() => {
        // Skip if nav data was just consumed on mount
        if (navDataConsumedRef.current) {
            navDataConsumedRef.current = false;
            return;
        }
        if (!tabs?.length) return;
        if (defaultValue && tabs.some((tab) => tab.value === defaultValue)) {
            setActiveTab(defaultValue);
        }
    }, [defaultValue, tabs]);

    if (!tabs?.length) {
        return null;
    }

    return (
        <div className={cn("w-full space-y-6", className)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <RevealOnScroll direction="up" duration={0.6}>
                    <TabsList
                        className={cn(
                            "flex flex-wrap gap-2 sm:gap-3 w-full justify-start bg-transparent border-0 p-0 h-auto text-muted-foreground",
                            tabsListClassName
                        )}
                    >
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    "rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
                                    "transition-colors duration-200",
                                    tabsTriggerClassName
                                )}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </RevealOnScroll>

                <div
                    ref={contentRef}
                    className={cn(
                        "mt-4 relative transition-all duration-500 ease-out",
                        contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: contentInView ? "0.4s" : "0s" }}
                >
                    <AnimatePresence mode="wait">
                        {tabs.filter((tab) => tab.value === activeTab).map((tab) => (
                            <motion.div
                                key={tab.value}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
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
                                                                <h4 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                                                                    {item.subtitle}
                                                                </h4>
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Tabs>
        </div>
    );
}

