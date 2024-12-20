'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"


const EditCategory = ({params}) => {
    const router = useRouter()
    const [name, setName] = useState("")

    useEffect(() => {
        if(params.id){
            fetch(`/api/categories/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name)
            })
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        if(params.id){
            try {
                const res = await fetch(`http://localhost:3000/api/categories/${params.id}`, {
                    method: "PUT",
                    body: JSON.stringify({name}),
                    hader: {'Content-type': 'application/json'}
                })
                const data = res.json()
            } catch (error) {
                console.log(error.message)    
            }
        }else{
            try {
                const res = await fetch(`http://localhost:3000/api/categories/`, {
                    method: "POST",
                    body: JSON.stringify({name}),
                    hader: {'Content-type': 'application/json'}
                })
                const data = res.json()
            } catch (error) {
                console.log(error.message)    
            }
        }
    
        router.push("/category")
        router.refresh()
    }

  return <>
    <Link href="/admins/category/" className='mt-10 w-4/5 mx-auto flex items-center justify-center bg-green-500 text-center text-white p-4 hover:bg-green-600'>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
        </svg>
        Regresar
    </Link>

    <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
        <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">Editar categoria({name})</h2>

        <form action="" className='border p-6 pb-12 w-1/2 mx-auto mt-10' onSubmit={onSubmit}>
            <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Nuevo titulo de la categoria' type="text" name='name'
                onChange={(e) => {
                    setName(e.target.value)
                }} value={name}
            />
            <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Editar" />
        </form>
    </div>
</>
}

export default EditCategory