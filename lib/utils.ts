// cn() merges Tailwind class strings intelligently, resolving conflicts.
// Example: cn("p-4", condition && "p-8") → "p-8" when condition is true
// (clsx handles conditionals; tailwind-merge handles conflicting classes like p-4 vs p-8)
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
