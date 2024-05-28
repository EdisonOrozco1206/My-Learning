import Link from 'next/link'

const NotFound = () => {
  return (
    <section className='flex h-[calc(100vh-20rem)]  justify-center items-center'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold mb-5'>404 - PaGiNa No EnCoNtRaDa</h1>
            <Link href="/" className='text-slate-300 bg-slate-800 p-2 hover:text-slate-500 text-2xl'>Volver al inicio</Link>
        </div>
    </section>
  )
}

export default NotFound