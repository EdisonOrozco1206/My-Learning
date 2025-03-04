import { getSession } from "@/libs/libs"
import { redirect } from "next/navigation"
import { prisma } from "@/libs/prisma"
import UsersClient from "@/components/amin/users/UsersClient"

const AdminUsers = async () => {
    const userData = await getSession()
    if(userData.userData && userData.userData.role != "admin"){ redirect("/") }

    const users = await prisma.user.findMany();

    return <>
        <UsersClient users={users}></UsersClient>
    </>
}

export default AdminUsers