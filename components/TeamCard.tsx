import React from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
  onToggle: (id: string) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(team.id)}
      className={`
        relative group cursor-pointer transition-all duration-300 ease-in-out
        border rounded-xl p-4 flex items-center justify-between
        ${team.isCompleted 
          ? 'bg-brand-panel/30 border-gray-700 opacity-60 scale-[0.98]' 
          : 'bg-brand-panel border-brand-gold/30 hover:border-brand-gold hover:shadow-[0_0_15px_rgba(151,133,97,0.3)] hover:-translate-y-1'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-3 h-3 rounded-full transition-colors duration-300
          ${team.isCompleted ? 'bg-gray-600' : 'bg-brand-gold'}
        `} />
        <span className={`
          text-lg font-medium tracking-wide transition-all duration-300
          ${team.isCompleted ? 'text-gray-500 line-through decoration-2 decoration-brand-gold/50' : 'text-white'}
        `}>
          {team.name}
        </span>
      </div>

      <div className="text-brand-gold">
        {team.isCompleted ? (
          <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-brand-gold transition-colors">
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Restore</span>
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold">
             <Check size={20} />
          </div>
        )}
      </div>
    </div>
  );
};