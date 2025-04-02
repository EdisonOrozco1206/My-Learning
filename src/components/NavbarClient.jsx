'use client'

import Link from "next/link";
import { useState } from "react";
import SearchInput from "./search/SearchInput";
import ToggleDiv from "./ToggleDiv";

const NavbarClient = ({ categories, user, sessionCookie }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-slate-900 text-slate-300 p-2 z-50">
                <nav className="flex items-center justify-between px-4 lg:px-14">

                    <div className="flex items-center justify-center w-1/6">
                        <Link href="/">
                            <img src="/static/logo.png" alt="My Learning Logo" className="w-24" />
                        </Link>
                    </div>

                    {/* Botón del menú para móviles */}
                    <button
                        className="lg:hidden text-white p-2 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    {/* Normal Navbar  */}
                    <ul className={`hidden lg:flex flex-nowrap items-center justify-end gap-3 w-5/6`}>
                        {sessionCookie ? (
                            <>
                                <li><Link href="/mylearning" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Mi aprendizaje</Link></li>
                                {user.role === 'user' && <li><Link href="/course" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Cursos</Link></li>}
                                {user.role === 'teacher' && <li><Link href="/teacher" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Mis cursos</Link></li>}
                                {user.role === 'admin' && <li><Link href="/admins/dashboard/" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Administración</Link></li>}
                            </>
                        ) : (
                            <>
                                <li><Link href="/about" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Nosotros</Link></li>
                                <li><Link href="/course" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300">Cursos</Link></li>
                            </>
                        )}
                        <li className="w-1/3">
                            <SearchInput />
                        </li>
                        {sessionCookie ? (
                            <li><ToggleDiv setMenuOpen={setMenuOpen} /></li>
                        ) : (
                            <>
                                <li><Link href="/user/login" className="p-3 border border-slate-300 hover:bg-slate-800">Acceder</Link></li>
                                <li><Link href="/user/register" className="p-3 border border-slate-300 hover:bg-slate-400 bg-slate-300 text-black">Registrarse</Link></li>
                            </>
                        )}
                        <Link href="/cart" className="bg-slate-300 text-slate-900 p-3 hover:bg-slate-400 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 17h-11v-14h-2"></path> <path d="M6 5l14 1l-1 7h-13"></path> </svg> 
                        </Link>
                    </ul>

                    {/* Responsive Navbar  */}
                    <div className={`fixed top-0 left-0 w-full h-screen bg-slate-900 p-6 z-50 flex flex-col gap-4 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        {/* Botón para cerrar el menú */}
                        <button className="text-white text-right text-2xl" onClick={() => setMenuOpen(false)} >
                            ✖
                        </button>

                        <ul className="flex flex-col items-center gap-4 overflow-y-auto h-full">
                            {sessionCookie ? (
                                <>
                                    <li className="w-full"><Link href="/mylearning" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Mi aprendizaje</Link></li>
                                    {user.role === 'teacher' && <li className="w-full"><Link href="/teacher" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Mis cursos</Link></li>}
                                    {user.role === 'admin' && <li className="w-full"><Link href="/admins/dashboard/" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Administración</Link></li>}
                                </>
                            ) : (
                                <>
                                    <li className="w-full"><Link href="/about" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Nosotros</Link></li>
                                    <li className="w-full"><Link href="/course" className="p-4 hover:bg-slate-300 hover:text-black border-b border-slate-300 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Cursos</Link></li>
                                </>
                            )}
                            <li className="w-full">
                                <SearchInput />
                            </li>
                            <Link href="/cart" className="bg-slate-300 text-slate-900 p-3 hover:bg-slate-400 w-full text-center mt-4 flex justify-center" onClick={() => setMenuOpen(!menuOpen)}>
                                Carrito de compras 
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 17h-11v-14h-2"></path> <path d="M6 5l14 1l-1 7h-13"></path> </svg> 
                            </Link>
                            {sessionCookie ? (
                                <li className="w-full">
                                    <ToggleDiv setMenuOpen={setMenuOpen} />
                                </li>
                            ) : (
                                <div className="flex justify-evenly gap-4 w-full">
                                    <li className="w-1/2"><Link href="/user/login" className="p-3 border border-slate-300 hover:bg-slate-800 block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Acceder</Link></li>
                                    <li className="w-1/2"><Link href="/user/register" className="p-3 border border-slate-300 hover:bg-slate-400 bg-slate-300 text-black block text-center w-full" onClick={() => setMenuOpen(!menuOpen)}>Registrarse</Link></li>
                                </div>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="bg-slate-300 overflow-x-auto">
                <ul className="flex justify-start gap-2 p-3">
                    {categories.map(c => (
                        <Link href={`/category/${c.id}`} key={c.id} className="text-xs capitalize  text-slate-500 border-r border-slate-500 px-2 hover:text-slate-600 whitespace-nowrap">{c.name}</Link>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default NavbarClient;