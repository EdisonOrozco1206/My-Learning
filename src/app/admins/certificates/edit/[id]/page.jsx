'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const page = ({params}) => {
    const router = useRouter()
    const [user_id, setUser] = useState(null)
    const [course_id, setCourse]  = useState(null)

    useEffect(()=>{
        if(params.id){
            fetch(`/api/certificates/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data.certificate.course_id)
                setUser(data.certificate.user_id)
            })
        }else{
            router.push("/")
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!user_id || !course_id) return '' 

        try {
            await fetch("/api/certificates/"+params.id, {
                method: "PUT",
                body: JSON.stringify({user_id, course_id}),
                headers: {"Content-Type": "application/json"}
            })
            router.push("/admins/certificates/")
            router.refresh()
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
            <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">Modificar Certificacion</h2>

            <form action="" className='border p-6 pb-12 w-1/2 mx-auto mt-10' onSubmit={onSubmit}>
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='ID de usuario' type="number" name='user'
                    onChange={(e) => { setUser(parseInt(e.target.value)) }} value={user_id}/>
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='ID del curso' type="number" name='course'
                    onChange={(e) => { setCourse(parseInt(e.target.value)) }} value={course_id} />
                <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default page