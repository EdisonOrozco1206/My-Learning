'use client'

import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
    
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        if(!isModalVisible){
            setModalVisible(true)
        }else{
            setModalVisible(null)
        }
    }

    return <>
        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${isModalVisible ? 'visible' : 'invisible'}`}>
            <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                <div className="bg-slate-200 p-10 w-1/2">
                    <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                        Mapa del sitio
                    </h2>
                    <ul className="my-4 list-disc">
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/">Inicio</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/about">Sobre Nosotros</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/courses">Cursos</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/user/register">Registrarse</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/user/login">Iniciar sesión</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/cart">Carrito</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/teacher/new">Enseñar en My learning</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/contact">Contáctanos</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/conditions">Condiciones</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="/privacyPolicy">Política de privacidad</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="#">Mapa del sitio</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="https://twitter.com" target="_blank">Twitter</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="https://instagram.com" target="_blank">Instagram</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="https://facebook.com" target="_blank">Facebook</Link></li>
                        <li><Link onClick={toggleModal} className='text-sm underline' href="https://linkedin.com" target="_blank">LinkedIn</Link></li>
                    </ul>
                    <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600" onClick={toggleModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>

        <footer className='mt-10 bg-slate-900 text-slate-300 pt-2'>
            <div className='px-14 flex flex-row justify-between items-center my-10  mx-auto w-4/5'>
                <div className='p-4'>
                    <ul className='inline-block mx-14'>
                        <Link href="/teacher/new" className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2'>Enseña en my learning</Link>
                        <Link href="/about" className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2'>¿Quienes somos?</Link>
                        <Link href="/contact" className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2'>Contactenos</Link>
                    </ul>
                    <ul className='inline-block mx-14'>
                        <Link href="/conditions" className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2'>Condiciones</Link>
                        <Link href="/privacyPolicy" className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2'>Politica de privacidad</Link>
                        <button onClick={toggleModal} className='block w-full text-lg border-b border-slate-300 hover:bg-slate-300 hover:text-slate-800 p-2 text-left'>Mapa del sitio</button>
                    </ul>
                </div>
                <div className=''>
                    <div>
                        <img className='w-40 mx-auto' src="/static/logo.png" alt="Logo de my learning" />
                    </div>
                    <div className='flex flex-row'>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                            </svg>
                        </Link>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M16.5 7.5l0 .01" />
                            </svg>
                        </Link>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                            </svg>
                        </Link>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-linkedin" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                <path d="M8 11l0 5" />
                                <path d="M8 8l0 .01" />
                                <path d="M12 16l0 -5" />
                                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='text-center text-xl p-4 border-t border-slate-300'>
                Todos los derechos reservados &copy; My learning inc. 2024
            </div>
        </footer>
    </>
}

export default Footer