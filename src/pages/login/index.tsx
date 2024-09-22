import styles from "../../styles/pages/Login.module.css";
import { useAuth } from "../../contexts/auth-user-context/AuthUserContext";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <img src="/logo-full-white.svg" alt="logo-full" width="300" />
        <div className={styles.loginForm}>
          <h1>Bem-vindo</h1>
          <p>Faça login para começar</p>
          <div className={styles.inputGroup}>
            <button onClick={signIn}>
              <img src="/icons/google.svg" alt="google" />
              Login com Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
