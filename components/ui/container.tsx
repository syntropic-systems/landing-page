"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full xl:max-w-7xl mx-auto px-0 md:pt-6 lg:pt-12",
      className
    )}
    {...props}
  ></div>
));
Container.displayName = "Container";

export { Container };
