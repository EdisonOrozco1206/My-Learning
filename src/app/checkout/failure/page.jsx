'use client'

import Link from "next/link"
import { useCartStore } from "@/libs/cartLibs"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  const { clearCart } = useCartStore()

  const clearCartAndRedirect = () => {
    clearCart()
    router.push("/")
  }

  return (
    <div className='bg-slate-300 p-4 w-4/5 mx-auto mt-10'>
      <div className='flex w-fit items-center gap-4 mx-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" className='text-red-500 bg-white rounded-full mx-auto my-2' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M18.364 5.636l-12.728 12.728"></path>
        </svg>
          <h1 className='text-center text-xl'>Tu transacción ha sido rechazada</h1>
      </div>
      <div>
        <h2 className="text-center text-sm text-slate-500">Algo falló durante el proceso de pago, te invitamos a....</h2>
        <div className="w-1/2 flex justify-between mx-auto mt-4">
          <button onClick={clearCartAndRedirect} className="border border-slate-800 text-black hover:bg-slate-900 text-center p-2 hover:text-white">Volver al inicio</button>
          <Link href={"/cart"} className="bg-slate-800 hover:bg-slate-300 text-center p-2 text-white hover:border  hover:text-black border-slate-800">Reintentar pago</Link>
        </div>
      </div>
    </div>
  )
}

export default page