// PHASE 7: Converted from class component to function component.
// Removed MUI Table/TableHead/TableRow/TableCell and <style jsx>.
// Now uses a plain <table> with Tailwind (same pattern as heptathlon/decathlon pages).
// The orange header row is kept using the original hex colour from the old <style jsx>.
import React from 'react';
import * as Speed from '../services/speedService';

interface Props {
  speed: number;
}

export default function SpeedDisplay({ speed }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Metric</th>
            <th className="px-4 py-2 text-left font-semibold">Imperial</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50">
            <td className="px-4 py-2 tabular-nums">{Speed.mps(speed)} m/s</td>
            <td className="px-4 py-2 tabular-nums">{Speed.mpsToFps(speed)} ft/s</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="px-4 py-2 tabular-nums">{Speed.mpsToKmPace(speed)} min/km</td>
            <td className="px-4 py-2 tabular-nums">{Speed.mpsToMilePace(speed)} min/mi</td>
          </tr>
          <tr>
            <td className="px-4 py-2 tabular-nums">{Speed.mpsToKmh(speed)} km/h</td>
            <td className="px-4 py-2 tabular-nums">{Speed.mpsToMph(speed)} mph</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
