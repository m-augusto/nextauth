import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcrypt'
import { sql } from "@vercel/postgres";
const handler = NextAuth({
  session:{
    strategy: "jwt"
  },
  pages:{
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await sql`
          SELECT * from USERS WHERE email=${credentials?.email}
        ` 
        const user  = response.rows[0]
        const passwordCorrect = await compare(credentials?.password || '', user.password)
        if(passwordCorrect){
          return {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
