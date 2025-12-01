import React from 'react';
import { Book as BookIcon, ExternalLink } from 'lucide-react';
import { getBookForMonth } from '../data/books';

export const BookRecommendation: React.FC = () => {
  const book = getBookForMonth();
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(book.title + " " + book.author + " book")}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <BookIcon size={16} className="text-stone-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Book of the Month</span>
      </div>

      <div className="flex gap-4">
        {/* Abstract Book Cover */}
        <div className={`w-16 h-24 shrink-0 rounded shadow-md ${book.coverColor} flex flex-col justify-between p-1.5`}>
          <div className="w-full h-1 bg-white/20 rounded-full"></div>
          <div className="space-y-1">
             <div className="w-2/3 h-0.5 bg-white/30"></div>
             <div className="w-full h-0.5 bg-white/30"></div>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-ink leading-tight mb-1">{book.title}</h3>
          <p className="text-xs text-stone-500 mb-2">by {book.author}</p>
          <p className="text-sm text-stone-600 leading-snug mb-3">
            "{book.description}"
          </p>
          <a 
            href={searchUrl} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-orange-700 transition-colors"
          >
            Learn more <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
};