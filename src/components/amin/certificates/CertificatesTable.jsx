'use client'

import { useState, Suspense, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const CertificatesTable = ({certificates, role}) => {
    const router = useRouter()
    const [isModalVisible, setModalVisible] = useState(false);
    const [certificate, setCertificate] = useState(null)
    const [userModal, setUserModal] = useState(null)
    const [user, setUser] = useState([])
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        if(role == "admin"){
            setIsAdmin(1)
        }else if(role == "teacher"){
            setIsAdmin(0)
        }
    }, [])

    const toggleUserModal = async (userInfo) => {
        if(!userModal){
            setUserModal(true)
            setUser(userInfo)
        }else{
            setUserModal(null)
            setUser([])
        }
    }

    
    const toggleDeletionModal = (certificate) => {
        if(!isModalVisible){
            setModalVisible(true)
            setCertificate(certificate)
        }else{
            setModalVisible(null)
            setCertificate(null)
        }
    }
    
    const deleteCertificate = async () => {
        try {
            await fetch("/api/certificates/"+certificate, {method: "DELETE"});
            toggleDeletionModal()
            router.refresh()
        } catch (error) {
            console.log(error.message);
        }
    }

    return <>
        {/* Deletion Modal */}
        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${isModalVisible ? 'visible' : 'invisible'}`}>
            <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                <div className="bg-slate-200 p-4">
                    <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                        ¿Seguro de que deseas realizar esta acción?
                    </h2>
                    <p className="my-4">
                        Una vez eliminado este registro, no se puede deshacer la acción
                    </p>
                    <button onClick={deleteCertificate} className="mx-2 cursor-pointer float-right px-4 py-2 border border-green-500 rounded-sm bg-green-500 text-white hover:bg-green-600">
                        Confirmar
                    </button>
                    <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600" onClick={toggleDeletionModal}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${userModal ? 'visible' : 'invisible'}`}>
            <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                <div className="bg-slate-200 p-4 w-full lg:w-2/6">
                    <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                        Información del usuario
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
                            <div>Rol</div>
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
                            <div>Teléfono</div>
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
                                        FECHA APROBACIÓN
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                                        OPCIONES
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <Suspense fallback={<h1>Cargando contenido</h1>}>
                                    {certificates.length > 0 ? certificates.map((c) => (
                                        <tr key={c.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                                                {c.id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                <button onClick={() => {toggleUserModal(c.user)}} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 block mx-auto text-center">
                                                    {c.user.document}
                                                </button>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                <Link href={"/course/details/"+c.course_id}  title="Ver detalles del curso" className="hover:underline bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 block mx-auto text-center">
                                                    {c.course.title.slice(0, 40)}...
                                                </Link>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                                                {c.validated_at}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-evenly border-r border-gray-300">
                                                <Link href={`/admins/certificates/edit/${isAdmin}/${c.id}`} className="cursor-pointer mx-2 px-4 py-2 border border-sky-500 rounded-sm bg-sky-500 text-white hover:bg-sky-600">
                                                    Editar
                                                </Link>
                                                {role == "admin" ? (
                                                    <button onClick={() => {toggleDeletionModal(c.id)}} className="cursor-pointer mx-2 px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600">
                                                        Eliminar
                                                    </button>
                                                ) : ('')}
                                            </td>
                                        </tr>
                                    )) : (<p>Parece que no hay elementos para mostrar</p>)}
                                </Suspense>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CertificatesTable