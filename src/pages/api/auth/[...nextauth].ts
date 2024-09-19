import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getConfig } from "../../../config/get-config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: getConfig().auth.google.clientId,
      clientSecret: getConfig().auth.google.clientSecret,
    }),
  ],
};

export default NextAuth(authOptions);
