import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import type { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      profile(profile) {
        // profile={
        //   iss: 'https://accounts.google.com',
        //   azp: '52353717203-ik7aur6qubv474pm3flljqf3ldo508fr.apps.googleusercontent.com',
        //   aud: '52353717203-ik7aur6qubv474pm3flljqf3ldo508fr.apps.googleusercontent.com',
        //   sub: '111244598437746830276',
        //   email: 'jhuanca219464@gmail.com',
        //   email_verified: true,
        //   at_hash: 'mgynvsXjdMvoeStBeLBKyA',
        //   name: 'Junior Huanca',
        //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ0lAzijklE9Vk_PgWGHLP7blXH-kfE1Tn9fEX047QK=s96-c',
        //   given_name: 'Junior',
        //   family_name: 'Huanca',
        //   locale: 'en',
        //   iat: 1704232096,
        //   exp: 1704235696
        // }
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
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
