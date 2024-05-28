'use client'

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = handleSubmit( async (data)  => {
  
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if(res.error){
      alert(res.error)
    }else{
      console.log("Enviando el formulario")
    }
  
  }
  
  )

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form action="" className='border p-6' onSubmit={onSubmit}>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Bienvenido de nuevo!!</h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu correo:' type="email" name='email' required
          {...register("email", {
            required: {
              value: true,
              message: "Se requiere el Email"
            }
          })}
        />
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800 ' placeholder='Ingresa tu contraseña:' type="password" name='password' required
          {...register("password", {
            required: {
              value: true,
              message: "Se requiere la Contraseña"
            }
          })}
        />
        <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Iniciar sesión" />
      </form>
    </div>
  )
}

export default LoginPage