import { BookOpen, Youtube, BookmarkCheck, GraduationCap, Pencil, Book, Palette } from "lucide-react";

export const getIcon = (type: Resource['type']) => {
  switch (type) {
    case 'book': return <BookOpen className="w-6 h-6" />;
    case 'youtube': return <Youtube className="w-6 h-6" />;
    case 'challenge': return <BookmarkCheck className="w-6 h-6" />;
    case 'course': return <GraduationCap className="w-6 h-6" />;
    default: return null;
  }
};

export const getUnitIcon = (title: string) => {
  if (title.toLowerCase().includes('drawing')) return <Pencil className="w-6 h-6" />;
  if (title.toLowerCase().includes('perspective')) return <Book className="w-6 h-6" />;
  if (title.toLowerCase().includes('composition') || title.toLowerCase().includes('painting')) return <Palette className="w-6 h-6" />;
  return <GraduationCap className="w-6 h-6" />;
};