import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { endpointUrl } from "src/services/server";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const result = (await axios
          .post(`${endpointUrl}/user-account/sign-in`, credentials)
          .then((response) => {
            const userAccount = {
              firstName: response.data.data[0].user.first_name,
              lastName: response.data.data[0].user.last_name,
              email,
              userPasword: password,
              userToken: response.data.data[0].token,
              userRequest: req,
              userData: response.data,
            };

            return { token: userAccount };
          })
          .catch((error) => {
            throw new Error(error.response.data.message);
          })) || { networkError: "Network Issues" };
        return { id: "result", token: result };
      },
    }),

    // 🔑 Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, trigger, account, profile, session }) => {
      // Handle Google login
      if (account?.provider === "google") {
        token.user = {
          id: profile?.sub,
          email: profile?.email,
          name: profile?.name,
          // picture: profile?.picture,
          provider: "google",
        };
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/guest/signin",
    signOut: "/guest/logout",
  },
};

export default NextAuth(authOptions);
