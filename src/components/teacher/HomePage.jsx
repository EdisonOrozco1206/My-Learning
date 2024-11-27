'use client';

// import React from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation";

const HomePage = ({ courses, userData }) => {
    const router = useRouter();

    const handleDeletion = async (e, id) => {
        e.preventDefault();
        if(id){
            await fetch("/api/courses/"+id, {
                method: "DELETE"
            });

            router.refresh();
        }
    }

  return (
    <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
        <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800 uppercase">
            Administracion de cursos
        </h2>

        <Link href="/course/new" className='mt-2 flex items-center justify-center w-full bg-green-500 text-center text-white p-4 hover:bg-green-600'>
            Publicar curso
        </Link>

        <div className="w-full mt-8 gap-4 grid grid-cols-3">
            {courses.map((course) => {
                return (
                    <div className="col-span-1 bg-white flex flex-col justify-between" key={course.id}>
                        <img className="h-full" src={course.portait ? `/uploads/`+course.portait : "https://www.mundodeportivo.com/urbantecno/hero/2022/01/404-1.jpg?width=1200&aspect_ratio=16:9"} alt={"Portada del courso "+course.title} />
                        <div className="mt-2">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold capitalize">{course.title}</h3>
                                <p className="w-full">{course.description}</p>
                            </div>
                            <span className="bg-slate-800 text-slate-300 block w-full text-lg text-center p-2 mt-2">$ {course.price}</span>
                        </div>
                        <div>
                            <Link href={"/course/edit/"+course.id} className="bg-indigo-800 text-slate-300 w-1/2 text-lg text-center inline-block p-2 hover:bg-indigo-700">Editar</Link>
                            <a href="" onClick={(e) => handleDeletion(e, course.id)} className="bg-red-800 text-slate-300 w-1/2 text-lg text-center inline-block p-2 hover:bg-red-700">Eliminar</a>
                        </div>
                    </div>  
                )
            })}
        </div>
    </div>
  )
}

export default HomePage