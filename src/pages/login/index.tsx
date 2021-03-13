import { useState } from 'react';
import Router from 'next/router'
import Cookies from 'js-cookie';
import styles from '../../styles/pages/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  function login() {
    Cookies.set('username', String(username));
    Router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <img src="/logo-full-white.svg" alt="logo-full" width="300"></img>
        <div className={styles.loginForm}>
          <h1>Bem Vindo</h1>
          <p>
            <img src="/icons/github.svg" alt="github"></img>
            Faça login com seu Github para começar
          </p>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Digite seu username"
            />
            <button onClick={login}><img src="/icons/arrow.svg" alt="github"></img></button>
          </div>
        </div>
      </div>
    </div>
  )
}
