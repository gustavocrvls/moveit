import { ReactNode } from "react";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

export interface ChallengesContextData {
  email: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export interface ChallengesProviderProps {
  children: ReactNode;
  email: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
