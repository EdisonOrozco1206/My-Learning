"use client";

import { handleLogout } from "@/libs/logout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "@/libs/libs";

export default function ToggleDiv() {
    const [isVisible, setIsVisible] = useState(false);
    const [role, setRole] = useState('')

    useEffect(() => {
        async function getUserRole(){
            let user = await getSession()
            if(user) setRole(user.userData.role)
        }
        getUserRole()
    }, [])

    return (    
        <div className="relative w-full">
            <button onClick={() => setIsVisible(!isVisible)} className="p-3 px-5 mx-2 border w-full border-slate-300 hover:bg-slate-800 flex items-center justify-evenly">
                Acciones
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>

                    {isVisible ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-up" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" />
                        </svg>
                    : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-down" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                        </svg>
                    }
                </div>
            </button>

            {isVisible && (
                <div className=" bg-slate-900 absolute mx-2 border border-slate-300 w-full">
                    <ul>
                        <li onClick={() => setIsVisible(false)}>
                            <Link href="/user/profile" className="p-3 px-5 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">Mí Perfil</Link>
                        </li>
                        {role && role == "teacher" ? (
                            <div>
                                <li onClick={() => setIsVisible(false)}>
                                    <Link href="/admins/certificates" className="p-3 px-5 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">Certificados</Link>
                                </li>
                                <li onClick={() => setIsVisible(false)}>
                                    <Link href="/teacher/students" className="p-3 px-5 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">Estudiantes</Link>
                                </li>
                            </div>
                        ): ''}
                        <li>
                            <form action={handleLogout}>
                                <button className="p-3 px-5 w-full  hover:bg-slate-300 text-slate-300 hover:text-black border-t border-slate-300">
                                    Cerrar sesión
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}