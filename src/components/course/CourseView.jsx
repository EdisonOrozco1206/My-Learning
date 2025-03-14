'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCartStore } from "@/libs/cartLibs";
import PDF from "../certificate/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const CourseView = ({course, user, viewedClasses, courseLections, isBought}) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [progress, setProgress] = useState(null)
    const [certificate, setCertificate] = useState(null)

    useEffect(()=>{
        const loadData = async () =>{
            let total = courseLections.lections.length;
            let viewed = viewedClasses.lection_user.length;
            let progress = ((viewed/total)*100)
            setProgress(parseInt(progress))
            setIsClient(true);

            if(progress == 100){
                try {
                    let res = await fetch(`/api/certificates/search/${user.id}/${course.id}`)
                    let certificate = await res.json()
                    setCertificate(certificate[0])
                } catch (error) {
                    console.log(error.message);
                }
            }
        }  
        loadData()
    }, [])

    const addToCart = useCartStore((state) => state.addToCart);
    const handleCartAndRedirect = (course) => {
        addToCart(course)
        router.push("/cart");
    }

    return (
        <div className="bg-slate-300 p-4 w-5/6 mx-auto mt-10 grid grid-cols-3">
            <div className="max-h-96 overflow-hidden hover:opacity-65 col-span-2">
                <img src={"/uploads/"+course.portait} alt={"Portada curso "+course.title} className="w-full" />
            </div>
            <div className="p-4 flex flex-col col-span-1">
                <h1 className="text-2xl">{course.title}</h1>
                <h2>{course.instructor.name} {course.instructor.lastname}</h2>
                <p>{course.description}</p>
                    {!isBought && (
                        <div className="flex gap-4 mt-4 items-center">
                            <p className="bg-slate-800 text-white py-2 px-4">$ {course.price}</p>
                            {user.id != course.instructor_id &&
                                <button onClick={() => handleCartAndRedirect(course)} className="border border-slate-800 hover:bg-slate-400 hover:text-slate-900 py-2 px-4 cursor-pointer">Agregar al carrito</button>
                            }
                        </div>
                    )}
                    {isBought && user.id != course.instructor_id ?(
                        <Suspense fallback={<p>Cargando progreso...</p>}>
                            <div className="mt-4 bg-white px-4 pb-4">
                                <h3 className="py-2 px-4 border-b border-slate-800">Tú progreso</h3>

                                <div className="mt-4">
                                    <div className="flex justify-between text-xs">
                                        <p>{isNaN(progress) ? '0' : (progress)}%</p>
                                        <p>100%</p>
                                    </div>
                                    <div className="w-full bg-slate-300 h-6 overflow-hidden">
                                        <div className="h-full bg-slate-900" id="animacion-progreso" style={{ width: `${isNaN(progress) ? '0' : (progress)}%` }}></div>
                                    </div>
                                    {certificate && (
                                        <div className="mt-4">
                                            <p className="text-xs text-center">Felicitaciones has completado el curso!!, ahora puedes....</p>
                                            <PDFDownloadLink document={<PDF user={user} course={course}></PDF>} fileName={"my_learning_"+user.document+"_certificate.pdf"}>
                                                {({loading, url, error, blob}) => loading ? 
                                                    <button className="w-full py-2 bg-slate-900 text-white mt-2 hover:bg-slate-800">Cargando documento</button>
                                                :
                                                    <button className="w-full py-2 bg-slate-900 text-white mt-2 hover:bg-slate-800">Descargar tu certificado</button>
                                                }
                                            </PDFDownloadLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Suspense>
                    ) : ''}
            </div>
            { user.id == course.instructor_id && user.role == "teacher" || user.role == "admin" ? 
                <div className="px-4 col-span-3 w-1/2 mx-auto mt-4">
                    <h2>Administrar lecciones</h2>
                    <Link href={"/course/lections/"+course.id} className="flex justify-center py-2 bg-slate-900 text-white mt-2 hover:bg-slate-800">
                        Administrar
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"> 
                            <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z" /> 
                            <path d="M3 9v6" /> 
                            <path d="M6 9v6" /> 
                        </svg> 
                    </Link>
                </div>
            : ''}

            <div className="col-span-3">
                <h2 className="my-2 text-xl block w-full border-b border-slate-400">Listado de lecciones</h2>
                <Suspense fallback={<div>Cargando lecciones...</div>}>
                    <div>
                        {courseLections && courseLections.lections && courseLections.lections.length > 0 ? (
                            courseLections.lections.map((lection) => {
                                const viewed = viewedClasses && viewedClasses.lection_user ? 
                                    viewedClasses.lection_user.some(view => view.lection_id == lection.id) : false;

                                if(isBought || user.id == course.instructor.id){
                                    return (
                                        <div key={lection.id} className="bg-white border border-black px-6 py-3 flex justify-between items-center w-full hover:bg-slate-100">
                                            <input id="default-checkbox" disabled type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4" checked={viewed} />
                                            <Link href={"/lections/"+lection.id} className="hover:text-gray-500 capitalize text-xl w-full" title="Ver lección">#{lection.position} - {lection.title}</Link>
                                            <Link href={"/lections/"+lection.id} className="hover:text-gray-500 capitalize underline">Ver</Link>
                                        </div>
                                    );
                                }else{
                                    return (
                                        <div key={lection.id} className="bg-white border border-black px-6 py-3 flex justify-between items-center w-full hover:bg-slate-100">
                                            <input id="default-checkbox" disabled type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4" checked={viewed} />
                                            <p className="hover:text-gray-500 capitalize text-xl w-full" title="Ver lección">#{lection.position} - {lection.title}</p>
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <h2>No hay lecciones disponibles aún</h2>
                        )}
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default CourseView