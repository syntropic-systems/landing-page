'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  posterDark?: string;
  alt?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  lazy?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  posterDark,
  alt = 'Video',
  className,
  autoplay = false,
  loop = true,
  muted = true,
  controls = true,
  lazy = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(!lazy);
  const [showPoster, setShowPoster] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lazy load video when it comes into view
  React.useEffect(() => {
    if (!lazy || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isLoaded]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPoster(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(true);
  };

  const posterSrc = mounted && resolvedTheme === 'dark' && posterDark ? posterDark : poster;

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden rounded-xl', className)}
    >
      {/* Poster Image */}
      {showPoster && posterSrc && (
        <div className="absolute inset-0 z-10">
          <img
            src={posterSrc}
            alt={alt}
            className="w-full h-full object-cover"
          />
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs">
              <Button
                size="lg"
                className="rounded-xl h-12 w-12 p-0 bg-primary hover:bg-primary/90 hover:shadow-md"
                onClick={handlePlay}
                aria-label="Play video"
              >
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Video Element */}
      {isLoaded && (
        <video
          ref={videoRef}
          src={src}
          poster={posterSrc}
          className="w-full h-auto"
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          onEnded={handleVideoEnd}
          onPlay={() => {
            setIsPlaying(true);
            setShowPoster(false);
          }}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

