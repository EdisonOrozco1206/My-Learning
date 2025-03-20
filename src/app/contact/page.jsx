import React from 'react'

const ContactPage = () => {
  return (
    <div className='bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10'>
        <h1 className="text-center text-2xl">!Contactanos¡</h1>
        <span className='block w-full text-center text-sm '>No dudes en contactarnos ante cualquier inquietud</span>

        <div className='mt-4'>
            <div>
                <h2 className='text-center text-xl'>Nuestros medios de contacto</h2>
                <div className='mt-4 bg-white p-4 flex flex-col lg:flex-row justify-around w-full gap-4'>
                    <div>
                        <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="100" height="100" strokeWidth="2"> <path d="M16 20h3a1 1 0 0 0 1 -1v-14a1 1 0 0 0 -1 -1h-3v16z"></path> <path d="M5 20h3v-16h-3a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1z"></path> <path d="M16 4l-4 4l-4 -4"></path> <path d="M4 6.5l8 7.5l8 -7.5"></path> </svg> 
                        <p className='text-center'>Puedes contactarnos a nuestro correo</p>
                        <p className='text-center text-sm underline'><a href="mailto:andresorozco1206@gmail.com" target='_blank'>andresorozco1206@gmail.com</a></p>
                    </div>
                    <div>
                        <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="100" height="100" strokeWidth="2"> <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path> <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path> </svg> 
                        <p className='text-center'>Puedes contactarnos a nuestro whatsapp</p>
                        <p className='text-center text-sm underline'><a href="https://wa.me/+573026357194" target='_blank'>+57 3026357194</a></p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='text-center text-xl'>Tambien puedes visitarnos en nuestra sede</h2>
                <iframe className='w-full mt-2' src="https://www.google.com/maps/embed?pb=!4v1731598176412!6m8!1m7!1suQayFZTLqeAaWoRuOd7UzA!2m2!1d6.206313941251327!2d-75.6016182838289!3f22.748774425908532!4f-3.1634283876095566!5f1.8703224209882943" width="600" height="450" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
  )
}

export default ContactPage