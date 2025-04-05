'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateCourseForm = ({ categories, userData }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const [portait, setPortait] = useState('');
    const [errors, setErrors] = useState([]);
    const [instructor_id, setInstructor_id] = useState('');

    useEffect(() => {
        if (!instructor_id) {
            setInstructor_id(parseInt(userData.id))
        }
    }, [instructor_id]);

    const onSubmit = async (e) => {
        e.preventDefault()

        const validatePhoneNumber = (phoneNumber) => {
            const phoneRegex = /^\+?\d{1,15}$/;
            return phoneRegex.test(phoneNumber);
        };
        const validateTextAndNumbers = (text) => {
            const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]{1,100}$/;
            return textRegex.test(text);
        };
        const validateTextAndNumbersLong = (text) => {
            const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]{1,200}$/;
            return textRegex.test(text);
        };

        setErrors([]);
        let inputErrors = {};

        if (!title){
            inputErrors['title'] = 'El titulo es obligatorio'
        }else if(!validateTextAndNumbers(title)){
            inputErrors['title'] = 'Titulo demasiado largo max. 100 caracteres'
        }
        if (!description){ 
            inputErrors['description'] = 'La descripcion es obligatorio'
        }else if(!validateTextAndNumbersLong(description)){
            inputErrors['description'] = 'Descripcion muy larga max. 200 caracteres'
        }
        if (!price){
            inputErrors['price'] = 'El precio es obligatorio'
        }else if(!validatePhoneNumber(price)){
            inputErrors['price'] = 'Precio no valido'
        }

        if (!category) inputErrors['category'] = 'La categoria es obligatoria' 
        if(!file) inputErrors['file'] = 'El archivo es obligatorio'
        setErrors(inputErrors);

        if(!errors || Object.keys(errors).length === 0){
            try {
                setLoading(true);
                document.body.style.cursor = "wait";

                const formData = new FormData()
                formData.append("file", file)

                const fileReq = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                })
                const fileRes = await fileReq.json()
            
                if(fileReq.ok){
                    const res = await fetch('/api/courses', {
                        method: 'POST',
                        body: JSON.stringify({title, price, portait: fileRes.url, description, category, instructor_id})
                    })
            
                    if(res.ok){
                        router.push("/teacher")
                        router.refresh()
                    }
                }else{
                    setErrors({ general: "Error al subir la imagen de portada" });
                }
            } catch (error) {
                setErrors({ general: "Error al publicar el curso" });
            } finally {
                setLoading(false);
                document.body.style.cursor = "default";
            }
        }
    };

    return (
        <div className='mt-10 w-full lg:w-2/5 mx-auto'>
            <form onSubmit={onSubmit} className='border p-6' encType="multipart/form-data">
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Publicar curso
                </h2>

                <label htmlFor="portait" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Imagen de portada: </label>  
                <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Selecciona la portada:' type="file" name='portait' id="portait" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                {errors.file && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.file}</p>}
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el título:' type="text" name='title' onChange={(e) => setTitle(e.target.value.trim())} />
                {errors.title && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.title}</p>}

                <textarea className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa la descripción:' name='description'  onChange={(e) => setDescription(e.target.value.trim())}></textarea>
                {errors.description && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.description}</p>}
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el precio:' type="number" name='price'  onChange={(e) => setPrice(Number(e.target.value.trim()))}/>
                {errors.price && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.price}</p>}

                <select className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' name='category' onChange={(e) => setCategory(Number(e.target.value.trim()))}>
                    <option value="">Selecciona la categoría del curso</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {errors.category && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.category}</p>}

                {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}    
                <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" disabled={loading} value={loading ? "Publicando..." : "Publicar"} />
                <Link href={"/teacher"} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
        </div>
    )
}

export default CreateCourseForm;
