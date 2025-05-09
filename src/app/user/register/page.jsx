'use client'

import { useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { getSession } from "@/libs/libs"

const Page = () => {
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

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [phone, setPhone] = useState("")
  const [document_type, setDocument_type] = useState("")
  const [document, setDocument] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_verify, setPassword_verify] = useState("")
  const [errors, setErrors] = useState([])

  const onSubmit = async (e) => {
    e.preventDefault()

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }

    const validateNumber = (number) => {
      const numberRegex = /^\d{7,15}$/;
      return numberRegex.test(number);
    };

    const validateTextOnly = (text) => {
      const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
      return textRegex.test(text);
    };

    setErrors([])
    let inputErrors = []
    if(!name){
      inputErrors["name"] = "Nombre es obligatorio."
    } else if(!validateTextOnly(name)){
      inputErrors["name"] = "Nombre no valido."
    }
      
    if(!lastname){
      inputErrors["lastname"] = "Apellido es obligatorio."
    } else if(!validateTextOnly(lastname)){
      inputErrors["lastname"] = "Apellido no valido."
    }

    if(!phone){
       inputErrors["phone"] = "Teléfono es obligatorio."
    }else if(!validateNumber(phone)){
      inputErrors["phone"] = "Teléfono no valido."
    }

    if(!document_type) inputErrors["document_type"] = "Tipo doc. es obligatorio."

    if(!document){
       inputErrors["document"] = "Documento es obligatorio."
    }else if(!validateNumber(document)){
      inputErrors["document"] = "Documento no valido."
    }

    if(!email) {
      inputErrors["email"] = "Correo es obligatorio.";
    }else if(!validateEmail(email)){
      inputErrors["email"] = "Email no valido.";
    }
    if(!password) {
      inputErrors["password"] = "Contraseña es obligatoria.";
    }else if(!validatePassword(password)){
      inputErrors["password"] = "Contraseña no valida - min 1M, 1m, 1# y 8 digitos.";
    }
    if(password != password_verify) inputErrors["passwords"] = "Las contraseñas no coinciden."
    setErrors(inputErrors) 

    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }
    
    if(!errors || Object.keys(errors).length == 0){
      try {
        setLoading(true);

        const res = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({name, lastname, phone, document_type, document, email, password}),
          headers: { "Content-Type": "application/json" }
        })

        if(res.status == 200) {
          return router.push("/user/login");
        }
      } catch (error) {
        setErrors({ general: "Error al registrar el usuario." });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className='mt-10 lg:w-2/5 mx-auto'>
      <form className='border p-6' onSubmit={onSubmit}>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Registrarse en My Learning</h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus nombres:' type="text" name='name' onChange={(e) => setName(e.target.value.trim())} />
        {errors.name && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.name}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus apellidos:' type="text" name='lastname' onChange={(e) => setLastname(e.target.value.trim())} />
        {errors.lastname && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.lastname}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu teléfono:' type="number" name='phone' onChange={(e) => setPhone(e.target.value.trim())}/>
        {errors.phone && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.phone}</p>}

        <select name="document_type" id="" className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' onChange={(e) => setDocument_type(e.target.value.trim())}>
            <option value="">Selecciona tu tipo de documento</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="P">Pasaporte</option>
        </select>
        {errors.document_type && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.document_type}</p>}

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresar número de documento:' type="number" name='document' onChange={(e) => setDocument(e.target.value.trim())} />
        {errors.document && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.document}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu correo:' type="email" name='email' onChange={(e) => setEmail(e.target.value.trim())} />
        {errors.email && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.email}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800 ' placeholder='Ingresa tu contraseña:' type="password" name='password' onChange={(e) => setPassword(e.target.value.trim())}/>
        {errors.password && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Confirmar contraseña:' type="password" name='password_verify' onChange={(e) => setPassword_verify(e.target.value.trim())}/>
        {errors.password_verify && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password_verify}</p>}
        {errors.passwords && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.passwords}</p>}

        {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
        <button type="submit" disabled={loading} className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600'>
          {loading ? "Registrandose..." : "Registrar"}
        </button>
        <Link href={"/user/login"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Iniciar sesión</Link>
      </form>
    </div>
  )
}

export default Page