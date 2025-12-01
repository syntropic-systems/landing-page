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
            <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
                    {linkedin && (
                        <Link
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${name}'s LinkedIn profile`}
                        >
                            <Linkedin className="h-5 w-5" style={{ fill: 'currentColor', stroke: 'none' }} />
                        </Link>
                    )}
                </div>
                <p className="text-lg text-primary font-medium mb-3">{position}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </Card>
    );
}

