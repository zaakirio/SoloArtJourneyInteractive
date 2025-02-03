import type { NextPage } from 'next';
import "../styles/globals.css";
import { CurriculumGrid } from '@/components/CurriculumCard';
import term1Data from '../data/curriculum/term-1.json';
import term2Data from '../data/curriculum/term-2.json';
import term3Data from '../data/curriculum/term-3.json';
import term4Data from '../data/curriculum/term-4.json';
import term5Data from '../data/curriculum/term-5.json';
import term6Data from '../data/curriculum/term-6.json';

const Home: NextPage = () => {
  const terms = [
    term1Data,
    term2Data,
    term3Data,
    term4Data,
    term5Data,
    term6Data
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <CurriculumGrid terms={terms as Term[]} />
    </div>
  );
};

export default Home;