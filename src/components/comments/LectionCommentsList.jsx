'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

const LectionCommentsList = ({comments, userData}) => {
    const router = useRouter();

    const deleteComment = async (e, id) => {
        e.preventDefault()

        if(id){
            try {
                await fetch("/api/comments/"+id, {
                    method: "DELETE"
                });
                router.refresh();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className='border w-5/6 mx-auto mt-4'>
            {comments != '' ? (
                comments.map(c => (
                    <div key={c.div} className='grid grid-cols-2 w-full p-2 bg-slate-100 border-b border-slate-300'>
                        <div className='col-span-1'>
                            <h2 className='text-slate-500'>{c.user.name} {c.user.lastname} - <span className="text-sm">{c.user.email}</span></h2>
                            <p>{c.content}</p>
                        </div>
                        {userData && userData != '' && userData.id == c.user_id ? 
                            <div className='col-span-1 flex items-center justify-end'>
                                <Link href={"/comments/edit/"+c.id} className="float-right cursor-pointer mx-2 px-4 py-2 border border-sky-500 rounded-sm bg-sky-500 text-white hover:bg-sky-600">Editar</Link>
                                <button onClick={(e) => deleteComment(e, c.id)} className="float-right cursor-pointer mx-2 px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600">Eliminar</button>
                            </div>
                        : ''}
                    </div>
                ))
            ) : (
                <p className="p-4">Aún no hay comentarios disponibles</p>
            )}
        </div>
    )
}

export default LectionCommentsList