import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { db } from '../services/firebase';

interface HomeProps {
  username: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      username={props.username}
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.req.cookies;

  try {
    const response = await db.collection('users').doc(username).get();
    const { current_experience, challenges_completed, level } = response.data();

    return {
      props: {
        username: username === undefined ? '' : username,
        level: Number(level),
        currentExperience: Number(current_experience),
        challengesCompleted: Number(challenges_completed),
      }
    }
  } catch (err) {
    db.collection('users').doc(username).set({
      challenges_completed: 0,
      current_experience: 0,
      level: 1,
      username,
    });

    return {
      props: {
        username: username,
        level: Number(0),
        currentExperience: Number(0),
        challengesCompleted: Number(0),
      }
    }
  }
}
