// PHASE 7: Converted from class component to function component.
// Removed <style jsx> — replaced with Tailwind classes.
// Used for day/total points rows in Decathlon and Heptathlon calculators.
import React from 'react';

interface Props {
  text: string;
  points: number | string;
}

export default function CombinedTotalRow({ text, points }: Props) {
  return (
    // Full-bleed row (negative horizontal margin offsets the parent's padding)
    <div className="-mx-5 mt-5 flex flex-row items-baseline justify-evenly border-t border-border bg-muted/40 px-5 py-2.5">
      <div className="flex-1 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {text}
      </div>
      <div className="text-2xl font-bold">{points}</div>
    </div>
  );
}
