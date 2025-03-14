'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditCourseForm = ({ categories, userData, courseInfo }) => {
  const router = useRouter();
  const [title, setTitle] = useState(courseInfo.title || '');
  const [description, setDescription] = useState(courseInfo.description || '');
  const [price, setPrice] = useState(courseInfo.price || '');
  const [category, setCategory] = useState(courseInfo.category || '');
  const [file, setFile] = useState(null);
  const [portait, setPortait] = useState(courseInfo.portait || '');
  const [errors, setErrors] = useState({});
  const [instructor_id, setInstructor_id] = useState(userData.id || '');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let inputErrors = {};

    if (!title) inputErrors['title'] = 'El titulo es obligatorio';
    if (!description) inputErrors['description'] = 'La descripcion es obligatoria';
    if (!price) inputErrors['price'] = 'El precio es obligatorio';
    if (!category) inputErrors['category'] = 'La categoria es obligatoria';
    if (!file && !portait) inputErrors['file'] = 'El archivo es obligatorio';
    setErrors(inputErrors);

    if (Object.keys(inputErrors).length === 0) {
      try {
        let newPortait = portait;
        if (file) {
          const currentdate = new Date();
          const datetime = 
              `${currentdate.getDate()}_` +
              `${(currentdate.getMonth() + 1).toString().padStart(2, '0')}_` +
              `${currentdate.getFullYear()}_` +
              `${currentdate.getHours().toString().padStart(2, '0')}-` +
              `${currentdate.getMinutes().toString().padStart(2, '0')}-` +
              `${currentdate.getSeconds().toString().padStart(2, '0')}`;

          newPortait = `${datetime}_${file.name}`;

          const formData = new FormData();
          formData.append("file", file);
          formData.append("filename", newPortait);

          await fetch("/api/upload", {
              method: "POST",
              body: formData
          });
        }

        const res = await fetch('/api/courses/' + courseInfo.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, price, portait: newPortait, description, category, instructor_id })
        });

        if(res.ok){
          router.push("/teacher");
          router.refresh();
        }
      } catch (error) {
        setErrors({ general: "Error al actualizar el curso" });
      }
    }
  };

  return (
    <div className='mt-10 w-2/5 mx-auto'>
      <form onSubmit={onSubmit} className='border p-6' encType="multipart/form-data">
        <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
          Editar curso - {courseInfo.title}
        </h2>

        <label htmlFor="portait" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Imagen de portada: </label>  
        <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Selecciona la portada:' type="file" name='portait' id="portait" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <img className="w-2/6 mx-auto" src={courseInfo.portait ? `/uploads/` + courseInfo.portait : "https://www.mundodeportivo.com/urbantecno/hero/2022/01/404-1.jpg?width=1200&aspect_ratio=16:9"} alt={"Portada del curso " + courseInfo.title} />

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el titulo:' type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value.trim())} />
        {errors.title && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.title}</p>}

        <textarea className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa la descripcion:' name='description' value={description} onChange={(e) => setDescription(e.target.value.trim())}></textarea>
        {errors.description && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.description}</p>}

        <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el precio:' type="number" name='price' value={price} onChange={(e) => setPrice(Number(e.target.value.trim()))} />
        {errors.price && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.price}</p>}

        <select className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' name='category' value={category} onChange={(e) => setCategory(Number(e.target.value.trim()))}>
          <option value="">Selecciona categoría del curso</option>
          {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.category && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.category}</p>}

        <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Actualizar" />
        <Link href={"/teacher"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
      </form>
    </div>
  )
}

export default EditCourseForm