import React, { useState, useEffect, Fragment } from 'react';
import { timeToSeconds, formatTimeObject } from '../services/timeService';

interface SportConstant {
  name: string;
  metric: string;
  imperial: string;
  multiplier?: { metric: number; imperial: number; };
}

const sportConstants: SportConstant[] = [
  { name: 'swim', metric: '/100m',  imperial: '/100yds', multiplier: { metric: 10, imperial: 17.6 } },
  { name: 'bike', metric: 'km/h',   imperial: 'mph'                                                  },
  { name: 'run',  metric: '/km',    imperial: '/mi',     multiplier: { metric: 1, imperial: 1      } },
];

interface Values {
  timeHours: string | number;
  timeMinutes: string | number;
  timeSeconds: string | number;
  paceMinutes: string | number;
  paceSeconds: string | number;
  speed: string | number;
  calculateTime: boolean;
  calculatePaceSpeed: boolean;
}

interface Props {
  name: 'swim' | 'bike' | 'run';
  distance: number;
  unit: 'metric' | 'imperial';
  onTimeChange: (key: string, totalSeconds: number) => void;
}

// 9 columns on 500px+: name | spacer | pace-min | pace-sec | unit | spacer | time-hrs | time-mins | time-secs
// 7 columns below 500px: spacers removed (their items are hidden, so auto-placement skips them)
export const TRIATHLON_GRID = 'grid grid-cols-[1.5rem_1fr_1fr_1.5rem_1fr_1fr_1fr] gap-2 min-[500px]:grid-cols-[2rem_1rem_1fr_1fr_2rem_1rem_1fr_1fr_1fr] min-[500px]:gap-3';

const inputCls =
  'w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring';

const LabeledInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-0.5">
    <label className="text-center text-xs text-muted-foreground">{label}</label>
    <input {...props} className={inputCls} />
  </div>
);

export default function TriathlonSport({ name, distance, unit, onTimeChange }: Props) {
  const [values, setValues] = useState<Values>({
    timeHours: '', timeMinutes: '', timeSeconds: '',
    paceMinutes: '', paceSeconds: '', speed: '',
    calculateTime: false, calculatePaceSpeed: false,
  });
  const [paceUnit, setPaceUnit] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => { onTimeChange(`${name}TotalTime`, totalSeconds); }, [totalSeconds]);
  useEffect(() => { updateTime(); }, [distance]);
  useEffect(() => {
    if (values.calculatePaceSpeed) { name === 'bike' ? updateSpeed() : updatePace(); }
    if (values.calculateTime)      { updateTime(); }
  }, [values]);
  useEffect(() => {
    const sport = sportConstants.find((s) => s.name === name)!;
    setPaceUnit(sport[unit]);
  }, [unit]);

  function updatePace(): void {
    const totalSecs = timeToSeconds(values.timeHours, values.timeMinutes, values.timeSeconds);
    const sport = sportConstants.find((s) => s.name === name)!;
    const paceSeconds = totalSecs / (distance * sport.multiplier![unit]);
    const p = formatTimeObject(paceSeconds);
    setValues((v) => ({ ...v, paceMinutes: p.minutes, paceSeconds: p.seconds, calculatePaceSpeed: false }));
    setTotalSeconds(totalSecs);
  }

  function updateSpeed(): void {
    const totalSecs = timeToSeconds(values.timeHours, values.timeMinutes, values.timeSeconds);
    setValues((v) => ({ ...v, speed: distance / (totalSecs / 3600), calculatePaceSpeed: false }));
    setTotalSeconds(totalSecs);
  }

  function updateTime(): void {
    let timeSecs: number;
    if (name === 'bike') {
      timeSecs = values.speed === '' ? 0 : (distance / Number(values.speed)) * 3600;
    } else {
      const paceSecs = timeToSeconds(0, values.paceMinutes, values.paceSeconds);
      const sport = sportConstants.find((s) => s.name === name)!;
      timeSecs = paceSecs * (distance * sport.multiplier![unit]);
    }
    const t = formatTimeObject(timeSecs);
    setValues((v) => ({ ...v, timeHours: t.hours, timeMinutes: t.minutes, timeSeconds: t.seconds, calculateTime: false }));
    setTotalSeconds(timeSecs);
  }

  function timeChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value, calculatePaceSpeed: true }));
  }

  function speedPaceChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value, calculateTime: true }));
  }

  return (
    <Fragment>
      <div className={`${TRIATHLON_GRID} items-end bg-muted/40 -mx-5 px-5 py-1.5 min-[500px]:mx-0 min-[500px]:rounded-md min-[500px]:px-2`}>
        {/* Col 1: sport name */}
        <span className="pb-2 text-center text-s font-semibold uppercase [writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb]">
          {name}
        </span>

        {/* Spacer col — hidden below 500px so 7-col grid auto-places remaining items correctly */}
        <div className="hidden min-[500px]:block" />

        {/* Cols 2–3: pace (swim/run) or speed (bike) */}
        {name === 'bike' ? (
          <div className="col-span-2 flex flex-col gap-0.5">
            <label className="text-center text-xs text-muted-foreground">speed</label>
            <input type="number" value={values.speed} name="speed"
              onChange={speedPaceChanged} className={inputCls} />
          </div>
        ) : (
          <>
            <LabeledInput label="mins" type="number" value={values.paceMinutes} name="paceMinutes" onChange={speedPaceChanged} />
            <LabeledInput label="secs" type="number" value={values.paceSeconds} name="paceSeconds" onChange={speedPaceChanged} />
          </>
        )}

        {/* Col 4: unit label */}
        <span className="pb-2 text-[10px] leading-none text-muted-foreground">{paceUnit}</span>

        {/* Spacer col — hidden below 500px */}
        <div className="hidden min-[500px]:block" />

        {/* Cols 6–8: time */}
        <LabeledInput label="hrs" type="number" value={values.timeHours} name="timeHours" onChange={timeChanged} />
        <LabeledInput label="mins" type="number" value={values.timeMinutes} name="timeMinutes" onChange={timeChanged} />
        <LabeledInput label="secs" type="number" value={values.timeSeconds} name="timeSeconds" onChange={timeChanged} />
      </div>
    </Fragment>
  );
}
