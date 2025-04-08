'use client'

import Link from "next/link"
import { useState, Suspense } from "react";

const TransactionsTable = ({transactions}) => {
    const [userModal, setUserModal] = useState(null)
    const [user, setUser] = useState([])

    const toggleUserModal = async (userInfo) => {
        if(!userModal){
            setUserModal(true)
            setUser(userInfo)
             
        }else{
            setUserModal(null)
            setUser([])
        }
    }

    return <>
        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${userModal ? 'visible' : 'invisible'}`}>
            <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                <div className="bg-slate-200 p-4 w-full lg:w-2/6">
                    <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                        Informacion del usuario
                    </h2>
                    <div className="mb-4">
                        <div className="flex justify-between border-b border-slate-800">
                            <div>ID</div>
                            <div>{user.id}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Documento</div>
                            <div>{user.document_type} - {user.document}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Role</div>
                            <div>{user.role}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Nombre</div>
                            <div>{user.name}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Apellidos</div>
                            <div>{user.lastname}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Correo</div>
                            <div>{user.email}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-800">
                            <div>Telefono</div>
                            <div>{user.phone}</div>
                        </div>
                    </div>
                    <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-slate-800 rounded-sm bg-slate-800 text-white hover:bg-slate-900" onClick={toggleUserModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            ID
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            USUARIO
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            CURSO
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            MONTO
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            ESTADO
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                            FECHA
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Suspense fallback={<h1>Cargando contenido</h1>}>
                                        {transactions.length > 0  ?  transactions.map((t) => (
                                            <tr key={t.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                                                    {t.id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                    <button onClick={() => {toggleUserModal(t.user)}} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 block mx-auto text-center">
                                                        {t.user.document}
                                                    </button>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                    <Link href={"/course/details/"+t.course_id}  title="Ver detalles del curso" className="hover:underline bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 block mx-auto text-center">
                                                        {t.course.title.slice(0, 40)}...
                                                    </Link>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                    {t.amount}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                    {t.status == "success" && (
                                                        <p className="block w-full bg-green-500 text-white text-center py-2 text-md">Aprobado</p>
                                                    )}
                                                    {t.status == "failure" && (
                                                        <p className="block w-full bg-red-500 text-white text-center py-2 text-md">Fallído</p>
                                                    )}
                                                    {t.status == "pending" && (
                                                        <p className="block w-full bg-yellow-500 text-white text-center py-2 text-md">Pendiente</p>
                                                    )}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                    {t.date}
                                                </td>
                                            </tr>
                                        )) : (<tr>
                                            <td colSpan={6} className="text-center">No hay nada para mostrar</td>
                                        </tr>)}
                                    </Suspense>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default TransactionsTable