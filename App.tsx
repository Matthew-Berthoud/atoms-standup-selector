import React, { useState, useEffect, useCallback } from "react";
import { Dices, RotateCw, Users } from "lucide-react";
import { TeamCard } from "./components/TeamCard";
import { SelectionModal } from "./components/SelectionModal";
import { SpeakingView } from "./components/SpeakingView";
import { SECRET_ORDER, shuffleArray } from "./constants";
import { Team } from "./types";

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speakingTeam, setSpeakingTeam] = useState<Team | null>(null);

  // Initialize teams on mount - Randomize VISUAL order, but data maintains ID links to Secret Order
  useEffect(() => {
    initializeTeams();
  }, []);

  const initializeTeams = () => {
    const initialTeams: Team[] = SECRET_ORDER.map((name) => ({
      id: name, // ID matches the name for easy lookup in secret order
      name,
      isCompleted: false,
    }));
    // Randomize the visual list initially
    setTeams(shuffleArray(initialTeams));
  };

  // The "Secret" Sauce: Find the first team in the SECRET_ORDER that isn't completed
  const pickNextTeam = useCallback(() => {
    if (isThinking) return;

    setIsThinking(true);

    // Fake "thinking" delay for effect
    setTimeout(() => {
      const nextTeamId = SECRET_ORDER.find((name) => {
        const teamState = teams.find((t) => t.id === name);
        return teamState && !teamState.isCompleted;
      });

      if (nextTeamId) {
        const team = teams.find((t) => t.id === nextTeamId) || null;
        setSelectedTeam(team);
        setIsModalOpen(true);
      } else {
        // No teams left
        alert("All teams have been selected! Resetting board recommended.");
      }
      setIsThinking(false);
    }, 800);
  }, [teams, isThinking]);

  const handleConfirmSelection = (team: Team) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === team.id ? { ...t, isCompleted: true } : t)),
    );
    setIsModalOpen(false);
    setSelectedTeam(null);
    setSpeakingTeam(team);
  };

  const handleCancelSelection = () => {
    // Just close the modal, effectively "putting them back" or skipping without crossing off
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  const toggleTeamStatus = (id: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const resetBoard = () => {
    if (window.confirm("Are you sure you want to reset the standup?")) {
      initializeTeams();
      setSpeakingTeam(null);
    }
  };

  // Count active teams
  const remainingCount = teams.filter((t) => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#121212] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2a2415] to-[#121212] text-gray-200 font-sans selection:bg-brand-gold selection:text-brand-dark pb-20">
      {/* Navbar / Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-gold/10 p-2 rounded-lg border border-brand-gold/20">
              <Users className="text-brand-gold" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                ATOMS{" "}
                <span className="text-brand-gold">Standup of Standups</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                Team Picker
              </p>
            </div>
          </div>

          <button
            onClick={resetBoard}
            className="text-gray-500 hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-brand-gold/10"
            title="Reset Board"
          >
            <RotateCw size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-10">
        {/* Action Area Container - Fixed Min-Height to prevent Jitter */}
        <div className="min-h-[400px] flex flex-col items-center justify-center mb-8 transition-all duration-300 ease-in-out">
          {speakingTeam ? (
            <SpeakingView
              team={speakingTeam}
              onFinish={() => setSpeakingTeam(null)}
            />
          ) : (
            /* Hero Section / Action Area */
            <div className="flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Who's up next?
                </h2>
                <p className="text-gray-400">
                  {remainingCount === 0
                    ? "All teams have presented."
                    : `${remainingCount} teams remaining in the queue.`}
                </p>
              </div>

              <button
                onClick={pickNextTeam}
                disabled={isThinking || remainingCount === 0}
                className={`
                  relative group overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-4 focus:ring-brand-gold/30
                  transition-all duration-300 hover:scale-105 active:scale-95
                  ${remainingCount === 0 ? "opacity-50 cursor-not-allowed grayscale" : ""}
                `}
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#978561_50%,#121212_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#1a1a1a] px-12 py-6 text-xl font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-[#262626]">
                  <span className="flex items-center gap-3">
                    {isThinking ? (
                      <>
                        <RotateCw className="animate-spin text-brand-gold" />
                        <span className="text-brand-gold">Selecting...</span>
                      </>
                    ) : (
                      <>
                        <Dices
                          className={
                            remainingCount > 0
                              ? "text-brand-gold"
                              : "text-gray-500"
                          }
                        />
                        <span
                          className={
                            remainingCount > 0 ? "text-white" : "text-gray-500"
                          }
                        >
                          {remainingCount > 0 ? "Select Team" : "Finished"}
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Grid of Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} onToggle={toggleTeamStatus} />
          ))}
        </div>

        {/* Empty State / Footer Info */}
        <div className="mt-16 text-center border-t border-white/5 pt-8">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Pie Guy Enterprises
          </p>
        </div>
      </main>

      <SelectionModal
        isOpen={isModalOpen}
        team={selectedTeam}
        onConfirm={handleConfirmSelection}
        onCancel={handleCancelSelection}
      />
    </div>
  );
};

export default App;

