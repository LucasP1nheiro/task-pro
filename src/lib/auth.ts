// lib/auth/index.ts
import GoogleProvider from 'next-auth/providers/google'
import { eq } from 'drizzle-orm'
import { DrizzleAdapter } from './drizzle-adapter'
import { db } from '@/db'
import { users } from '../db/schema'
import { getServerSession, type NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email || ''))
        .limit(1)

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },

    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => {
  const auth = getServerSession(authOptions)

  return auth
}
