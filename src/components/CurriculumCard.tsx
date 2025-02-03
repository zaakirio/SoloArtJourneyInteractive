// CurriculumCard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Youtube, BookmarkCheck, GraduationCap, ChevronDown, X, Palette, Book, Pencil } from 'lucide-react';

interface CurriculumCardProps {
  termData: Term;
}

// Color theme mapping for different terms
const termColors = {
  1: { bg: 'bg-rose-50', accent: 'bg-rose-500', text: 'text-rose-700', hover: 'hover:bg-rose-100', border: 'border-rose-200' },
  2: { bg: 'bg-violet-50', accent: 'bg-violet-500', text: 'text-violet-700', hover: 'hover:bg-violet-100', border: 'border-violet-200' },
  3: { bg: 'bg-cyan-50', accent: 'bg-cyan-500', text: 'text-cyan-700', hover: 'hover:bg-cyan-100', border: 'border-cyan-200' },
  4: { bg: 'bg-amber-50', accent: 'bg-amber-500', text: 'text-amber-700', hover: 'hover:bg-amber-100', border: 'border-amber-200' },
  5: { bg: 'bg-emerald-50', accent: 'bg-emerald-500', text: 'text-emerald-700', hover: 'hover:bg-emerald-100', border: 'border-emerald-200' },
  6: { bg: 'bg-indigo-50', accent: 'bg-indigo-500', text: 'text-indigo-700', hover: 'hover:bg-indigo-100', border: 'border-indigo-200' },
};

export const CurriculumCard = ({ termData }: CurriculumCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = termColors[termData.term as keyof typeof termColors];

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'challenge':
        return <BookmarkCheck className="w-5 h-5" />;
      case 'course':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getUnitIcon = (title: string) => {
    if (title.toLowerCase().includes('drawing')) return <Pencil className="w-6 h-6" />;
    if (title.toLowerCase().includes('perspective')) return <Book className="w-6 h-6" />;
    if (title.toLowerCase().includes('composition')) return <Palette className="w-6 h-6" />;
    return <GraduationCap className="w-6 h-6" />;
  };

  const cardVariants = {
    collapsed: {
      width: '100%',
      height: '300px',
      position: 'relative' as const,
    },
    expanded: {
      width: '100vw',
      height: '100vh',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      zIndex: 50,
    },
  };

  const renderResource = (resource: Resource) => {
    switch (resource.type) {
      case 'course':
        return (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline"
          >
            {resource.title}
          </a>
        );
      
      case 'youtube':
        return (
          <div className="space-y-2 mt-2">
            {resource.videos!.map((video, vIndex) => (
              <a
                key={vIndex}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                {video.title}
              </a>
            ))}
          </div>
        );
      
      case 'book':
        return (
          <div>
            {resource.title} by {resource.author}
          </div>
        );
      
      case 'challenge':
        return (
          <div>
            {resource.url ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                {resource.title}
              </a>
            ) : (
              <div>{resource.title}</div>
            )}
            {resource.tasks && (
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {resource.tasks.map((task, tIndex) => (
                  <li key={tIndex}>{task}</li>
                ))}
              </ul>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`${colors.bg} rounded-xl shadow-lg overflow-hidden cursor-pointer border ${colors.border} mb-6`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div className="p-6 h-full overflow-y-auto bg-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-bold ${colors.text}`}>Term {termData.term}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className={`p-2 ${colors.hover} rounded-full transition-colors`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {termData.units.map((unit, index) => (
              <div 
                key={index} 
                className={`${colors.bg} rounded-lg p-6 border ${colors.border}`}
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {getUnitIcon(unit.title)}
                  {unit.title}
                </h2>
                <div className="space-y-4">
                  {unit.resources.map((resource, rIndex) => (
                    <div key={rIndex} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-700 mb-2">
                        {getIcon(resource.type)}
                        <span className="capitalize font-medium">{resource.type}</span>
                      </div>
                      {renderResource(resource)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-6 h-full flex flex-col`}>
          <div className="flex justify-between items-center mb-6">
            <div className={`${colors.accent} text-white px-4 py-1 rounded-full text-sm font-medium`}>
              Term {termData.term}
            </div>
            <ChevronDown className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div className="space-y-4 flex-grow">
            {termData.units.map((unit, index) => (
              <div key={index} className={`flex items-center gap-2 ${colors.text}`}>
                {getUnitIcon(unit.title)}
                <span className="font-medium">{unit.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {Array.from(new Set(termData.units.flatMap(unit => 
              unit.resources.map(resource => resource.type)
            ))).map((type) => (
              <div key={type} className={`flex items-center gap-1 ${colors.text} text-sm`}>
                {getIcon(type as Resource['type'])}
                <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Grid Layout Component
export const CurriculumGrid = ({ terms }: { terms: Term[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {terms.map((term) => (
        <CurriculumCard key={term.term} termData={term} />
      ))}
    </div>
  );
};