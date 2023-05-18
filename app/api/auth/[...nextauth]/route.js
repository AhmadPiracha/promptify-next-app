import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";

import user from "@models/user";
const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDatabase();

        const userExists = await user.findOne({ email: session.user.email });
        if (userExists) {
          session.user.username = userExists.username;
        }
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const userExists = await user.findOne({ email: profile.email });
        if (!userExists) {
          await user.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handlers as GET, handlers as POST };
