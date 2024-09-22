import "../styles/global.css";
import "noty/lib/noty.css";
import "noty/lib/themes/nest.css";

import { AuthUserProvider } from "../contexts/auth-user-context/AuthUserContext";

function App({ Component, pageProps: { user, ...pageProps } }) {
  return (
    <AuthUserProvider contextUser={user}>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default App;
