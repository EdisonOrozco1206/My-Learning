'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";

const EditCommentForm = ({comment}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateTextAndNumbersLong = (text) => {
            const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]{1,200}$/;
            return textRegex.test(text);
        };

        setErrors([])
        let inputErrors = []

        if(!content) {
            inputErrors['content'] = 'Contenido no válido';
        }else if(!validateTextAndNumbersLong(content)){
            inputErrors['content'] = 'Contenido demasiado largo, max. 200 caracteres';
        }
        setErrors(inputErrors)

        if(Object.keys(inputErrors).length == 0){
            try {
                setLoading(true);
                document.body.style.cursor = "wait";
                const res = await fetch("/api/comments/"+comment.id, {
                    method: "PUT",
                    body: JSON.stringify({content}),
                    headers: { "Content-Type": "application/json", },
                });

                if(res.ok){
                    router.push("/lections/"+comment.lection_id)
                    router.refresh()
                }
            } catch (error) {
                inputErrors['general'] = "Error al actualizar el comentario"
                setErrors(inputErrors)
            } finally {
                setLoading(false);
                document.body.style.cursor = "default";
            }
        }
    }

    return (
        <div className='mt-10 w-full lg:w-2/5 mx-auto'>
            <form onSubmit={(e) => onSubmit(e)} className='border p-6'>
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Edita tu comentario sobre la lección
                </h2>

                <textarea name="content" className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800" defaultValue={comment.content} onChange={(e) => setContent(e.target.value.trim())}></textarea>
                {errors.content && <span className="block text-xs text-red-500 w-5/6 mx-auto">{errors.content}</span>}

                {errors.general && <span className="block text-xs text-red-500 w-5/6 mx-auto">{errors.general}</span>}
                <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" disabled={loading} value={loading ? "Actualizando..." : "Actualizar"}/>
                <Link href={"/lections/"+comment.lection_id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
      </div>
    )
}

export default EditCommentForm