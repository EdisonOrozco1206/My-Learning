import UsersClient from "@/components/amin/users/UsersClient"
import { getSession } from "@/libs/libs"

const page = async  () => {
    const session = await getSession()

    const res = await fetch(`${process.env.BASE_URL}/api/users/getTeacherStudents/${session.userData.id}`)
    const users = await res.json()

    console.log(users);

    return (
        <UsersClient users={users.users} admin={false}></UsersClient>
    )
}

export default page