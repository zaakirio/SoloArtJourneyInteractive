'use client'
import { useState, useRef } from 'react';
import { Link, Play } from 'lucide-react';
// import { termColors } from '@/utils/termColours';
import { getIcon, getUnitIcon } from '@/utils/helper';


interface CurriculumCardProps {
  termData: Term;
}

const termColors = {
  1: { bg: 'bg-rose-50', accent: 'bg-rose-500', text: 'text-rose-700', hover: 'hover:bg-rose-100', border: 'border-rose-200' },
  2: { bg: 'bg-violet-50', accent: 'bg-violet-500', text: 'text-violet-700', hover: 'hover:bg-violet-100', border: 'border-violet-200' },
  3: { bg: 'bg-cyan-50', accent: 'bg-cyan-500', text: 'text-cyan-700', hover: 'hover:bg-cyan-100', border: 'border-cyan-200' },
  4: { bg: 'bg-amber-50', accent: 'bg-amber-500', text: 'text-amber-700', hover: 'hover:bg-amber-100', border: 'border-amber-200' },
  5: { bg: 'bg-emerald-50', accent: 'bg-emerald-500', text: 'text-emerald-700', hover: 'hover:bg-emerald-100', border: 'border-emerald-200' },
  6: { bg: 'bg-indigo-50', accent: 'bg-indigo-500', text: 'text-indigo-700', hover: 'hover:bg-indigo-100', border: 'border-indigo-200' },
  7: { bg: 'bg-fuchsia-50', accent: 'bg-fuchsia-500', text: 'text-fuchsia-700', hover: 'hover:bg-fuchsia-100', border: 'border-fuchsia-200' },
  8: { bg: 'bg-teal-50', accent: 'bg-teal-500', text: 'text-teal-700', hover: 'hover:bg-teal-100', border: 'border-teal-200' },
  9: { bg: 'bg-orange-50', accent: 'bg-orange-500', text: 'text-orange-700', hover: 'hover:bg-orange-100', border: 'border-orange-200' },
  10: { bg: 'bg-blue-50', accent: 'bg-blue-500', text: 'text-blue-700', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
};
export const CurriculumCard = ({ termData }: CurriculumCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [completedTasks, setCompletedTasks] = useState<{[key: string]: boolean}>({});
  const colors = termColors[termData.term as keyof typeof termColors];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  // useEffect(() => {
  //   const savedTasks = localStorage.getItem(`completedTasks-${termData.term}`);
  //   if (savedTasks) {
  //     setCompletedTasks(JSON.parse(savedTasks));
  //   }
  // }, [termData.term]);

  // const toggleTask = (taskId: string) => {
  //   const newCompletedTasks = {
  //     ...completedTasks,
  //     [taskId]: !completedTasks[taskId]
  //   };
  //   setCompletedTasks(newCompletedTasks);
  //   localStorage.setItem(`completedTasks-${termData.term}`, JSON.stringify(newCompletedTasks));
  // };

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    startY.current = e.pageY - (containerRef.current?.offsetTop || 0);
    scrollTop.current = containerRef.current?.scrollTop || 0;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    
    const y = e.pageY - (containerRef.current?.offsetTop || 0);
    const walk = (y - startY.current) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop.current - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isMouseDown.current = true;
    startY.current = e.touches[0].pageY - (containerRef.current?.offsetTop || 0);
    scrollTop.current = containerRef.current?.scrollTop || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMouseDown.current) return;
    
    const y = e.touches[0].pageY - (containerRef.current?.offsetTop || 0);
    const walk = (y - startY.current) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop.current - walk;
    }
  };

  const handleTouchEnd = () => {
    isMouseDown.current = false;
  };

  const renderResource = (resource: Resource) => {
    switch (resource.type) {
      case 'course':
        return (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex text-gray-800 font-body hover:shadow-sm transition-shadow duration-200 rounded-lg p-1">
            <span className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5"><Link className="w-full h-full" /></span>
            <span className="font-medium">{resource.title}</span>
          </a>
        );
      case 'youtube':
        return (
          <div className="space-y-2 mt-2">
            {resource.videos!.map((video, vIndex) => (
              <a key={vIndex} href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex text-gray-800 font-body hover:shadow-sm transition-shadow duration-200 rounded-lg p-1">
                <span className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5"><Play className="w-4 h-4" /></span>
                <span className="font-medium">{video.title}</span>
              </a>
            ))}
          </div>
        );
      case 'book':
        return (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex text-gray-800 font-body hover:shadow-sm transition-shadow duration-200 rounded-lg p-1">
            <span className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5"><Link className="w-full h-full" /></span>
            <span className="font-medium">{resource.title}</span>
          </a>
        );
      case 'challenge':
        return (
          <div className="font-body">
            {resource.url ? (
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex text-gray-800 font-body hover:shadow-sm transition-shadow duration-200 rounded-lg p-2">
                <span className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5"><Link className="w-full h-full" /></span>
                <span className="font-medium">{resource.title}</span>
              </a>
            ) : (
              <div className="font-medium">{resource.title}</div>
            )}
            {resource.tasks && (
              <ul className="mt-2 space-y-2">
                {resource.tasks.map((task, tIndex) => (
                  <li 
                    key={tIndex} 
                    className="flex gap-2 cursor-pointer select-none"
                    //onClick={() => toggleTask(`${resource.title}-${tIndex}`)}
                  >
                    <span className={`${colors.accent} text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm`}>
                      {tIndex + 1}
                    </span>
                    {/* <span className={completedTasks[`${resource.title}-${tIndex}`] ? 'line-through' : ''}> */}
                    <span>
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
    }
  };

  if (isExpanded) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setIsExpanded(false)}
      >
        <div 
          ref={containerRef}
          className={`${colors.bg} backdrop-blur-sm rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto select-none bg-opacity-80`}
          onClick={e => e.stopPropagation()}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="p-6">
            <h1 className={`text-3xl font-bold tracking-tight ${colors.text} mb-6`}>Term {termData.term}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {termData.units.map((unit, index) => (
                <div key={index} className={`${colors.bg} rounded-lg p-6 border ${colors.border}`}>
                  <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                    {getUnitIcon(unit.title)}
                    {unit.title}
                  </h2>
                  <div className="space-y-4">
                    {unit.resources.map((resource, rIndex) => (
                      <div key={rIndex} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          {getIcon(resource.type)}
                          <span className="capitalize tracking-tight font-bold">{resource.type}</span>
                        </div>
                        {renderResource(resource)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white/50 ${colors.bg} rounded-xl shadow-lg h-[300px] cursor-pointer border ${colors.border} mb-6 font-dot backdrop-blur-sm`}
      onClick={() => setIsExpanded(true)}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className={`${colors.accent} text-white px-5 py-2 rounded-full text-xl font-bold tracking-tight`}>
            Term {termData.term}
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          {termData.units.map((unit, index) => (
            <div key={index} className={`flex items-center gap-2 ${colors.text}`}>
              {getUnitIcon(unit.title)}
              <span className="tracking-tight font-medium">{unit.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          {Array.from(new Set(termData.units.flatMap(unit => 
            unit.resources.map(resource => resource.type)
          ))).map((type) => (
            <div key={type} className={`flex items-center gap-1 ${colors.text} text-sm font-medium tracking-tight`}>
              {getIcon(type as Resource['type'])}
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CurriculumGrid = ({ terms }: { terms: Term[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {terms.map((term) => (
        <CurriculumCard key={term.term} termData={term} />
      ))}
    </div>
  );
};