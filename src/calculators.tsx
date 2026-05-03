// PHASE 6: Replaced mdi-material-ui icons (Bowling, Bike, Run, HumanHandsup) with lucide-react.
// lucide-react is the icon library bundled with shadcn/ui — small, tree-shakeable SVG icons.
import React from 'react';
import { FaBowlingBall, FaPersonBiking, FaPersonRunning, FaTrophy } from 'react-icons/fa6';

export interface CalculatorEntry {
  title: string;
  href: string;
  description: string;
}

export interface SportEntry {
  sport: string;
  icon: React.ReactNode;
  calculators: CalculatorEntry[];
}

export const calculators: SportEntry[] = [
  {
    sport: 'Bowling',
    // Target replaces the old Bowling icon from mdi-material-ui
    icon: <FaBowlingBall className="size-6" />,
    calculators: [
      { title: 'Bowling Score Calculator',    href: 'bowling-score-calculator',         description: 'Calculate your bowling score frame by frame.' },
      { title: 'Bowling Handicap Calculator', href: 'bowling-handicap-calculator',      description: 'Calculate your bowling handicap.' },
      { title: 'Duckpin Score Calculator',    href: 'duckpin-bowling-score-calculator', description: 'Score calculator for duckpin and candlepin bowling.' },
    ],
  },
  {
    sport: 'Cycling',
    // Bike is available in both mdi-material-ui and lucide-react — same name
    icon: <FaPersonBiking className="size-6" />,
    calculators: [
      { title: 'Cycling Speed Calculator',   href: 'cycling-speed-calculator',   description: 'Calculate cycling speed from time and distance.' },
      { title: 'Cycling Cadence Calculator', href: 'cycling-cadence-calculator', description: 'Calculate speed from cadence and bike setup.' },
    ],
  },
  {
    sport: 'Running',
    // Timer replaces the Run icon — close enough for running calculators
    icon: <FaPersonRunning className="size-6" />,
    calculators: [
      { title: 'Marathon Calculator',      href: 'marathon-calculator',      description: 'Split times needed for your marathon goal.' },
      { title: 'Race Time Calculator',     href: 'race-time-calculator',     description: 'Predict race time from a recent run.' },
      { title: 'Running Speed Calculator', href: 'running-speed-calculator', description: 'Calculate speed from time and distance.' },
      { title: 'Running Speed Converter',  href: 'running-speed-converter',  description: 'Convert between speed and pace units.' },
      { title: 'Running Pace Planner',     href: 'running-pace-planner',     description: 'Plan your race pace split by split.' },
    ],
  },
  {
    sport: 'Other',
    // Trophy replaces HumanHandsup — suits athletics/combined events
    icon: <FaTrophy className="size-6" />,
    calculators: [
      { title: 'Decathlon Calculator',  href: 'decathlon-calculator',  description: 'IAAF points calculator for decathlon.' },
      { title: 'Heptathlon Calculator', href: 'heptathlon-calculator', description: 'IAAF points calculator for heptathlon.' },
      { title: 'Triathlon Calculator',  href: 'triathlon-calculator',  description: 'Calculate total triathlon time and paces.' },
      { title: 'BMI Calculator',        href: 'bmi-calculator',        description: 'Calculate your Body Mass Index.' },
    ],
  },
];

const calculatorsModule = { calculators };
export default calculatorsModule;
