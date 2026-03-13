import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
    image: string;
    name: string;
    position: string;
    description: string;
    linkedin?: string;
    className?: string;
}

export function TeamMemberCard({
    image,
    name,
    position,
    description,
    linkedin,
    className,
}: TeamMemberCardProps) {
    return (
        <Card className={cn("overflow-hidden border-border/60 shadow-md hover:shadow-lg transition-shadow", className)}>
            <div className="relative w-full aspect-square overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="p-3 sm:p-6">
                <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <h3 className="text-sm sm:text-2xl font-semibold text-foreground truncate min-w-0">{name}</h3>
                    {linkedin && (
                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors shrink-0 ml-1"
                            aria-label={`${name}'s LinkedIn profile`}
                        >
                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" style={{ fill: 'currentColor', stroke: 'none' }} />
                        </Link>
                    )}
                </div>
                <p className="text-xs sm:text-lg text-primary font-medium mb-1 sm:mb-3">{position}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{description}</p>
            </div>
        </Card>
    );
}

