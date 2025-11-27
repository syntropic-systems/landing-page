import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                        <span>CG Website</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/product" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Product
                        </Link>
                        <Link href="/automations" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Automations
                        </Link>
                        <Link href="/solutions" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Solutions
                        </Link>
                        <Link href="/company" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Company
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/contact">
                        <Button variant="ghost">Contact</Button>
                    </Link>
                    <Button>Get Started</Button>
                </div>
            </div>
        </header>
    );
}
