import React from 'react';
import { AppZero, Header } from './AppZero';
import { SectionOne } from './sections/SectionOne';
import { SectionTwo } from './sections/SectionTwo';
import { SectionThree } from './sections/SectionThree';
import { SectionFour } from './sections/SectionFour';
import { SectionFive } from './sections/SectionFive';
import { SectionSix } from './sections/SectionSix';

export default function App() {
  return (
    <div className="bg-[#F5F7FB] text-slate-900">
      <Header />
      <AppZero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
    </div>
  );
}
