import Head from "next/head";
import { GetServerSideProps } from "next";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface HomeProps {
  email: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      email={props.email}
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Moveit</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div className={styles.userContainer}>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div className={styles.challengeContainer}>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { moveituser } = ctx.req.cookies;

  const user = moveituser ? JSON.parse(moveituser) : null;

  if (user) {
    try {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      const { current_experience, challenges_completed, level } =
        docSnap.data();

      return {
        props: {
          email: user.email === undefined ? "" : user.email,
          level: Number(level),
          currentExperience: Number(current_experience),
          challengesCompleted: Number(challenges_completed),
        },
      };
    } catch (err) {
      setDoc(doc(db, "users", user.email), {
        challenges_completed: 0,
        current_experience: 0,
        level: 1,
        email: user.email,
      });

      return {
        props: {
          email: user.email,
          level: Number(0),
          currentExperience: Number(0),
          challengesCompleted: Number(0),
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
};
