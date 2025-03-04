'use client'

import { useRouter } from "next/navigation"
import Link from "next/link";

const EditLection = async ({params}) => {
    const router = useRouter();

    if(!params.id){
      router.push("/");
    }

    const lectionquery = await fetch("/api/lections/"+params.id);
    const content = await lectionquery.json();
    const lection = content.lection;

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const position = Number(e.target.position.value)
        const title = e.target.title.value
    
        const data = {
          title: title,
          position: position,
        };
    
        try {
          const res = await fetch("/api/lections/"+lection.id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          router.push("/course/lections/"+lection.course_id);
        } catch (error) {
          alert(error);
        }
      }

    return (
      <div className='mt-10 w-2/5 mx-auto'>
        <form onSubmit={onSubmit} className='border p-6'>
          <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
            Editar Lección
          </h2>

          <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Titulo:' type="text" name='title' defaultValue={lection.title} required />
          <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Posición:' type="number" name='position' defaultValue={lection.position} required />
          {/* <label htmlFor="content" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Imagen de portada: </label>  
          <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Selecciona la portada:' type="file" name='content' id="portait" accept="video/*" required /> */}

          <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Actualizar"/>
          <Link href={"/course/lections/"+lection.course_id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
        </form>
      </div>
    )
}

export default EditLection