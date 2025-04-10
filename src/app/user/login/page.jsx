'use client'

import { useState, useEffect } from "react"
import { login } from "@/libs/libs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSession } from "@/libs/libs"

const LoginPage = () => {
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      let session = await getSession();
  
      if (session?.userData) {
        router.push("/");
      }
    }
    checkUser();
  }, [router]);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  const loginUser = async () => {
    let inputErrors = []

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }

    if (!email) {
      inputErrors.email = "Correo es obligatorio.";
    } else if (!validateEmail(email)) {
      inputErrors.email = "Correo no es válido.";
    }

    if (!password) {
      inputErrors.password = "Contraseña es obligatoria.";
    } else if (!validatePassword(password)) {
      inputErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }
    setErrors(inputErrors)
  
    if(!errors || Object.keys(errors).length == 0){
      try {
        setLoading(true);
        document.body.style.cursor = "wait";
        await login(email, password)
        router.push("/")
      } catch (error) {
        setErrors({ general: "Error al iniciar sesión" })
      } finally {
        setLoading(false);
        document.body.style.cursor = "default";
      }
    }
  }

  return (
    <div className='mt-10 lg:w-2/5 mx-auto'>
      <form action={loginUser} className='border p-6'>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>¡Bienvenido de nuevo!</h2>

        <input className='w-5/6 mx-auto mt-8 mb-2 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu correo:' type="email" name='email' onChange={(e) => setEmail(e.target.value.trim())} />
        {errors.email && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.email}</p>}

        <input className='w-5/6 mx-auto mt-8 mb-2 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800' placeholder='Ingresa tu contraseña:' type="password" name='password' onChange={(e) => setPassword(e.target.value.trim())}/>
        {errors.password && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password}</p>}

        {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
        <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600 ' type="submit" disabled={loading} value={loading ? "Iniciando..." : "Iniciar sesión"} />
        <Link href={"/user/register"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regístrarse</Link>

        <Link href={"/user/forgotPassword"} className="block underline text-center mt-4 w-full hover:text-slate-600">¿Olvidaste tu contraseña?</Link>
      </form>
    </div>
  )
}

export default LoginPage