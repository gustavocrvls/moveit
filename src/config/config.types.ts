type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseUrl: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

type GoogleAuthConfig = {
  clientId: string;
  clientSecret: string;
};

type Auth = {
  google: GoogleAuthConfig;
};

export type Config = {
  firebase: FirebaseConfig;
  auth: Auth;
};
