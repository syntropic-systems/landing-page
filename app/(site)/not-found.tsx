import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-sm font-medium text-primary mb-4">404</p>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
