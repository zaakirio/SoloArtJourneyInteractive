// src/app/page.tsx
import type { NextPage } from 'next';
import {Navbar} from '@/components/Navbar';
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
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl mb-12 tracking-tight">Curriculum - idk how i wanna handle title and about us section lets see</h1>
          <CurriculumGrid terms={terms as Term[]} />
        </div>
      </main>
    </div>
  );
};

export default Home;