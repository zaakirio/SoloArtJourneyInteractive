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

type Term = {
  term: number;
  units: Unit[];
};