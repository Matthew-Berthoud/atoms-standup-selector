import React from 'react';
import { Check } from 'lucide-react';
import { Team } from '../types';

interface SpeakingViewProps {
  team: Team;
  onFinish: () => void;
}

export const SpeakingView: React.FC<SpeakingViewProps> = ({ team, onFinish }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-300">
      {/* Sound Wave Animation - Compacted */}
      <div className="flex items-end justify-center gap-1.5 h-16 mb-6">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 bg-brand-gold rounded-full animate-sound"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1.2s',
              height: '20%' 
            }}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
          {team.name}
        </h2>
        <p className="text-sm md:text-base text-brand-gold font-bold uppercase tracking-[0.25em] animate-pulse">
          is speaking
        </p>
      </div>

      <button
        onClick={onFinish}
        className="
          group relative flex items-center gap-3 px-8 py-4
          bg-[#1a1a1a] hover:bg-[#262626] 
          border border-brand-gold/30 hover:border-brand-gold
          rounded-full transition-all duration-300 
          hover:shadow-[0_0_20px_rgba(151,133,97,0.15)]
          active:scale-95
        "
      >
        <div className="bg-brand-gold/20 p-1.5 rounded-full group-hover:bg-brand-gold transition-colors duration-300">
          <Check className="text-brand-gold group-hover:text-[#1a1a1a] w-4 h-4 transition-colors duration-300" />
        </div>
        <span className="text-base text-gray-200 group-hover:text-white font-bold tracking-wide">
          Finish Turn
        </span>
      </button>

      <style>{`
        @keyframes sound {
          0% { height: 20%; opacity: 0.3; }
          30% { height: 100%; opacity: 1; }
          60% { height: 50%; opacity: 0.6; }
          80% { height: 75%; opacity: 0.8; }
          100% { height: 20%; opacity: 0.3; }
        }
        .animate-sound {
          animation: sound 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};