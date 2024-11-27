'use server';

import { getSession } from "@/libs/libs"
import { prisma } from "@/libs/prisma"
import { redirect } from "next/navigation"
import HomePage from "@/components/teacher/HomePage";

const teacherPage = async () => {
    const session = await getSession()

    if(!session || session.userData.role != 'teacher'){redirect("/user/login")}

    const userData = session ? session.userData : ''

    const courses = await prisma.course.findMany({
        where: {
            instructor_id: userData.id
        },
        orderBy: [{
            id: 'desc'
        }]
    })

  return <HomePage courses={courses} userData={userData}></HomePage>
}

export default teacherPage