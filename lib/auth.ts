import { getServerSession } from "next-auth"
import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
import EmailProvider from "next-auth/providers/email"
import { createTransport } from "nodemailer"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error('Invalid credentials');
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email
    //       },
    //       select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         emailVerified: true,
    //         image: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         hashedPassword: true
    //       }
    //     });

    //     if (!user || !user?.hashedPassword) {
    //       throw new Error('Invalid credentials');
    //     }

    //     const isCorrectPassword = await bcrypt.compare(
    //       credentials.password,
    //       user.hashedPassword
    //     );

    //     if (!isCorrectPassword) {
    //       throw new Error('Invalid credentials');
    //     }

    //     return user;
    //   }
    // })
  ],
  // session: {
  //   strategy: "jwt"
  // },
  pages: {
    signIn: '/login',
   // signOut: '/logout',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    // async session({ token, session }) {
    //   if (token) {
    //     session.user.id = token.id
    //     session.user.name = token.name
    //     session.user.email = token.email
    //     session.user.image = token.picture
    //   }
    //   return session
    // },
    // async jwt({ token, user }) {
    //   const dbUser = await prisma.user.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   })

    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user?.id
    //     }
    //     return token
    //   }

    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image
    //   }
    // }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

export const getAuthSession = () => getServerSession(authOptions)
export { signOut as handleSignOut } from "next-auth/react"

