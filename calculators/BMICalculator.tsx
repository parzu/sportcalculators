// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI TextField, Typography, RadioGroup, FormControlLabel, Radio, Paper, Grid,
//          Table/TableRow/TableCell and @emotion/styled Subheader/CalculatorBox/StyledTableCell.
// Replaced with Tailwind card, plain inputs, native radios, and plain HTML table.
// Logic (calculateBMI, calculateWeightRanges, categorizeBMI) is unchanged.
import React, { Component } from 'react';

interface WeightRange { min: number; max: number | string; minBmi: number; maxBmi: number | string; }
interface State {
  weight: string; height: string; unit: string;
  bmi: string; bmiCategory: string; weightRanges: Record<string, WeightRange>;
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

const inputCls =
  'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

class BMICalculator extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { weight: '', height: '', unit: 'metric', bmi: '', bmiCategory: '', weightRanges: {} };
  }

  calculateBMI = () => {
    const { weight, height, unit } = this.state;
    const h = unit === 'metric' ? Number(height) / 100 : Number(height) * 0.0254;
    const w = unit === 'metric' ? Number(weight) : Number(weight) * 0.453592;
    const bmiValue = (w / (h ** 2)).toFixed(2);
    this.setState({ bmi: bmiValue });
    this.categorizeBMI(bmiValue);
    this.calculateWeightRanges(h, unit);
  };

  calculateWeightRanges = (heightInMeters: number, unit: string) => {
    const cats = {
      'Underweight':    { minBmi: 0,    maxBmi: 18.5,    min: 0,    max: 18.5    },
      'Normal weight':  { minBmi: 18.5, maxBmi: 24.9,    min: 18.5, max: 24.9    },
      'Overweight':     { minBmi: 25,   maxBmi: 29.9,    min: 25,   max: 29.9    },
      'Obesity':        { minBmi: 30,   maxBmi: Infinity, min: 30,   max: Infinity },
    };
    const weightRanges: Record<string, WeightRange> = {};
    for (const cat in cats) {
      let minW = (cats as any)[cat].min * heightInMeters ** 2;
      let maxW = (cats as any)[cat].max * heightInMeters ** 2;
      if (unit === 'imperial') { minW *= 2.20462; maxW = maxW === Infinity ? Infinity : maxW * 2.20462; }
      weightRanges[cat] = {
        min: Math.round(minW), max: maxW === Infinity ? '+' : Math.round(maxW),
        minBmi: (cats as any)[cat].minBmi,
        maxBmi: (cats as any)[cat].maxBmi === Infinity ? '+' : (cats as any)[cat].maxBmi,
      };
    }
    this.setState({ weightRanges });
  };

  categorizeBMI = (bmiValue: string) => {
    const bmi = parseFloat(bmiValue);
    let category = '';
    if (bmi < 18.5)                       category = 'Underweight';
    else if (bmi >= 18.5 && bmi <= 24.9)  category = 'Normal weight';
    else if (bmi >= 25    && bmi <= 29.9) category = 'Overweight';
    else if (bmi >= 30)                   category = 'Obesity';
    this.setState({ bmiCategory: category });
  };

  render() {
    const { unit, weight, height, bmi, bmiCategory, weightRanges } = this.state;

    return (
      <div className="mx-auto max-w-lg min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
        <SectionHeader>Unit of Measurement</SectionHeader>
        <div className="flex gap-6 pb-4">
          {[
            { value: 'metric',   label: 'Metric (kg, cm)'       },
            { value: 'imperial', label: 'Imperial (lbs, inches)' },
          ].map((u) => (
            <label key={u.value} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="radio" name="unit" value={u.value} checked={unit === u.value}
                onChange={(e) => this.setState({ unit: e.target.value }, this.calculateBMI)}
                className="accent-primary" />
              {u.label}
            </label>
          ))}
        </div>

        <SectionHeader>Your Details</SectionHeader>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              {unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            </label>
            <input type="number" value={weight}
              onChange={(e) => this.setState({ weight: e.target.value }, this.calculateBMI)}
              className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              {unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            </label>
            <input type="number" value={height}
              onChange={(e) => this.setState({ height: e.target.value }, this.calculateBMI)}
              className={inputCls} />
          </div>
        </div>

        {bmi && (
          <>
            <SectionHeader>Your BMI Result</SectionHeader>
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">Your BMI</p>
              <p className="text-4xl font-bold">{bmi}</p>
              <p className="text-sm">( {bmiCategory} )</p>
            </div>

            {/* BMI category table — plain HTML, same pattern as heptathlon/decathlon pages */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border bg-muted/50">
                    <th className="px-3 py-2 text-center font-semibold">BMI</th>
                    <th className="px-3 py-2 text-center font-semibold">Weight range</th>
                    <th className="px-3 py-2 text-center font-semibold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(weightRanges).map((cat) => (
                    <tr
                      key={cat}
                      className={
                        bmiCategory === cat
                          ? 'bg-primary/10 font-bold border-b border-border'
                          : 'border-b border-border/50'
                      }
                    >
                      <td className="px-3 py-2 text-center tabular-nums">
                        {weightRanges[cat].minBmi} – {weightRanges[cat].maxBmi}
                      </td>
                      <td className="px-3 py-2 text-center tabular-nums">
                        {weightRanges[cat].min}
                        {cat !== 'Obesity' ? ` – ${weightRanges[cat].max}` : '+'}{' '}
                        {unit === 'metric' ? 'kg' : 'lbs'}
                      </td>
                      <td className="px-3 py-2 text-center">{cat}</td>
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
}

export default BMICalculator;
