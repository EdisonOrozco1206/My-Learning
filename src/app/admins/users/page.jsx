import { getSession } from "@/libs/libs"
import { redirect } from "next/navigation"
import { prisma } from "@/libs/prisma"
import UsersRows from "@/components/amin/users/UsersRows"

const AdminUsers = async () => {
    const userData = await getSession()
    if(userData.userData && userData.userData.role != "admin"){ redirect("/") }

    const users = await prisma.user.findMany();

    return <>
        <UsersRows users={users}></UsersRows>
    </>
}

export default AdminUsers