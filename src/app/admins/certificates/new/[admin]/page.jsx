'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getSession } from "@/libs/libs"

const Page = ({params}) => {
    const router = useRouter()
    const [courses, setCourses] = useState(null)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [course_id, setCourse]  = useState(null)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        async function fetchCourses() {
            let session = await getSession()
            let userData = session.userData;
            let data = ''
            if(params.admin == 1){
                let res = await fetch("/api/courses/")
                data = await res.json()
            }else if(params.admin == 0){
                let res = await fetch("/api/courses/perInstructor/"+userData.id)
                data = await res.json()
            }
            setCourses(data.courses)
        }
        fetchCourses()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        let inputErrors = []
        if(!user) inputErrors["user"] = "Documento de usuario es obligatorio."
        if(!course_id) inputErrors["course"] = "Selección del curso es obligatorio."
        setErrors(inputErrors)

        if(Object.keys(inputErrors).length == 0){
            try {
                setLoading(true);
                document.body.style.cursor = "wait";
                const res = await fetch("/api/certificates/", {
                    method: "POST",
                    body: JSON.stringify({document: user, course_id}),
                    headers: {"Content-Type": "application/json"}
                })
                if(res.ok){
                    router.push("/admins/certificates/")
                    router.refresh()
                }
            } catch (error) {
                inputErrors["general"] = "Error al habilitar usuario."
                setErrors(inputErrors)
            }finally {
                setLoading(false);
                document.body.style.cursor = "default";
            }
        }

    }

    return (
        <div className="bg-slate-300 mt-10 w-full lg:w-4/5 mx-auto p-5">
            <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">Habilitar Usuario</h2>

            <form action="" className='border p-6 pb-12 w-full lg:w-1/2 mx-auto mt-10' onSubmit={onSubmit}>
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='# documento de usuario' type="number" name='user'
                    onChange={(e) => { setUser(parseInt(e.target.value.trim())) }} />
                {errors.user && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.user}</p>}

                <select className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' name="course" onChange={(e) => { setCourse(parseInt(e.target.value.trim())) }}>
                    <option value="">Seleccionar curso</option>
                    {courses && (
                        courses.map(c => (
                            <option value={c.id}>{c.title}</option>
                        ))
                    )}
                </select>
                {errors.course && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.course}</p>}

                {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
                <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" disabled={loading} value={loading ? "Enviando..." : "Enviar"} />
                <Link href={"/admins/certificates"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 bg-white  text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
        </div>
    )
}

export default Page