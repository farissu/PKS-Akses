import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateByEmail } from "@/erp/donatur";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '475759875030-r7d9cn9gu2jlt54jer108bphror6g951.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
        }
      },
      async authorize(credentials, req){

        // console.log("authorization", credentials);

        const { email } = credentials
        const name = email.split("@")[0];
        // console.log("email", email);
        // console.log("name", name);

        const user = await findOrCreateByEmail(email, name, String(req.headers.host));
        if(!user){
          return null
        }

        return user
      }
    })
  ],
  secret: "yW9pzWvM2Fv9AgiCI0kuu7O1H/RIyprvsZjieQUpuTc=",
  // secret: "de7b2ba1bc233c170b8ec3f2a5f5c1dc",
  debug: true,
  jwt: {
    // async encode({ secret, token }) {
    //   return jwt.sign(token, secret)
    // },
    // async decode({ secret, token }) {
    //   return jwt.verify(token, secret)
    // },
    expiresIn: "1d",
  },
  authorization: {
    params: {
      prompt: "consent",
      access_type: "online",
      response_type: "code",
    },
  },
  // cookies: {
  //     sessionToken: {
  //         name: "next-auth.session-token",
  //         options: {
  //             domain: ".localhost",
  //             path: "/",
  //             httpOnly: true,
  //             sameSite: "lax",
  //             secure: false
  //         }
  //     }
  // },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error page path
    verifyRequest: '/auth/verify-request', // Email verification page path
    newUser: null, // New user registration is handled in the callback
  },
};

export default NextAuth(authOptions);
