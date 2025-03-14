'use client'

import Link from "next/link"
import { useState } from "react"
import { sendEmail } from "@/libs/emails"

const page = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState([])

  const sendRecoveryEmail = async () => {
    setErrors([])
    let inputErrors = []
    let successEmail = []
    if(!email) inputErrors['email'] = "Correo no valido"
    setErrors(inputErrors)

    if(Object.keys(inputErrors).length == 0){
      const req = await fetch("/api/users/perEmail/"+email);
      const res = await req.json()

      if(res.user != null){
        let name = `${res.user.name} ${res.user.lastname}`
        try {
          await sendEmail.sendForgotPasswordEmail(res.user.email, name, res.user.id)
          successEmail['success'] = "Correo enviado correctamente"
          setSuccess(successEmail)
        } catch (error) {
          console.log(error.message);
        }

      }else{
        inputErrors['general'] = "Correo no encontrado"
        setErrors(inputErrors)
      }
    }
  }

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form action={sendRecoveryEmail} className='border p-6'>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Recuperar contraseña</h2>
        <p className="text-sm block w-5/6 mx-auto mt-4">Ingresa el correo asociado a tú cuenta y allí te enviaremos un correo para la recuperacion de tu contraseña</p>

        <input className='w-5/6 mx-auto mt-8 mb-2 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu correo:' type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.email}</p>}

        {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
        {success.success && <p className='text-green-500 w-5/6 block mx-auto text-sm'>{success.success}</p>}
        <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600 ' type="submit" value="Enviar" />
        <Link href={"/user/login"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
      </form>
    </div>
  )
}

export default page