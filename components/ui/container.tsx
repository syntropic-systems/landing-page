"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props}></div>
));
Container.displayName = "Container";

export { Container };
