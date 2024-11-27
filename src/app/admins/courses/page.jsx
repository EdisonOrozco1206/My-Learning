import { prisma } from "@/libs/prisma";
import CourseCard from "@/components/CourseCard";
import { getSession } from "@/libs/libs";

const AdminCoursesPage = async () => {
    const userData = await getSession();

    const courses = await prisma.course.findMany({
        include: {
            instructor: true
        }
    });

    return (
        <div className='bg-slate-300 p-4 w-4/5 mx-auto mt-10'>
            <h1 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800 uppercase">Administracion de cursos</h1>

            <CourseCard courses={courses} userData={userData} />

        </div>
    )
}

export default AdminCoursesPage