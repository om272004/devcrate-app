import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";



export const authOptions : NextAuthOptions = {
    adapter : PrismaAdapter(db) as Adapter,

    providers : [
        GithubProvider({
            clientId : process.env.GITHUB_CLIENT_ID!,
            clientSecret : process.env.GITHUB_CLIENT_SECRET!,
        }),

        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        }),
        
        CredentialsProvider({
            name : "Email & Password",
            credentials : {
                email : {label : "Email", type : "email", placeholder : "example@example.com"},
                password : {label : "Password", type : "password"}
            },
            async authorize(credentials) {
                
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                // 1. Find the user in your database
                const user = await db.user.findUnique({
                    where : {
                        email : credentials.email,
                    }
                })

                if (!user || !user.password) {
                    return null
                }
                // 2. Compare the hashed password
                const validUser = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
                // 3. Return the user object if they are valid, or null if not
                if (!validUser) {
                    return null;
                }
                return user;
            }
        }),
    ],

    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,

    pages : {
        signIn : "/signin"
    },

    callbacks : {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
            }
            return token
        },

        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    }
}