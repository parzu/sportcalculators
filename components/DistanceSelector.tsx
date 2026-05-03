// PHASE 7: Removed MUI Radio, RadioGroup, FormControlLabel, Grid and @emotion/styled GridItem.
// Replaced with native radio buttons in a responsive Tailwind grid.
import React from 'react';

interface Props {
  initialDistance: string;
  onDistanceChange: (distance: string) => void;
}

const DISTANCES = [
  { value: '1500',    label: '1 500 m'      },
  { value: '1609.34', label: '1 mi'         },
  { value: '4828.03', label: '3 mi'         },
  { value: '5000',    label: '5 km'         },
  { value: '8046.72', label: '5 mi'         },
  { value: '10000',   label: '10 km'        },
  { value: '15000',   label: '15 km'        },
  { value: '16093.4', label: '10 mi'        },
  { value: '21097.5', label: '½ marathon'   },
  { value: '42195',   label: 'marathon'     },
];

export default function DistanceSelector({ initialDistance, onDistanceChange }: Props) {
  const [distance, setDistance] = React.useState(initialDistance);

  React.useEffect(() => {
    onDistanceChange(distance);
  }, [distance]);

  return (
    // Two columns on small screens, three on medium+, matching the old MUI xs={6} sm={4} md={3} layout
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 p-2">
      {DISTANCES.map((d) => (
        <label key={d.value} className="flex flex-col items-center gap-0.5 cursor-pointer text-sm p-1">
          <input
            type="radio"
            name="distance"
            value={d.value}
            checked={distance === d.value}
            onChange={() => setDistance(d.value)}
            className="accent-primary"
          />
          {d.label}
        </label>
      ))}
    </div>
  );
}
