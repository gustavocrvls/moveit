import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";

import { getConfig } from "./get-config";
import { db } from "lib/firebase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-ignore
  adapter: FirestoreAdapter(db),
  providers: [
    GoogleProvider({
      clientId: getConfig().auth.google.clientId,
      clientSecret: getConfig().auth.google.clientSecret,
    }),
  ],
});
