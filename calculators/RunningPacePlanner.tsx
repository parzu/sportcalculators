// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, TextField, Typography, Grid, TableContainer, Table, TableHead,
//          TableRow, TableCell, TableBody, ToggleButton, ToggleButtonGroup, InputAdornment,
//          Slider, IconButton and MUI icon imports.
// Replaced with Tailwind card, plain HTML table, custom toggle-button group, and a native
//          <input type="range"> slider.  lucide-react icons replace MUI icon imports.
// All split calculation logic (calculateSplits, handlePaceAdjustment, toggleLock) is unchanged.
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus, Lock, LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TimeInput from '../components/TimeInput';
import RunningDistanceInput from '../components/RunningDistanceInput';
import { formatTimeObject } from '../services/timeService';

interface Split {
  distance: string; pace: number; time: number; cumulativeTime: number;
  paceStr: string; timeStr: string; cumulativeTimeStr: string;
}
interface RaceData      { distance: number; time: number; evenPace: number | string; }
interface SplitSettings { splitDistance: number; splitUnit: string; paceProgression: number; }

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

const inputCls =
  'rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

function formatTime(s: number): string {
  const t = formatTimeObject(s);
  return `${t.hours > 0 ? t.hours + ':' : ''}${t.minutes}:${t.seconds}`;
}

export default function RunningPacePlanner() {
  const [raceData,      setRaceData     ] = useState<RaceData>({ distance: 0, time: 0, evenPace: 0 });
  const [splitSettings, setSplitSettings] = useState<SplitSettings>({ splitDistance: 1, splitUnit: 'km', paceProgression: 0 });
  const [splits,        setSplits       ] = useState<Split[]>([]);
  const [lockedSplits,  setLockedSplits ] = useState<Set<number>>(new Set());

  function calculatePaceForDistance(pt: number, total: number, avg: number, pf: number): number {
    const prog = pt / total;
    return avg * (1 + pf / 2) + (avg * (1 - pf / 2) - avg * (1 + pf / 2)) * prog;
  }

  function calculateSplits(distance: number, targetTime: number, settings: SplitSettings): Split[] {
    if (!distance || !targetTime || !settings.splitDistance || targetTime < 0) return [];
    const adj   = settings.splitUnit === 'mi' ? Number((distance / 1.60934).toFixed(2)) : distance;
    const count = Math.ceil(adj / settings.splitDistance);
    const avg   = targetTime / adj;
    const pf    = -(settings.paceProgression / 100);

    const dists = Array(count).fill(0).map((_, i) =>
      Math.min(settings.splitDistance, adj - i * settings.splitDistance));

    let cumDist = 0, cumTime = 0;
    let current: Split[] = dists.map((d, i) => {
      const pace = lockedSplits.has(i) ? (splits[i]?.pace ?? calculatePaceForDistance(cumDist + d / 2, adj, avg, pf))
                                       : calculatePaceForDistance(cumDist + d / 2, adj, avg, pf);
      const t = d * pace;
      cumDist += d; cumTime += t;
      return { distance: d.toFixed(2), pace, time: t, cumulativeTime: cumTime,
               paceStr: formatTime(pace), timeStr: formatTime(t), cumulativeTimeStr: formatTime(cumTime) };
    });

    const totalT    = current.reduce((s, sp) => s + sp.time, 0);
    const disc      = targetTime - totalT;
    const unlockedT = current.reduce((s, sp, i) => s + (lockedSplits.has(i) ? 0 : sp.time), 0);
    const adjFactor = unlockedT > 0 ? 1 + disc / unlockedT : 1;

    cumTime = 0;
    return current.map((sp, i) => {
      const locked = lockedSplits.has(i);
      const t2 = locked ? sp.time : sp.time * adjFactor;
      const p2 = t2 / Number(sp.distance);
      cumTime += t2;
      return { ...sp, pace: locked ? sp.pace : p2, time: t2, cumulativeTime: cumTime,
               paceStr: formatTime(locked ? sp.pace : p2), timeStr: formatTime(t2), cumulativeTimeStr: formatTime(cumTime) };
    });
  }

  function toggleLock(i: number) {
    const nl = new Set(lockedSplits);
    nl.has(i) ? nl.delete(i) : nl.add(i);
    setLockedSplits(nl);
    setSplits(calculateSplits(raceData.distance, raceData.time, splitSettings));
  }

  function handlePaceAdjustment(index: number, adjustment: number) {
    const ns = [...splits];
    const target = ns[index];
    const newPace = target.pace + adjustment;
    const newTime = Number(target.distance) * newPace;
    const diff    = newTime - target.time;
    const unlocked = splits.filter((_, i) => i !== index && !lockedSplits.has(i));
    if (unlocked.length === 0 && diff !== 0) return;

    const nl = new Set(lockedSplits); nl.add(index);
    setLockedSplits(nl);

    target.pace = newPace; target.time = newTime;
    target.paceStr = formatTime(newPace); target.timeStr = formatTime(newTime);

    if (unlocked.length > 0) {
      const perSplit = -diff / unlocked.length;
      ns.forEach((sp, i) => {
        if (i !== index && !lockedSplits.has(i)) {
          sp.time += perSplit; sp.pace = sp.time / Number(sp.distance);
          sp.paceStr = formatTime(sp.pace); sp.timeStr = formatTime(sp.time);
        }
      });
    }
    let ct = 0;
    ns.forEach((sp) => { ct += sp.time; sp.cumulativeTime = ct; sp.cumulativeTimeStr = formatTime(ct); });
    setSplits(ns);
  }

  useEffect(() => {
    const ns = calculateSplits(raceData.distance, raceData.time, splitSettings);
    setSplits(ns);
    if (raceData.distance && raceData.time) {
      const d = splitSettings.splitUnit === 'mi' ? raceData.distance / 1.60934 : raceData.distance;
      setRaceData((p) => ({ ...p, evenPace: formatTime(raceData.time / d) }));
    }
  }, [raceData.distance, raceData.time, splitSettings]);

  // Toggle-button for split unit
  const SplitUnitToggle = () => (
    <div className="flex">
      {['km', 'mi'].map((u, i) => (
        <button key={u} type="button"
          onClick={() => setSplitSettings((p) => ({ ...p, splitUnit: u }))}
          className={cn('px-3 py-1.5 text-xs border border-input -ml-px first:ml-0',
            i === 0 ? 'rounded-l-md' : 'rounded-r-md',
            splitSettings.splitUnit === u ? 'bg-primary text-primary-foreground z-10' : 'bg-background hover:bg-muted'
          )}>
          {u}
        </button>
      ))}
    </div>
  );

  return (
    <div className="-mx-4 max-w-2xl min-[500px]:mx-auto min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
      <SectionHeader>Race Distance</SectionHeader>
      <RunningDistanceInput onDistanceChange={(d) => setRaceData((p) => ({ ...p, distance: d }))} />

      <SectionHeader>Target Race Time</SectionHeader>
      <div className="py-4">
        <TimeInput onTimeChange={(_, totalSecs) => setRaceData((p) => ({ ...p, time: totalSecs }))} />
      </div>

      <SectionHeader>Split Settings</SectionHeader>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5 py-4">
        {/* Row 1: Split length */}
        <div className="w-full">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">Split Length</p>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <input type="number" min={1} step={1}
                value={splitSettings.splitDistance}
                onChange={(e) => setSplitSettings((p) => ({ ...p, splitDistance: Number(e.target.value) }))}
                className={inputCls + ' w-24 pr-10'}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {splitSettings.splitUnit}
              </span>
            </div>
            <SplitUnitToggle />
          </div>
        </div>

        {/* Row 2: Pace progression */}
        <div className="w-full">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">Split Progression</p>
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <input type="number" value={splitSettings.paceProgression}
                onChange={(e) => setSplitSettings((p) => ({ ...p, paceProgression: Number(e.target.value) }))}
                className={inputCls + ' w-20 pr-6'}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <input type="range" min={-100} max={100} step={1}
                value={splitSettings.paceProgression}
                onChange={(e) => setSplitSettings((p) => ({ ...p, paceProgression: Number(e.target.value) }))}
                className="accent-primary w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-100%</span><span>0%</span><span>100%</span>
              </div>
            </div>
          </div>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            Negative = faster finish (recommended). Positive = faster start.
          </p>
        </div>
      </div>

      {splits.length > 0 && (
        <>
          <SectionHeader>Splits</SectionHeader>
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Even pace: <strong>{raceData.evenPace} min/{splitSettings.splitUnit}</strong>
            <br />Use +/- to adjust a split by 1 second. Lock prevents auto-adjustment.
          </p>

          {/* Sticky-header split table */}
          <div className="max-h-[60vh] overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border">
                  <th className="px-2 py-2 text-center font-semibold">Split</th>
                  <th className="px-2 py-2 text-center font-semibold">Dist ({splitSettings.splitUnit})</th>
                  <th className="px-2 py-2 text-center font-semibold">Pace (/{splitSettings.splitUnit})</th>
                  <th className="px-2 py-2 text-center font-semibold">Actions</th>
                  <th className="px-2 py-2 text-center font-semibold">Split</th>
                  <th className="px-2 py-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {splits.map((split, i) => (
                  <tr key={i} className={cn('border-b border-border/50', lockedSplits.has(i) && 'bg-primary/5')}>
                    <td className="px-2 py-2 text-center tabular-nums">{i + 1}</td>
                    <td className="px-2 py-2 text-center tabular-nums">{split.distance}</td>
                    <td className="px-2 py-2 text-center tabular-nums">{split.paceStr}</td>
                    <td className="px-2 py-1 text-center">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handlePaceAdjustment(i, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handlePaceAdjustment(i, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost" size="icon" className={cn('h-7 w-7', lockedSplits.has(i) && 'text-primary')}
                        onClick={() => toggleLock(i)}
                      >
                        {lockedSplits.has(i) ? <Lock className="h-3 w-3" /> : <LockOpen className="h-3 w-3" />}
                      </Button>
                    </td>
                    <td className="px-2 py-2 text-center tabular-nums">{split.timeStr}</td>
                    <td className="px-2 py-2 text-center tabular-nums">{split.cumulativeTimeStr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
