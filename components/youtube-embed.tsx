"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTheme } from "next-themes";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  thumbnail?: string;
  thumbnailDark?: string;
}

export function YouTubeEmbed({
  videoId,
  title = "Video",
  className,
  thumbnail,
  thumbnailDark,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const thumbnailUrl = thumbnail
    ? isDark && thumbnailDark
      ? thumbnailDark
      : thumbnail
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={className}>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&vq=hd1080`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={() => setIsPlaying(true)}
        className="relative block w-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden"
        aria-label={`Play ${title}`}
        style={{ paddingBottom: "56.25%" }}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-all duration-300 ease-out">
              <Play
                className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1"
                fill="currentColor"
                strokeWidth={0}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm md:text-base font-medium drop-shadow-lg">
            Watch Demo
          </span>
        </div>
      </button>
    </div>
  );
}
