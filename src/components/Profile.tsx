import { useChallengesContext } from "../contexts/ChallengesContext/ChallengesContext";
import styles from "../styles/components/Profile.module.css";
import { useAuth } from "../contexts/auth-user-context/AuthUserContext";

export function Profile() {
  const { user } = useAuth();

  const { level } = useChallengesContext();

  return (
    <div className={styles.profileContainer}>
      <img src={user?.photoURL} alt="profile picture" />
      <div>
        <strong>{user?.displayName}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
