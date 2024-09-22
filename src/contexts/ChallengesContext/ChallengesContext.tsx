import { createContext, useContext, useEffect, useState } from "react";
import challenges from "../../../challenges.json";
import LevelUpModal from "../../components/LevelUpModal";
import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../auth-user-context/AuthUserContext";
import {
  ChallengesContextData,
  ChallengesProviderProps,
} from "./ChallengesContext.types";

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const { user } = useAuth();

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const getChallengeData = async () => {
    try {
      const docRef = doc(db, "users", user?.email);

      const docSnap = await getDoc(docRef);

      const { currentExperience, challengesCompleted, level } = docSnap.data();

      return { currentExperience, challengesCompleted, level };
    } catch {
      return { currentExperience: 0, challengesCompleted: 0, level: 1 };
    }
  };

  useEffect(() => {
    Notification.requestPermission();

    getChallengeData().then(
      ({
        challengesCompleted: _challengesCompleted,
        currentExperience: _currentExperience,
        level: _level,
      }) => {
        setChallengesCompleted(_challengesCompleted);
        setCurrentExperience(_currentExperience);
        setLevel(_level);
      }
    );
  }, []);

  function levelUp() {
    const newLevel = level + 1;

    setLevel(newLevel);
    setIsLevelUpModalOpen(true);

    return newLevel;
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    let newLevel = level;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      newLevel = levelUp();
    }

    setDoc(doc(db, "users", user?.email), {
      challengesCompleted: challengesCompleted + 1,
      currentExperience: finalExperience,
      level: newLevel,
      email: user?.email,
    });

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        email: user?.email,
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}

export const useChallengesContext = () => useContext(ChallengesContext);
