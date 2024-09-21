import styles from "styles/pages/Login.module.css";
import { signIn, signOut } from "next-auth/react";
import { auth } from "lib/firebase";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <img src="/logo-full-white.svg" alt="logo-full" width="300" />
        <div className={styles.loginForm}>
          <h1>Bem-vindo</h1>
          <p>Faça login para começar</p>
          <div className={styles.inputGroup}>
            <button onClick={() => signIn("google", { callbackUrl: "/home" })}>
              <img src="/icons/google.svg" alt="google" />
              Login com Google
            </button>
            <button
              onClick={async () => {
                await signOut({ callbackUrl: "/api/auth/logout" });
                await auth.signOut();
              }}
            >
              <img src="/icons/google.svg" alt="google" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
