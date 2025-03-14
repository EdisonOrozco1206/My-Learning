import process from "process";
import { getSession } from "@/libs/libs"
import { redirect } from "next/navigation"
import HomePage from "@/components/teacher/HomePage";

const page = async () => {
  const session = await getSession()
  const userData = session ? session.userData : redirect("/")

  const res = await fetch(process.env.BASE_URL+"/api/courses/perInstructor/"+userData.id)
  
  const courses = await res.json()

  return <HomePage courses={courses.courses} userData={userData}></HomePage>
}

export default page