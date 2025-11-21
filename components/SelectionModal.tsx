import React, { useEffect, useState } from "react";
import { X, Check, Ban } from "lucide-react";
import { Team } from "../types";

interface SelectionModalProps {
  team: Team | null;
  isOpen: boolean;
  onConfirm: (team: Team) => void;
  onCancel: () => void;
}

export const SelectionModal: React.FC<SelectionModalProps> = ({
  team,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`
      fixed inset-0 z-50 flex items-center justify-center p-4
      transition-all duration-300
      ${isOpen ? "bg-black/80 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none pointer-events-none"}
    `}
    >
      <div
        className={`
        w-full max-w-md bg-[#1e1e1e] border-2 border-brand-gold rounded-2xl shadow-[0_0_50px_rgba(151,133,97,0.2)]
        transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-8"}
      `}
      >
        {/* Header */}
        <div className="bg-brand-gold/10 p-6 border-b border-brand-gold/20 rounded-t-2xl text-center">
          <h3 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">
            Selected Team
          </h3>
          <div className="text-4xl font-bold text-white tracking-tight">
            {team?.name}
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-gray-400 text-center mb-8 leading-relaxed">
            It is{" "}
            <span className="text-brand-gold font-semibold">{team?.name}</span>
            's turn to present. Are they ready to proceed?
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onCancel}
              className="
                flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white
                transition-all duration-200 font-medium
              "
            >
              <Ban size={18} />
              Decide Against
            </button>

            <button
              onClick={() => team && onConfirm(team)}
              className="
                flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                bg-brand-gold text-brand-dark hover:bg-[#b39f6f]
                transition-all duration-200 font-bold shadow-lg shadow-brand-gold/20
              "
            >
              <Check size={18} />
              Select Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

