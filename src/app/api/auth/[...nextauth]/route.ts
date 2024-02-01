import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000, // 等待响应时间，因为本地环境经常登录超时，所以改了这个配置
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET, // 目前生产环境是必须的
  callbacks: {
    // 调用 getSession 和 useSession 时会触发
    // 文档可查看 https://next-auth.js.org/configuration/callbacks
    async session({ session, user }) {
      if (user.id && session?.user) {
        session.user.userId = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
