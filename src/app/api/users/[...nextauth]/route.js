import NextAuth from "next-auth/next";
import { prisma } from "@/libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from bcrypt

const authOptions = {
    providers: [
      CredentialsProvider({
          'name': "Credentials",
          credentials: {
              email: {type: "email", placeholder: "Escribe tu email"},
              password: {placeholder: "Ingresa tu contraseña", type: "password"}
          },
          async authorize(credentials, req){
            const userFound = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })
            if(!userFound) return null

            const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
            if(!matchPassword) return null


            return {
                id: userFound.id,
                role: userFound.role,
                name: userFound.name,
                email: userFound.email,
                password: userFound.password
            }
          },
      }),
    ],
  }

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}