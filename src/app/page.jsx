import Carousel from "@/components/Carousel"
import CourseCard from "@/components/CourseCard"
import { Suspense } from "react"
import { prisma } from "@/libs/prisma"
import Link from "next/link"

const HomePage = async () => {
  const courses = await prisma.course.findMany({
    orderBy: [{
        id: 'desc'
    }],
    include: {
      instructor: true,
    }
  })

  return <>
    <div className="bg-slate-800 text-white dynamic-text flex items-center justify-center text-center mt-10 h-32 overflow-hidden relative">
      <p className="text-1 text-2xl">
        !! Bienvenido a my learning c: ¡¡
        <span className="block text-sm">
          Donde el conocimiento empieza
        </span>
      </p>
    </div>

    <Carousel></Carousel>

    <Suspense>
      <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
        <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">ULTIMOS CURSOS</h2>
        <CourseCard courses={courses}></CourseCard>
      </div>
    </Suspense>

    <div className="w-4/5 mx-auto mt-10 flex flex-row justify-between items-center">
      <div className="w-1/2">
        <img id="imagen-movimiento" className="w-3/4 rounded-full" src="static/profesor.jpg" alt="" />
      </div>
      <div className="ml-10 w-1/2">
        <h2 className="text-2xl font-bold mb-4 border-b border-slate-800 text-slate-800 pb-1">Enseña en My Learning</h2>

        <p className="text-lg mb-10 text-justify">
          Instructores de todo el mundo enseñan a millones de estudiantes en My Learning. Proporcionamos las herramientas y las habilidades para que enseñes lo que te apasiona.
        </p>

        <Link href="/teacher/new" className="bg-slate-800 text-white p-4 text-2xl hover:bg-slate-600">Empieza a enseñar en My Learning</Link>
      </div>
    </div>
  </>
}

export default HomePage