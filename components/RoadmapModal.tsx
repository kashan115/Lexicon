import React from 'react';
import { X, Lock, CheckCircle, BookOpen } from 'lucide-react';
import { COURSE_DAYS } from '../data/courseData';
import { CourseDay } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  completedDays: number[];
  currentDay: number;
  onSelectDay: (day: CourseDay) => void;
}

export const RoadmapModal: React.FC<Props> = ({ isOpen, onClose, completedDays, currentDay, onSelectDay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-paper/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-serif font-bold text-ink">30-Day Writing Journey</h2>
            <p className="text-stone-500 text-sm mt-1">Build your writing habit, one day at a time.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COURSE_DAYS.map((day) => {
            const isCompleted = completedDays.includes(day.day);
            const isCurrent = currentDay === day.day;
            const isLocked = false; // For now, let's keep everything unlocked so users can browse.

            return (
              <button
                key={day.day}
                onClick={() => {
                   onSelectDay(day);
                   onClose();
                }}
                disabled={isLocked}
                className={`
                  relative flex flex-col items-start p-4 rounded-xl border text-left transition-all group
                  ${isCurrent 
                    ? 'border-accent bg-orange-50 ring-2 ring-accent ring-offset-2' 
                    : isCompleted 
                      ? 'border-green-200 bg-green-50/50' 
                      : 'border-stone-200 bg-white hover:border-accent/50 hover:shadow-md'
                  }
                `}
              >
                <div className="flex justify-between w-full mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-accent' : 'text-stone-400'}`}>
                    Day {day.day}
                  </span>
                  {isCompleted && <CheckCircle size={16} className="text-green-500" />}
                </div>
                
                <h3 className="font-serif font-bold text-ink mb-1 leading-tight group-hover:text-accent transition-colors">
                  {day.title}
                </h3>
                <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2 py-0.5 rounded-full mt-auto">
                  {day.focus}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-stone-100 bg-stone-50 rounded-b-2xl">
           <div className="flex items-center gap-3 text-sm text-stone-600">
             <BookOpen size={18} className="text-accent" />
             <span>Complete <strong>{completedDays.length}</strong> / 30 days to master the basics of creative writing.</span>
           </div>
        </div>

      </div>
    </div>
  );
};
