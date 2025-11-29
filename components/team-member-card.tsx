import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
    image: string;
    name: string;
    position: string;
    description: string;
    className?: string;
}

export function TeamMemberCard({
    image,
    name,
    position,
    description,
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
                <h3 className="text-2xl font-semibold text-foreground mb-1">{name}</h3>
                <p className="text-lg text-primary font-medium mb-3">{position}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </Card>
    );
}

