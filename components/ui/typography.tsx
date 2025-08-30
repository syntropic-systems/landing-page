import * as React from "react";
import { cn } from "@/lib/utils";

type HProps = React.HTMLAttributes<HTMLHeadingElement>;

export const H1 = React.forwardRef<HTMLHeadingElement, HProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "relative overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
);

export const H2 = React.forwardRef<HTMLHeadingElement, HProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-foreground text-center leading-tight relative font-serif overflow-hidden text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);

export const H3 = React.forwardRef<HTMLHeadingElement, HProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "relative text-center overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

export const H4 = React.forwardRef<HTMLHeadingElement, HProps>(
  ({ className, children, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "relative overflow-hidden text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
);

export const Subtitle = React.forwardRef<HTMLHeadingElement, HProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-muted-foreground text-center text-xl md:text-2xl xl:text-3xl",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

H2.displayName = "H2";
H1.displayName = "H1";
H3.displayName = "H3";
H4.displayName = "H4";
Subtitle.displayName = "Subtitle";
