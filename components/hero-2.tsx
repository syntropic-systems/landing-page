interface Hero2Props {
    title: string;
    description?: string;
}

export function Hero2({
    title,
    description,
}: Hero2Props) {
    return (
        <section className="relative h-[100vh] flex items-center mb-20 md:mb-28 lg:mb-32 overflow-hidden rounded-b-3xl shadow-primary/30 shadow-2xl bg-gradient-to-b from-primary/50 via-background to-card">
            <div className="container relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl text-left space-y-6 lg:space-y-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg md:text-xl text-foreground/70">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


