'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"

const register = () => {
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()

    const password_verify = e.target.password_verify.value
    const password = e.target.password.value

    if(password == password_verify){
      const name = e.target.name.value
      const lastname = e.target.lastname.value
      const phone = e.target.phone.value
      const document_type = e.target.document_type.value
      const document = parseInt(e.target.document.value)
      const email = e.target.email.value

      console.log(name, lastname, phone, document_type, document, email, password);
      
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({name, lastname, phone, document_type, document, email, password}),
        headers: {'Contet-type': "application/json"}
      })

      if(res){
       router.push("/user/login")
      }
    }
  }

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form className='border p-6' onSubmit={onSubmit}>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>Registrarse en My Learning</h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus nombres:' type="text" name='name' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tus apellidos:' type="text" name='lastname' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu telefono:' type="number" name='phone'/>

        <select name="document_type" id="" className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' required>
            <option value="">Selecciona tu tipo de documento</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cedula de ciudadanía</option>
            <option value="CE">Cedula de extranjeria</option>
            <option value="P">Pasaporte</option>
        </select>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu numero de documento:' type="number" name='document' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Ingresa tu correo:' type="email" name='email' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800 ' placeholder='Ingresa tu contraseña:' type="password" name='password' required/>
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800 ' placeholder='Confirmar contraseña:' type="password" name='password_verify' required/>

        <button type="submit" className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600'>
          Registrarse
        </button>
        <Link href={"/user/login"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Iniciar sesion</Link>
      </form>
    </div>
  )
}

export default register