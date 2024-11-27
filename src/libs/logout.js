"use server"

import { redirect } from "next/navigation";
import { logout } from "@/libs/libs";

export async function handleLogout() {
    await logout()
    redirect("/")
}