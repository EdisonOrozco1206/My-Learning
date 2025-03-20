import Link from "next/link"

const page = () => {

  return (
    <div className='bg-slate-300 p-4 w-full lg:w-4/5 mx-auto mt-10'>
      <div className='flex flex-col lg:flwx-row w-fit items-center gap-4 mx-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" className='text-yellow-500 bg-white rounded-full mx-auto my-2' viewBox="0 0 24 24" fill="none" width="40" height="40" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
          <path d="M12 7v5l3 3"></path>
        </svg>
        <h1 className='text-center text-xl'>Tu transacción está pendiente</h1>
      </div>
      <div>
        <h2 className="text-center text-sm text-slate-500 w-full lg:w-1/2 mx-auto">Una vez seamos notificados de la transaccion, haremos el resto del trabajo, no te preocupes ;), mientras tanto puedes...</h2>
        <div className="w-full lg:w-1/2 flex justify-center mx-auto mt-4">
          <Link href={"/"} className=" bg-slate-800 hover:bg-slate-900 text-center p-4 lg:p-2 text-white">Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default page