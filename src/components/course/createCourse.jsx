'use client';

import { useRouter } from "next/navigation";

const CreateCourseForm = ({ categories, userData }) => {
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();

        const instructor_id = userData.id
        const title = e.target.title.value
        const description = e.target.description.value
        const price = parseInt(e.target.price.value)
        const category = parseInt(e.target.category.value)
        const currentdate = new Date();
        const datetime = 
            `${currentdate.getDate()}_` +
            `${(currentdate.getMonth() + 1).toString().padStart(2, '0')}_` +
            `${currentdate.getFullYear()}_` +
            `${currentdate.getHours().toString().padStart(2, '0')}-` +
            `${currentdate.getMinutes().toString().padStart(2, '0')}-` +
            `${currentdate.getSeconds().toString().padStart(2, '0')}`;
        
        const file = e.target.portait.files[0];
        const portait = file && datetime ? `${datetime}_${file.name}` : '';
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", portait);

        console.log(portait);
        

        await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
    
        await fetch('/api/courses', {
            method: 'POST',
            body: JSON.stringify({title, price, portait, description, category, instructor_id})
        })

        router.push("/teacher")
        router.refresh()
    };

    return (
        <div className='mt-10 w-2/5 mx-auto'>
            <form onSubmit={onSubmit} className='border p-6' encType="multipart/form-data">
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Publicar curso
                </h2>

                <label htmlFor="portait" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Imagen de portada: </label>  
                <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Selecciona la portada:' type="file" name='portait' id="portait" accept="image/*" required />
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el titulo:' type="text" name='title' required />

                <textarea className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa la descripcion:' name='description' required ></textarea>
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Ingresa el precio:' type="number" name='price' required />

                <select className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' name='category' required>
                    <option value="">Selecciona categoría del curso</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Publicar" />
            </form>
        </div>
    );
}

export default CreateCourseForm;
