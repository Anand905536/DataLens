

import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin h-4 w-4", className)}
      {...props}
    />
  );
}