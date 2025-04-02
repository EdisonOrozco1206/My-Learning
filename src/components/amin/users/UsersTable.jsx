'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const UsersTable = ({users, admin}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    const router = useRouter()

    const changeRole = (e) => {
      setRole(e.target.value);
    }

    const updateRole = async () => {
      if(role && user){
        const res = await fetch(`/api/users/${user}`, {
          method: 'PUT',
          body: JSON.stringify({ role }),
          headers: { 'Content-Type': 'application/json' }
        });
      }

      hideModal();
      router.refresh()
    }
  
    var deleteUser = async () => {
      try {
        const res = await fetch(`/api/users/${user}`, {
          method: "DELETE",
          hader: {'Content-type': 'application/json'}
        })
        setModalVisible(false);
        router.refresh()
      } catch (error) {
        console.error(error.message);
      }
    }
  
    function showModal(id, role) {
      setModalVisible(true);
      setUser(id)

      if(role){
        setRole(role);
      }
    }

    function hideModal() {
      setModalVisible(false);
      setRole('')
    }

    return <>
        <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${isModalVisible ? 'visible' : 'invisible'}`}>
          <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
            <div className="bg-slate-200 w-full lg:w-auto p-4">
              {role || role != "" ? (
                <div>
                  <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                  Cambiar rol del usuario
                  </h2>
                  <p className="my-4">
                    <select name="role" className='w-full mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800' onChange={changeRole}>
                      <option value="teacher" selected={role=="teacher"}>Instructor</option>
                      <option value="user" selected={role=="user"}>Usuario</option>
                      <option value="admin" selected={role=="admin"}>Administrador</option>
                    </select>
                  </p>
                  <button onClick={updateRole} className="mx-2 cursor-pointer float-right px-4 py-2 border border-green-500 rounded-sm bg-green-500 text-white hover:bg-green-600">
                    Confirmar
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                  ¿Seguro de que deseas realizar esta acción?
                  </h2>
                  <p className="my-4">
                    Una vez eliminado este usuario, no se puede deshacer la acción
                  </p>
                  <button onClick={deleteUser} className="mx-2 cursor-pointer float-right px-4 py-2 border border-green-500 rounded-sm bg-green-500 text-white hover:bg-green-600">
                    Confirmar
                  </button>
                </div>
              )}
              <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600" onClick={hideModal}>
                Cancelar
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
                      {admin && (
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                          ROL
                        </th>
                      )}
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        NOMBRE
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        APELLIDOS
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        TIPO DOCUMENTO
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        # DOCUMENTO
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        CORREO
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        TELÉFONO
                      </th>
                      {admin && (
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                          ACCIONES
                        </th>
                      )}
                    </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                        {u.id}
                      </td>
                      {admin && (
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                          <button onClick={() => {showModal(u.id, u.role)}} className='capitalize bg-slate-800 text-white p-3'>
                            {u.role}
                          </button>
                        </td>
                      )}
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.lastname}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.document_type}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.document}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        {u.phone}
                      </td>
                      {admin && (
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-evenly border-r border-gray-300">
                          <button onClick={() => {showModal(u.id)}} className="cursor-pointer mx-2 px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600">
                            Eliminar
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
}

export default UsersTable