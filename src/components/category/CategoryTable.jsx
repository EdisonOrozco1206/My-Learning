'use client'

import Link from "next/link"
import { Suspense, useState } from "react"
import { useRouter } from 'next/navigation';

const CategoryTable = ({categories}) => {
    const router = useRouter()
    const [isModalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState('');

    var deleteCategory = async (id) => {
        try {
          const res = await fetch(`/api/categories/${category}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
          })
          setModalVisible(false);
          router.refresh()
        } catch (error) {
          console.error(error.message);
        }
    }

    function showModal(category_id) {
      setModalVisible(true);
      setCategory(category_id)
    }

    function hideModal() {
      setModalVisible(false);
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
            Una vez eliminada esta categoría, no se puede deshacer la acción
          </p>
          <button onClick={deleteCategory} className="mx-2 cursor-pointer float-right px-4 py-2 border border-green-500 rounded-sm bg-green-500 text-white hover:bg-green-600">
            Confirmar
          </button>
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
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        TÍTULO
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r border-gray-300">
                        ADMINISTRAR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Suspense fallback={<h1>Cargando contenido</h1>}>
                      {categories.map(cat => (
                        <tr key={cat.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                            {cat.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-gray-300">
                            {cat.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-evenly border-r border-gray-300">
                            <Link href={`/admins/category/edit/${cat.id}`} className="cursor-pointer mx-2 px-4 py-2 border border-sky-500 rounded-sm bg-sky-500 text-white hover:bg-sky-600">
                              Editar
                            </Link>
                            <button onClick={() => {showModal(cat.id)}} className="cursor-pointer mx-2 px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600">
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Suspense>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </>
}

export default CategoryTable