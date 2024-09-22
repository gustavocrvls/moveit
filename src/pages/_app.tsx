import "../styles/global.css";

import { AuthUserProvider } from "../contexts/auth-user-context/AuthUserContext";

function App({ Component, pageProps: { user, ...pageProps } }) {
  return (
    <AuthUserProvider contextUser={user}>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default App;
