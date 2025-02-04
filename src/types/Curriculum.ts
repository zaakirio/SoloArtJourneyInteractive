type Resource = {
  type: 'course' | 'youtube' | 'book' | 'challenge';
  title?: string;
  url?: string;
  author?: string;
  videos?: {
    title: string;
    url: string;
  }[];
  tasks?: string[];
};

type Unit = {
  title: string;
  resources: Resource[];
};
/* eslint-disable @typescript-eslint/no-unused-vars */
type Term = {
  term: number;
  units: Unit[];
};