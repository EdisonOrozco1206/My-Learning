"use client";

import CourseCard from "@/components/CourseCard";
import { getSession } from "@/libs/libs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminCoursesPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [courses, setCourses] = useState(null);
    const [searchModal, setSearchModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [searchInfo, setSearchInfo] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            let session = await getSession();

            if (!session?.userData?.role || session.userData.role !== "admin") {
                router.push("/");
                return;
            }

            setUserData(session);

            try {
                let res = await fetch("/api/courses");
                let data = await res.json();
                setCourses(data);
            } catch (error) {
                console.error("Error al obtener cursos:", error);
            }
        };

        fetchData();
    }, [router]);

    const toggleSearchModal = () => {
        if(!searchModal){
          setSearchModal(true)
        }else{
          setSearchModal(false)
          setSearchQuery(null)
          setSearchInfo(null)
        }
      }
    
      const fetchSearchData = async (e) => {
        e.preventDefault()
        let res = await fetch("/api/courses/"+searchQuery);
        let data = await res.json();
        setSearchInfo([data.courses])
      }

    return <>

        {/* Search Modal */}
        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${searchModal ? 'visible' : 'invisible'}`}>
            <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                <div className="bg-slate-200 p-4 w-10/12">
                    <div>
                    <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                        Buscar curso
                    </h2>
                    <form action="" className='border flex justify-center'>
                        <input onChange={e => setSearchQuery(e.target.value)} value={searchQuery || ''} type="number" name="searchQuery" placeholder='Buscar ID' className='w-5/6 mx-auto my-8 p-2 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' />
                        <input onClick={(e) => fetchSearchData(e)} type="submit" value="Buscar" className='mx-auto cursor-pointer bg-slate-800 text-white my-8 px-3 hover:bg-slate-600'/>
                    </form>
                    {searchInfo ? (
                        <CourseCard courses={searchInfo} userData={userData}></CourseCard>
                    ) : ''}
                    <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600" onClick={toggleSearchModal}>
                        Cerrar
                    </button>
                    </div>

                </div>
            </div>
        </div>

        <div className="bg-slate-300 p-4 w-4/5 mx-auto mt-10">
            <h1 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800 uppercase">
                Administración de cursos
            </h1>

            <div className='grid grid-cols-2 gap-4'>
                <Link href="/admins/dashboard" className='col-span-1 mt-2 flex items-center justify-center w-full bg-slate-800 text-center text-white p-4 hover:bg-slate-900'>
                    Regresar
                </Link>

                <button onClick={toggleSearchModal} className='col-span-1 mt-2 flex items-center justify-center w-full bg-slate-800 text-center text-white p-4 hover:bg-slate-900'>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg> 
                </button>
            </div>

            {courses ? (
                <CourseCard courses={courses.courses} userData={userData} showId={true} />
            ) : (
                <h1>Cargando contenido...</h1>
            )}
        </div>
    </>
};

export default AdminCoursesPage;
