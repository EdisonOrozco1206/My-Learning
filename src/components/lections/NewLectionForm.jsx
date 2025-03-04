'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

const NewLectionForm = ({course, user}) => {
  const router = useRouter();

  if(!course || course == '' || !user || user == '' || course.instructor_id != user.id){
    router.push("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const position = Number(e.target.position.value)
    const course_id = Number(course.id)

    const checkPositionQuery = await fetch(`/api/lections/checkPosition/${course_id}/${position}`);

    const title = e.target.title.value

    try {
      const currentdate = new Date();
      const datetime = 
          `${currentdate.getDate()}_` +
          `${(currentdate.getMonth() + 1).toString().padStart(2, '0')}_` +
          `${currentdate.getFullYear()}_` +
          `${currentdate.getHours().toString().padStart(2, '0')}-` +
          `${currentdate.getMinutes().toString().padStart(2, '0')}-` +
          `${currentdate.getSeconds().toString().padStart(2, '0')}`;
      
      const file = e.target.content.files[0];
      const content = file && datetime ? `${datetime}_${file.name}` : '';
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", content);
  
      const fileupload = await fetch("/api/upload", {
          method: "POST",
          body: formData
      });

      if(fileupload){
        const data = {
          title: title,
          position: position,
          course_id: course_id,
          content: content
        };
  
        const res = await fetch("/api/lections/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/course/lections/"+course.id)
        router.refresh()
      }

    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form onSubmit={onSubmit} className='border p-6'>
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
          Agregar Leccion
        </h2>

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Titulo:' type="text" name='title' required />
        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Posición:' type="number" name='position' required />
        <label htmlFor="content" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Contenido de la lección: </label>  
        <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Contenido de la lección:' type="file" name='content' accept="video/*, .zip" required />

        <span className="block text-xs text-justify my-2 text-yellow-500 w-5/6 mx-auto">Nota: solo puedes mandar videos(.mp4) o archivos comprimidos(.zip) como material de apoyo para tus aprendices</span>

        <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Guardar"/>
        <Link href={"/course/lections/"+course.id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
      </form>
    </div>
  )
}

export default NewLectionForm