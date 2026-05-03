// PHASE 7: Converted from class component to function component.
// Removed <style jsx> — replaced with Tailwind classes.
// Each frame is a 70px-tall cell: top half shows throws, bottom half shows cumulative score.
// Frames 1–9: border on left/top/bottom only (right border comes from next frame's left).
// Frame 10: all four borders (wider cell, three throws).
import React, { useState, useEffect } from 'react';

interface Props {
  frameNum: number | string;
  throws: (string | number)[];
  result: string | number;
}

export default function BowlingFrameDisplay({ frameNum, throws, result }: Props) {
  // Derive display values from props: for frames 1-9 a strike shows blank/x instead of x/blank
  const num = Number(frameNum);
  const t1 = num < 10 && throws[0] === 'x' ? '' : throws[0];
  const t2 = num < 10 && throws[0] === 'x' ? 'x' : throws[1];
  const t3 = throws[2];

  if (num === 10) {
    return (
      <div className="flex h-[70px] w-full flex-col border border-border text-[0.9em] min-[500px]:text-[1.4em]">
        <div className="flex flex-1">
          <div className="flex flex-1 items-start justify-center pt-0">{t1}</div>
          <div className="flex flex-1 items-start justify-center border-l border-b border-border pt-0">{t2}</div>
          <div className="flex flex-1 items-start justify-center border-l border-b border-border pt-0">{t3}</div>
        </div>
        <div className="flex h-[35px] items-center justify-center">{result}</div>
      </div>
    );
  }

  return (
    <div className="flex h-[70px] w-full flex-col border-l border-t border-b border-border text-[0.9em] min-[500px]:text-[1.4em]">
      <div className="flex flex-1">
        <div className="flex flex-1 items-start justify-center pt-0">{t1}</div>
        <div className="flex flex-1 items-start justify-center border-l border-b border-border pt-0">{t2}</div>
      </div>
      <div className="flex h-[35px] items-center justify-center">{result}</div>
    </div>
  );
}
