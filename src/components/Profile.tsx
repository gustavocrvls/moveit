import styles from '../styles/components/Profile.module.css';

export function Profile () {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/gustavocrvls.png" alt="gustavocrvls"/>
      <div>
        <strong>Gustavo Carvalho Silva</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}
