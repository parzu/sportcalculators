// APP ROUTER: Replaces pages/contact.tsx. Route: /contact
// Server Component — static content only.

import React from 'react';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Contact | SportCalculators',
};

export default function Contact() {
  return (
    <>
      <h2 className="calculator">Contact Us</h2>
      <p>Do you have an idea for a new calculator? Did you find an error in our calculators? Or is there something else you want us to know?</p>
      <p>You can contact us via e-mail: info (at) sportcalculators.com</p>
      <AdSenseWidget />
    </>
  );
}
