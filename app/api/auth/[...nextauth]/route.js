import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

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
        const userExists = await User.findOne({ email: session.user.email });
        session.user.id = userExists._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  // async session({ session }) {
  //   try {
  //     const userExists = await User.findOne({ email: session.user.email });
  //     session.user.id = userExists._id.toString();
  //     return session;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  // async signIn({ profile }) {
  //   try {
  //     await connectToDatabase();

  //     const userExists = await User.findOne({ email: profile.email });
  //     if (!userExists) {
  //       await User.create({
  //         email: profile.email,
  //         username: profile.name.replace(" ", "").toLowerCase(),
  //         image: profile.image,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
});

export { handlers as GET, handlers as POST };
