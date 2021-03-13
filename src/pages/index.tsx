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
  const { username, level, currentExperience, challengesCompleted } = ctx.req.cookies;

  // const response = await db.collection('users').doc('gustavocrvls').get()
  // const { current_experience, challenges_completed, level } = response.data();

  console.log( 'result', username === undefined ? '' : username)

  return {
    props: {
      username: username === undefined ? '' : username,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
