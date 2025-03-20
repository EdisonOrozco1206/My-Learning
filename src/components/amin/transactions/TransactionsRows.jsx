'use client'

import Link from "next/link";
import TransactionsTable from "./TransactionsTable";
import { useState } from "react";
import DownloadTransactionsReport from "@/components/excel/DownloadTransactionsReport";

const TransactionsRows = ({transactions}) => {
    const [skip, setSkip] = useState(10)
    const [searchModal, setSearchModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)
    const [searchInfo, setSearchInfo] = useState(null)

    const toggleSearchModal = () => {
        if(!searchModal){
          setSearchModal(true)
        }else{
          setSearchModal(false)
          setSearchQuery(null)
          setSearchInfo(null)
        }
    }
    
    const fetchSearchData = async (e) => {
        e.preventDefault()
        let res = await fetch("/api/transactions/search/"+searchQuery);
        let data = await res.json();
        setSearchInfo([data.transaction[0]])
    }

    return (

        <div>
            {/* Search Modal */}
            <div id="modal" className={`fixed top-0 left-0 h-screen w-full ${searchModal ? 'visible' : 'invisible'}`}>
                <div className="h-full flex justify-center items-center bg-slate-900 bg-opacity-50">
                    <div className="bg-slate-200 p-4 w-full lg:w-10/12">
                        <div>
                            <h2 className="text-xl pb-1 text-slate-800 font-bold border-b border-slate-800 uppercase">
                                Buscar curso
                            </h2>
                            <form action="" className='border flex justify-center'>
                                <input onChange={e => setSearchQuery(e.target.value)} value={searchQuery || ''} type="number" name="searchQuery" placeholder='Buscar ID' className='w-5/6 mx-auto my-8 p-2 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' />
                                <input onClick={(e) => fetchSearchData(e)} type="submit" value="Buscar" className='mx-auto cursor-pointer bg-slate-800 text-white my-8 px-3 hover:bg-slate-600'/>
                            </form>
                            {searchInfo ? (
                                <TransactionsTable transactions={searchInfo}></TransactionsTable>
                            ) : ''}
                            <button className="mx-2 cursor-pointer float-right px-4 py-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-red-600" onClick={toggleSearchModal}>
                                Cerrar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-slate-300 mt-10 lg:w-4/5 mx-auto p-5">
                <div className="border-b border-slate-800 flex justify-center items-center gap-4">
                    <h2 className="text-xl lg:text-3xl text-slate-800 font-bold text-center uppercase">
                        Adminitracion de transacciones   
                    </h2>
                    <DownloadTransactionsReport all={true}/>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Link href="/admins/dashboard" className='col-span-1 mt-2 flex items-center justify-center w-full bg-slate-800 text-center text-white p-4 hover:bg-slate-900'>
                        Regresar
                    </Link>
                    <button onClick={toggleSearchModal} className='col-span-1 mt-2 flex items-center justify-center w-full bg-slate-800 text-center text-white p-4 hover:bg-slate-900'>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg> 
                    </button>
                </div>
                <div className="w-full lg:w-2/6 mx-auto flex justify-between mt-4">
                    <button className="cursor-pointer border border-slate-800 bg-slate-800 text-white px-4 py-2 hover:bg-slate-900" title="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M10 12l10 0"></path> <path d="M10 12l4 4"></path> <path d="M10 12l4 -4"></path> <path d="M4 4l0 16"></path> </svg> 
                    </button>
                    <button className="cursor-pointer border border-slate-800 bg-slate-800 text-white px-4 py-2 hover:bg-slate-900" title="Siguiente">
                        <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M14 12l-10 0"></path> <path d="M14 12l-4 4"></path> <path d="M14 12l-4 -4"></path> <path d="M20 4l0 16"></path> </svg> 
                    </button>

                </div>
                <TransactionsTable transactions={transactions}></TransactionsTable>
            </div>
        </div>
    )
}

export default TransactionsRows