import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/db';
import { signJwtAccessToken } from '@/lib/jwt';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please provide NEXTAUTH_SECRET environment variable');
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Missing email or password.');
          }

          await dbConnect();

          const user = await User.findOne({ email: credentials.email.toLowerCase() }).select('+password');
          if (!user) {
            throw new Error('No user found with this email.');
          }

          if (user.provider === 'google') {
            throw new Error('Please sign in with Google.');
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Invalid password.');
          }

          const { password: _, ...userWithoutPassword } = user.toObject();
          return userWithoutPassword;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id || user._id;
        token.role = user.role;
        token.provider = account?.provider;
        
        if (account?.provider === 'credentials') {
          token.accessToken = signJwtAccessToken({ id: user.id || user._id });
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.provider = token.provider as string;
        if (token.accessToken) {
          session.accessToken = token.accessToken as string;
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        await dbConnect();

        if (account?.provider === 'google' && profile?.email) {
          const email = profile.email.toLowerCase();
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            if (existingUser.provider === 'credentials') {
              return '/error?error=CredentialsSignin';
            }

            if (!existingUser.googleId || !existingUser.profileImage) {
              await User.findByIdAndUpdate(existingUser._id, {
                provider: 'google',
                googleId: profile.sub,
                isEmailVerified: true,
                username: profile.name || existingUser.username,
                profileImage: profile.image || existingUser.profileImage,
              });
            }
          } else {
            await User.create({
              email,
              username: profile.name || `user_${profile.sub}`,
              provider: 'google',
              googleId: profile.sub,
              isEmailVerified: true,
              profileImage: profile.image,
              role: 'user',
            });
          }
        }

        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };