
import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import Apple from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"
import Auth0 from "next-auth/providers/auth0"
import AzureB2C from "next-auth/providers/azure-ad-b2c"
import BankIDNorway from "next-auth/providers/bankid-no"
import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
import Cognito from "next-auth/providers/cognito"
import Coinbase from "next-auth/providers/coinbase"
import Discord from "next-auth/providers/discord"
import Dropbox from "next-auth/providers/dropbox"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
import Hubspot from "next-auth/providers/hubspot"
import Keycloak from "next-auth/providers/keycloak"
import LinkedIn from "next-auth/providers/linkedin"
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"
import Netlify from "next-auth/providers/netlify"
import Okta from "next-auth/providers/okta"
import Passage from "next-auth/providers/passage"
import Passkey from "next-auth/providers/passkey"
import Pinterest from "next-auth/providers/pinterest"
import Reddit from "next-auth/providers/reddit"
import Slack from "next-auth/providers/slack"
import Salesforce from "next-auth/providers/salesforce"
import Spotify from "next-auth/providers/spotify"
import Twitch from "next-auth/providers/twitch"
import Twitter from "next-auth/providers/twitter"
import Vipps from "next-auth/providers/vipps"
import WorkOS from "next-auth/providers/workos"
import Zoom from "next-auth/providers/zoom"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import bcrypt from 'bcryptjs'
import { createTransport } from "nodemailer"
import { verifyToken } from 'node-2fa'
const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    
    Apple,
    // Atlassian,
    //Auth0,
    //AzureB2C,
    //BankIDNorway,
    // BoxyHQSAML({
    //   clientId: "dummy",
    //   clientSecret: "dummy",
    //   issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    // }),
    // Cognito,
    // Coinbase,
    // Discord,
    // Dropbox,
    // Facebook,
    GitHub,
    // GitLab,
    Google,
    // Hubspot,
    // Keycloak({ name: "Keycloak (bob/bob)" }),
    // LinkedIn,
    // MicrosoftEntraId,
    // Netlify,
    // Okta,
    Passkey({
      formFields: {
        email: {
          label: "Username",
          required: true,
          autocomplete: "username webauthn",
        },
      },
    }),
    // Passage,
    // Pinterest,
    // Reddit,
    // Salesforce,
    // Slack,
    // Spotify,
    // Twitch,
    // Twitter,
    // Vipps({
    //   issuer: "https://apitest.vipps.no/access-management-1.0/access/",
    // }),
    // WorkOS({ connection: process.env.AUTH_WORKOS_CONNECTION! }),
     Zoom,
     
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            password: true
          }
        });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  basePath: "/auth",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
   // signOut: '/logout',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    // async session({ session, user }) {
    //   session.user.id = user.id
    //   return session
    // },
    async signIn({ user, account }) {
      // Skip 2FA for OAuth providers
      if (account?.provider !== 'credentials') {
        return true
      }

      // Check if user has 2FA enabled
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id }
      })
      console.log('dbUser',dbUser)
      if (!dbUser?.twoFactorEnabled) {
        return true
      }
          // Store user ID in session for 2FA verification
      return `/auth/verify-2fa?userId=${user.id}`
      // if (user.twoFactorEnabled) {
      //   // Implement 2FA verification flow
      //   const verified = verifyToken(user.twoFactorSecret, token)
      //   if (!verified) {
      //     return false
      //   }
      // }
      // return true
    },
    //  session:async ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),

    async session({ session, token }) {
      console.log('======session======',session)
      console.log('========token=====',token)
      if (session.user) {
        session.user.role = token.role
      }
      console.log('======session with role======',session)
      return session
    },
    async jwt({ token, user }) {
      console.log('mmuser',user)
      console.log('jwttoken',token)
      if (user) {
        token.role = user.role
      }
      return token
     }
  }
})

export { signOut as handleSignOut } 

