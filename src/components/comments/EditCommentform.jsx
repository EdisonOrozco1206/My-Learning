'use client'
import { useRouter } from "next/navigation"
import Link from "next/link";

const NewCommentForm = ({comment, lection}) => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const content = e.target.content.value.trim()

        if(content != ""){
            try {
                await fetch("/api/comments/"+comment.id, {
                    method: "PUT",
                    body: JSON.stringify({content}),
                    headers: { "Content-Type": "application/json", },
                });
                router.push("/lections/"+comment.lection_id)
                router.refresh()
            } catch (error) {
                alert(error.message);
            }
        }else{
            alert("Debes cambiar el mensaje");
        }
    }

    return (
        <div className='mt-10 w-2/5 mx-auto'>
            <form onSubmit={(e) => onSubmit(e)} className='border p-6'>
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Edita tú comentario sobre la lección
                </h2>

                <textarea name="content" required className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800" defaultValue={comment.content}></textarea>

                <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Modificar"/>
                <Link href={"/lections/"+comment.lection_id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
      </div>
    )
}

export default NewCommentForm