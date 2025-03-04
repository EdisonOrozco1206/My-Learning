'use client'
import { useRouter } from "next/navigation"
import Link from "next/link";

const NewCommentForm = ({lection, userId}) => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const content = e.target.content.value.trim()

        if(content != "Déjanos saber tu opinión ;)"){
            const lection_id = Number(lection)
            const user_id = Number(userId)

            try {
                await fetch("/api/comments/", {
                    method: "POST",
                    body: JSON.stringify({content, user_id, lection_id})
                });
                router.push("/lections/"+lection)
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
            <form onSubmit={onSubmit} className='border p-6'>
                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Deja tú comentario sobre la lección
                </h2>

                <textarea name="content" required className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800" defaultValue={"Déjanos saber tu opinión ;)"}></textarea>

                <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Publicar comentario"/>
                <Link href={"/lections/"+lection} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2">Regresar</Link>
            </form>
      </div>
    )
}

export default NewCommentForm