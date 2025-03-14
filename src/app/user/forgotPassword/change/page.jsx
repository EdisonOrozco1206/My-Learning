'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const page = () => {
    const router = useRouter()
    const [id, setId] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [verifyNewPassword, setVerifyNewPassword] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            setId(urlParams.get("id") || "");
        }
    }, []);

    const changePassword = async () => {
        setErrors([])
        let inputErrors = []
        if(!newPassword) inputErrors['password'] = "Contraseña no valida"
        if(!verifyNewPassword) inputErrors['password_verify'] = "Contraseña no valida"
        if(newPassword != verifyNewPassword) inputErrors['general'] = "Las contraseñas no coinciden"    
        setErrors(inputErrors)

        if(Object.keys(inputErrors).length == 0 && id){
            try {
                const res = await fetch("/api/users/changePassword/"+id,{
                    method: "PUT",
                    body: JSON.stringify({newPassword}),
                    headers: {"Content-Type": "application/json" }
                });

                if(res.ok) router.push('/user/login')
            } catch (error) {
                inputErrors['general'] = "Error al actualizar la contraseña"
                setErrors(inputErrors)
            }
        }
    }

    return (
        <div className='mt-10 w-2/5 mx-auto'>
            <form action={changePassword} className='border p-6'>
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Crea tu nueva contraseña</h2>

                <input className='w-5/6 mx-auto mt-8 mb-2 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Nueca contraseña:' type="password" name='new_password' onChange={(e) => setNewPassword(e.target.value)} />
                {errors.password && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password}</p>}

                <input className='w-5/6 mx-auto mt-8 mb-2 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Confirmar contraseña:' type="password" name='verify_new_password' onChange={(e) => setVerifyNewPassword(e.target.value)} />
                {errors.password_verify && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password_verify}</p>}

                {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
                <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600 ' type="submit" value="Enviar" />
                <Link href={"/user/login"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
        </div>
    )
}

export default page