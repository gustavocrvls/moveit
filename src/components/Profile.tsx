import { useChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";
import { useSession } from "next-auth/react";

export function Profile() {
  const { level } = useChallengesContext();
  const { data } = useSession();

  return (
    <div className={styles.profileContainer}>
      <img src={data?.user?.image} alt="profile picture" />
      <div>
        <strong>{data?.user?.name}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
