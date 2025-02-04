// src/app/page.tsx
import type { NextPage } from 'next';
import Image from 'next/image';
import logo from "../../public/soloartjourney.png";

import { CurriculumGrid } from '@/components/CurriculumCard';
import term1Data from '../data/curriculum/term-1.json';
import term2Data from '../data/curriculum/term-2.json';
import term3Data from '../data/curriculum/term-3.json';
import term4Data from '../data/curriculum/term-4.json';
import term5Data from '../data/curriculum/term-5.json';
import term6Data from '../data/curriculum/term-6.json';
import term7Data from '../data/curriculum/term-7.json';
import term8Data from '../data/curriculum/term-8.json';
import term9Data from '../data/curriculum/term-9.json';
import { AnimatedBackground } from '@/components/AnimatedBackground';

const Home: NextPage = () => {
  const terms = [
    term1Data,
    term2Data,
    term3Data,
    term4Data,
    term5Data,
    term6Data,
    term7Data,
    term8Data,
    term9Data
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <main className="pt-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-8">
            <Image
              src={logo}
              alt="Solo Art Journey"
              width={600}
              height={300}
              className="max-w-3xl"
              priority
              unoptimized
              quality={120}
            />
          </div>
          <CurriculumGrid terms={terms as Term[]} />
        </div>
      </main>
    </div>
  );
};

export default Home;