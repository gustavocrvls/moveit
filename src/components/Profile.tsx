import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile () {
  const [name, setName] = useState('');
  const { level, username } = useContext(ChallengesContext);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => setName(data.name))
  }, [])

  return (
    <div className={styles.profileContainer}>
      <img src={`https://github.com/${username}.png`} alt="gustavocrvls"/>
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
