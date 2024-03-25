import connectDB from "@/config/database";
import User from "@/model/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECERET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_PASSWARD,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoke on succesful sigin
    async signIn({ account, profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });
      console.log("userExists", userExists);
      if (!userExists) {
        //  Truncate username if too long

        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },
    //1.   connect to db
    //2. check if user exists
    //3. if not , then add to the database
    //4. return true to allow sign in

    async session({ session }) {
      console.log("Session Callback Invoked");
      console.log("Session Object:", session);
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        console.log("User Found:", user);
        session.user.id = user._id.toString();
        return session;
      } else {
        console.log("User Not Found in Database");
        return session;
      }
    },
  },
};
