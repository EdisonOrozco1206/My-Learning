'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

const TeacherCourseAdminLections = ({course, lections, courseId}) => {
    const router = useRouter()

    const deleteLection = async (id) => {
        if(id){
            try {
                await fetch("/api/lections/"+id, {
                    method: "DELETE"
                });
                router.refresh();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
            <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800 uppercase">
                Contenido - {course.title}
            </h2>

            <div className="flex gap-4">
                <Link href={"/course/details/"+courseId} className='mt-2 flex items-center justify-center w-full bg-slate-900 text-center text-white p-4 hover:bg-slate-800'>
                    Regresar
                </Link>
                <Link href={"/lections/new/"+courseId} className='mt-2 flex items-center justify-center w-full bg-green-500 text-center text-white p-4 hover:bg-green-600'>
                    Agregar lección
                </Link>
            </div>

            <div className="mt-2">
                {lections ? (
                    lections.map((lection) => (
                        <div key={lection.id} className="bg-white border border-black px-6 py-3 flex justify-between w-full hover:bg-slate-100 items-center">
                            <Link href={"/lections/"+lection.id} className="hover:text-gray-500 capitalize text-xl w-full" title="Ver lección">#{lection.position} - {lection.title}</Link>
                            <div className="flex gap-3">
                                <Link href={"/lections/edit/"+lection.id} className="cursor-pointer mx-2 px-4 py-2 border border-sky-500 rounded-sm bg-sky-500 text-white hover:bg-sky-600">Editar</Link>
                                <button onClick={() => {deleteLection(lection.id)}} className="cursor-pointer mx-2 px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600">Borrar</button>
                            </div>
                        </div>
                    ))
                ) : (<h2>No hay lecciones disponibles aún</h2>)}
            </div>
        </div>
    )
}

export default TeacherCourseAdminLections