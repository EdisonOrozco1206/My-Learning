'use server'

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { redirect } from 'next/navigation'

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("25 hours from now")
    .sign(key);
}

export async function decrypt(input){
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData) {
  // Verify credentials && get the user
  const userEmail = formData.get("email")
  const userPassword = formData.get("password")

  const userData = await prisma.user.findUnique({
    where: { email: userEmail }
  })

  const bcrypt = require("bcrypt")
  const checkPassword = bcrypt.compare(userPassword, userData.password)

  if(checkPassword){
    // const user = { email: formData.get("email"), password: formData.get("password") };

    const expires = new Date(Date.now() + 28800 * 1000);
    const session = await encrypt({ userData, expires });
  
    cookies().set("session", session, { expires, httpOnly: true });
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/user/login")
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(data) {
  const userInfo = JSON.parse(data);

  const userSession = await getSession();
  if (!userSession) return;

  userSession.userData.name = userInfo.name;
  userSession.userData.lastname = userInfo.lastname;
  userSession.userData.phone = userInfo.phone;
  userSession.userData.document_type = userInfo.document_type;
  userSession.userData.email = userInfo.email;
  userSession.expires = new Date(Date.now() + 28800 * 1000);

  const res = NextResponse.next();
  const jwtSession = await encrypt(userSession)

  cookies().set({
    name: "session",
    value: jwtSession,
    httpOnly: true,
    expires: userSession.expires,
  })
}
