import Carousel from "@/components/Carousel"
import CourseCard from "@/components/CourseCard"
import { Suspense } from "react"
import { prisma } from "@/libs/prisma"
import Link from "next/link"
import Image from "next/image";
import { getSession } from "@/libs/libs"

export const dynamic = 'force-dynamic'

const Page = async () => {
  const session = await getSession()
  const instructor = session?.userData?.role === 'teacher' || session?.userData?.role === 'admin'  ? true : false
  
  const courses = await prisma.course.findMany({
    orderBy: [{
        id: 'desc'
    }],
    include: {
      instructor: true,
    },
    take: 6
  })

  return <>
    <div className="bg-slate-800 text-white flex items-center justify-center text-center mt-10 h-32 overflow-hidden relative">
      {session?.userData ? (
        <p className="text-1 text-2xl">
          <span>¡Bienvenido! {session.userData.name} {session.userData.lastname}</span>
          <span className="block text-sm">
            Empecemos a aprender
          </span>
        </p>
      ) : (
        <p className="text-1 text-2xl">
          ¡Bienvenido a My Learning c:!
          <span className="block text-sm">
            Donde el conocimiento empieza
          </span>
        </p>
      )}
    </div>

    <Carousel></Carousel>

    <Suspense>
      <div className="bg-slate-300 mt-10 lg:w-4/5 mx-auto p-5">
        <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">ÚLTIMOS CURSOS</h2>
        <Link href={"/course"} className="block mt-2 py-2 w-full text-center text-xl bg-slate-800 hover:bg-slate-700 text-white">Ver todos los cursos</Link>
        <CourseCard courses={courses}></CourseCard>
      </div>
    </Suspense>

    {!instructor && (
      <div className="lg:w-4/5 mx-auto mt-10 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="lg:w-1/2">
          <Image className="lg:w-3/4 rounded-full" src="/static/profesor.jpg" alt="Profesor enseñando" width={300} height={300} />
        </div>
        <div className="lg:ml-10 lg:w-1/2 p-4 lg:p-0">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 border-b border-slate-800 text-slate-800 pb-1">Enseña en My Learning</h2>

          <p className="text-sm lg:text-lg mb-10 text-justify">
            Instructores de todo el mundo enseñan a millones de estudiantes en My Learning. Proporcionamos las herramientas y las habilidades para que enseñes lo que te apasiona.
          </p>

          <Link href="/teacher/new" className="whitespace-nowrap bg-slate-800 text-white p-4 text-xl lg:text-2xl hover:bg-slate-600">Empieza a enseñar en My Learning</Link>
        </div>
      </div>
    )}
  </>
}

export default Page