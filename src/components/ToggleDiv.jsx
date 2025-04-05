"use client";

import { handleLogout } from "@/libs/logout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "@/libs/libs";

export default function ToggleDiv({ setMenuOpen }) {
    const [role, setRole] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        async function getUserRole() {
            let user = await getSession();
            if (user) setRole(user.userData.role);
        }
        getUserRole();
    }, []);

    const closeMenus = () => {
        setIsVisible(false);
        setMenuOpen(false);
    };

    return (
        <div className="relative w-full z-50 md:my-4 border">
            {/* Botón de Acciones */}
            <button 
                onClick={() => setIsVisible(!isVisible)} 
                className="p-3 border w-full border-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2 text-white">
                Acciones
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    {isVisible ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" />
                        </svg>
                    : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                        </svg>
                    }
                </div>
            </button>

            {/* Menú desplegable */}
            {isVisible && (
                <div className="bg-slate-900 absolute w-full border border-slate-300 mt-1">
                    <ul>
                        <li onClick={closeMenus}>
                            <Link href="/user/profile" className="p-3 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">
                                Mi Perfíl
                            </Link>
                        </li>
                        {role === "teacher" && (
                            <>
                                <li onClick={closeMenus}>
                                    <Link href="/admins/certificates" className="p-3 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">
                                        Certificados
                                    </Link>
                                </li>
                                <li onClick={closeMenus}>
                                    <Link href="/teacher/students" className="p-3 block text-center w-full border-t border-slate-300 hover:bg-slate-300 text-slate-300 hover:text-black">
                                        Aprendices
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={(e) => {
                                    e.preventDefault();
                                    closeMenus();
                                    handleLogout();
                                }} className="p-3 w-full hover:bg-slate-300 text-slate-300 hover:text-black border-t border-slate-300">
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}