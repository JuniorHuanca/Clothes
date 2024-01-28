import { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import type { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req): Promise<User> {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          throw new Error(
            "No se encontró ningún usuario con ese correo. Por favor, regístrese."
          );
        }
        if (!credentials || !user.password) {
          throw new Error("Se requiere la contraseña");
        }
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          throw new Error("La contraseña no coincide con esta cuenta.");
        }
        return user;
      },
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          roleId: 1, // 1 = Usuario, 2 = Administrador, 3 = Delivery
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    jwt: async (params) => {
      const user = await prisma.user.findUnique({
        where: {
          email: params.token.email as string,
        },
        select: {
          role: true,
        },
      });
      if (!user) throw new Error("User not found");
      params.token.role = user.role;
      if (params.trigger === "signUp") {
        const users = await prisma.user.findMany();
        if (users.length === 1) {
          await prisma.user.update({
            where: { email: params.token.email as string },
            data: { roleId: 2 },
          });
        }
      }
      return params.token;
    },
  },
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
