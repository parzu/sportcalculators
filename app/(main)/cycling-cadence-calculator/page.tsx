// APP ROUTER: Replaces pages/cycling-cadence-calculator.tsx. Route: /cycling-cadence-calculator

import React from 'react';
import CadenceCalculator from '../../../calculators/CyclingCadenceCalculator';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Cycling Cadence Calculator | SportCalculators',
  description: 'Calculate your cycling speed based on your cadence (pedaling rate) and bike specifications. See how different cadences affect your speed in both km/h and mph.',
};

export default function CyclingCadenceCalculatorPage() {
  return (
    <>
      <h2 className="calculator">Cycling Cadence Calculator</h2>
      <p>
        Calculate your cycling speed based on your cadence (pedaling rate) and bike specifications. Input your bike&rsquo;s wheel diameter, chainring teeth, and cog teeth to see how different cadences affect your speed in both km/h and mph. Perfect for finding your optimal gear ratio and understanding how cadence impacts your cycling performance.
      </p>

      <AdSenseWidget />
      <div style={{ paddingTop: '40px', paddingBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <CadenceCalculator />
      </div>
      <AdSenseWidget />

      <h3>How to Use the Calculator</h3>
      <p>
        The calculator is simple to use. First, enter your bike parameters:
      </p>
      <ul>
        <li>Rim size</li>
        <li>Tire size</li>
        <li>Number of teeth on your chainring (front gear)</li>
        <li>Number of teeth on your cog (rear gear)</li>
      </ul>
      <p>
        Then, you can either input your desired cadence (RPM) or target speed. Select between km/h and mph for speed unit. The calculator will automatically compute the corresponding values. A reference table is provided below the calculator showing speeds for different cadence values based on your bike setup.
      </p>

      <h3>Understanding Cycling Cadence</h3>
      <p>
        Cadence in cycling refers to the number of pedal revolutions per minute (RPM). It&rsquo;s one of the key measurements in cycling, alongside speed and distance. Your cadence affects how efficiently you ride and how much energy you use while cycling.
      </p>

      <h3>Why Cadence Matters</h3>
      <p>
        Understanding and monitoring your cadence can help you improve your cycling in several ways. The right cadence helps you ride more efficiently, reduces strain on your joints, and helps you manage your energy better during rides. Using this calculator, you can see how your cadence affects your speed with your specific bike setup, helping you find the most comfortable and efficient way to ride.
      </p>
    </>
  );
}
