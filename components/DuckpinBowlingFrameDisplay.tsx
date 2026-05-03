// PHASE 7: Converted from class component to function component.
// Removed <style jsx> — replaced with Tailwind classes.
// Duckpin bowling: every frame always shows 3 throws (no strike shortcut in frame 1–9 cells).
// Frame has border on left/top/bottom/right but no explicit right; each frame borders its own cell.
import React from 'react';

interface Props {
  frameNum: number | string;
  throws: (string | number)[];
  result: string | number;
}

export default function DuckpinBowlingFrameDisplay({ frameNum, throws, result }: Props) {
  const num = Number(frameNum);
  // For frames 1–9 a strike still shows blank/x in the display (same as standard bowling)
  const t1 = num < 10 && throws[0] === 'x' ? '' : throws[0];
  const t2 = num < 10 && throws[0] === 'x' ? 'x' : throws[1];
  const t3 = throws[2];

  return (
    // border-r-0 mirrors original CSS "border-right: 0px" — right edge is provided by adjacent frame
    <div className="flex h-[70px] w-full flex-col border-l border-t border-b border-r-0 border-border text-[0.75em] min-[500px]:text-[1em]">
      <div className="flex flex-1">
        <div className="flex flex-1 items-start justify-center pt-0 sm:pt-0.5">{t1}</div>
        <div className="flex flex-1 items-start justify-center border-l border-b border-border pt-0 sm:pt-0.5">{t2}</div>
        <div className="flex flex-1 items-start justify-center border-l border-b border-border pt-0 sm:pt-0.5">{t3}</div>
      </div>
      <div className="flex h-[35px] items-center justify-center">{result}</div>
    </div>
  );
}
