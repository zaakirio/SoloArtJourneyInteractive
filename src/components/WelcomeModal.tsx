'use client'

import { useState, useEffect } from 'react';
import { X, GraduationCap, BookOpen, Youtube, BookmarkCheck } from 'lucide-react';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl transform transition-all animate-slide-up">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-violet-100 p-2.5 rounded-lg flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-violet-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Solo Art Journey
          </h2>
        </div>
        
        <div className="space-y-6 text-gray-600">
          <p className="text-lg leading-relaxed">
            Your comprehensive guide to mastering art through a structured, self-paced curriculum.
          </p>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">What you'll find here:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-rose-100 p-2 rounded-lg flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-rose-600" />
                </div>
                <span className="pt-0.5">9 carefully structured terms covering art fundamentals to advanced techniques</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-violet-100 p-2 rounded-lg flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-violet-600" />
                </div>
                <span className="pt-0.5">Curated resources including books, videos, courses, and practical challenges</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-cyan-100 p-2 rounded-lg flex-shrink-0">
                  <Youtube className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="pt-0.5">Interactive curriculum cards with expandable views for detailed information</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                  <BookmarkCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="pt-0.5">Progress tracking to help you stay on course (beta)</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-400 mt-8 italic">
            Click anywhere outside this modal or the X button to dismiss.
          </p>
        </div>
      </div>
    </div>
  );
}; 