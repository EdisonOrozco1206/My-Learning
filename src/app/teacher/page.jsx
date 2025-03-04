'use server';

import { getSession } from "@/libs/libs"
import { prisma } from "@/libs/prisma"
import { redirect } from "next/navigation"
import HomePage from "@/components/teacher/HomePage";

const teacherPage = async () => {
    const session = await getSession()
    const userData = session ? session.userData : ''

    const coursesReq = await fetch(process.env.BASE_URL+"/api/courses/perInstructor/"+userData.id)
    const courses = await coursesReq.json()


  return <HomePage courses={courses} userData={userData}></HomePage>
}

export default teacherPage