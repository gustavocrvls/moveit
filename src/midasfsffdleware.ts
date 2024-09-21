import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token");

      console.log(sessionToken);

      if (sessionToken) return true;
      else return false;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = { matcher: ["/home"] };
