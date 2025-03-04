'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

const EditCourseForm = ({categories, userData, courseInfo}) => {
    const router = useRouter();
    
    const onSubmit = async (e) => {
      e.preventDefault();

      const instructor_id = userData.id
      const title = e.target.title.value
      const description = e.target.description.value
      const price = parseInt(e.target.price.value)
      const category = parseInt(e.target.category.value)

      const file = e.target.portait.files[0]
      
      const currentdate = new Date();
      const datetime = 
          `${currentdate.getDate()}_` +
          `${(currentdate.getMonth() + 1).toString().padStart(2, '0')}_` +
          `${currentdate.getFullYear()}_` +
          `${currentdate.getHours().toString().padStart(2, '0')}-` +
          `${currentdate.getMinutes().toString().padStart(2, '0')}-` +
          `${currentdate.getSeconds().toString().padStart(2, '0')}`;
      const portait = file && datetime ? `${datetime}_${file.name}` : '';

      if(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", portait);

        await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
      }
  
      await fetch('/api/courses/'+courseInfo.id, {
          method: 'PUT',
          body: JSON.stringify({title, price, portait, description, category, instructor_id})
      })

      router.push("/teacher")
      router.refresh()
    }
  
    return (
      <div className='mt-10 w-2/5 mx-auto'>
        <form onSubmit={onSubmit} className='border p-6' encType="multipart/form-data">
          <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
            Editar curso - {courseInfo.title}
          </h2>
  
          <label htmlFor="portait" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Imagen de portada: </label>  
          <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Selecciona la portada:' type="file" name='portait' id="portait" accept="image/*" />
          <img className="w-2/6 mx-auto" src={courseInfo.portait ? `/uploads/`+courseInfo.portait : "https://www.mundodeportivo.com/urbantecno/hero/2022/01/404-1.jpg?width=1200&aspect_ratio=16:9"} alt={"Portada del courso "+courseInfo.title} />

          <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el titulo:' type="text" name='title' defaultValue={courseInfo.title} required />
  
          <textarea className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa la descripcion:' name='description' defaultValue={courseInfo.description} required ></textarea>
          <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el precio:' type="number" name='price' defaultValue={courseInfo.price} required />
  
          <select className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' name='category' defaultValue={courseInfo.category} required>
              <option value="">Selecciona categoría del curso</option>
              {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
          </select>
  
          <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Actualizar" />
          <Link href={"/teacher"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
        </form>
      </div>
    )
}

export default EditCourseForm