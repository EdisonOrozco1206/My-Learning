'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Page = () => {
  const router = useRouter()

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

    setErrors([])
    let inputErrors = []
    if(!name) inputErrors["name"] = "Nombre es obligatorio."
    if(!lastname) inputErrors["lastname"] = "Apellido es obligatorio."
    if(!phone) inputErrors["phone"] = "Telefono es obligatorio."
    if(!document_type) inputErrors["document_type"] = "Tipo doc. es obligatorio."
    if(!document) inputErrors["document"] = "Documento es obligatorio."
    if(!email) inputErrors["email"] = "Correo es obligatorio."
    if(!password) inputErrors["password"] = "Contraseña es obligatoria."
    if(password != password_verify) inputErrors["passwords"] = "Las contraseñas no coinciden."
    setErrors(inputErrors) 
    
    if(!errors || Object.keys(errors).length == 0){
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({name, lastname, phone, document_type, document, email, password}),
          headers: {'Contet-type': "application/json"}
        })
        if(res.ok) return router.push("/user/login")
      } catch (error) {
        setErrors({ general: "Error al registrar usuario" })
      }
    }
    
  }

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form className='border p-6' onSubmit={onSubmit}>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Registrarse en My Learning</h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus nombres:' type="text" name='name' onChange={(e) => setName(e.target.value.trim())} />
        {errors.name && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.name}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus apellidos:' type="text" name='lastname' onChange={(e) => setLastname(e.target.value.trim())} />
        {errors.lastname && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.lastname}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu telefono:' type="number" name='phone' onChange={(e) => setPhone(e.target.value.trim())}/>
        {errors.phone && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.phone}</p>}

        <select name="document_type" id="" className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' onChange={(e) => setDocument_type(e.target.value.trim())}>
            <option value="">Selecciona tu tipo de documento</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cedula de ciudadanía</option>
            <option value="CE">Cedula de extranjeria</option>
            <option value="P">Pasaporte</option>
        </select>
        {errors.document_type && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.document_type}</p>}

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu numero de documento:' type="number" name='document' onChange={(e) => setDocument(e.target.value.trim())} />
        {errors.document && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.document}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu correo:' type="email" name='email' onChange={(e) => setEmail(e.target.value.trim())} />
        {errors.email && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.email}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800 ' placeholder='Ingresa tu contraseña:' type="password" name='password' onChange={(e) => setPassword(e.target.value.trim())}/>
        {errors.password && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password}</p>}
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Confirmar contraseña:' type="password" name='password_verify' onChange={(e) => setPassword_verify(e.target.value.trim())}/>
        {errors.password_verify && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.password_verify}</p>}
        {errors.passwords && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.passwords}</p>}

        {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
        <button type="submit" className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600'>
          Registrarse
        </button>
        <Link href={"/user/login"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Iniciar sesion</Link>
      </form>
    </div>
  )
}

export default Page