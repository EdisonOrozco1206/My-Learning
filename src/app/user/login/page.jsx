import { redirect } from "next/navigation"
import { login } from "@/libs/libs"

const LoginPage = () => {

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form action={
        async (formData) => { 
          'use server'
          await login(formData)
          redirect("/")
        }
      } className='border p-6'>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Bienvenido de nuevo!!</h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu correo:' type="email" name='email' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800 ' placeholder='Ingresa tu contraseña:' type="password" name='password' required/>
        <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Iniciar sesión" />
      </form>
    </div>
  )
}

export default LoginPage