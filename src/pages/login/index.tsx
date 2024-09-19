import styles from "../../styles/pages/Login.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthUserContext";
import { useRouter } from "next/router";

export default function Login() {
  const { setUser } = useAuth();
  const router = useRouter();

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  //E83F5B

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <img src="/logo-full-white.svg" alt="logo-full" width="300"></img>
        <div className={styles.loginForm}>
          <h1>Bem-vindo</h1>
          <p>
            <img src="/icons/github.svg" alt="github"></img>
            Faça login com seu Github para começar
          </p>
          <button className={styles.button} onClick={signIn}>
            Login com Google
          </button>
        </div>
      </div>
    </div>
  );
}
