import User from "@models/User";
import { ConnectedToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {

        //to keep data about user in every single time
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })

            //set userId in session in order to access later
            session.user.id = sessionUser._id.toString();
            return session
        },
        //singIn function will created automatic a user
        async signIn({ profile }) {
            try {
                await ConnectedToDB();

                //1. check if user already exist.
                const userExist = await User.findOne({ email: profile.email })
                //2. if not, create a new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log('error00000000000000000000000000000000000')
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }