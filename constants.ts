// The secret order required by the prompt
export const SECRET_ORDER = [
  "Mission",
  "DDIL",
  "DevOps",
  "Core",
  "UI",
  "Effects",
  "Semantics",
  "Sensemaking",
  "AI",
  "Aggressor"
];

// Helper to shuffle an array (Fisher-Yates)
export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};