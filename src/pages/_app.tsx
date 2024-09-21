import "../styles/global.css";
import "noty/lib/noty.css";
import "noty/lib/themes/nest.css";

import { SessionProvider } from "next-auth/react";

import { AuthUserProvider } from "../contexts/AuthUserContext";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </SessionProvider>
  );
}

export default App;
