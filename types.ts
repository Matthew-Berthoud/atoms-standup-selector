export interface Team {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface SelectionResult {
  team: Team | null;
  isFinished: boolean;
}