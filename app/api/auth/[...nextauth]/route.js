import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'

import User from '@models/user'

const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      ClientSectret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async signIn({ profile }) {
    try {
      await connectToDB()
      // check if a user already exists
      const userExists = await User.findOne({ email: profile.email })
      //if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          user: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        })
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
})

export { handlers as GET, handlers as POST }
