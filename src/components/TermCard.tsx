// components/TermCard.tsx
import React from 'react';

interface Topic {
  id: number;
  title: string;
  resources: string[];
}

interface Term {
  id: number;
  title: string;
  topics?: Topic[];
  locked?: boolean;
  affiliateLink?: string;
}

interface TermCardProps {
  term: Term;
}

export const TermCard: React.FC<TermCardProps> = ({ term }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{term.title}</h2>
      {term.locked ? (
        <a
          href={term.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Unlock Term {term.id} on Gumroad
        </a>
      ) : (
        <div>
          {term.topics?.map((topic) => (
            <div key={topic.id} className="mb-4">
              <h3 className="text-xl font-medium">{topic.title}</h3>
              <ul className="list-disc list-inside">
                {topic.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
