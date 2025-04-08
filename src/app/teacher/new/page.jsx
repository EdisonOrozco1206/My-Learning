import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <div className='bg-slate-300 p-4 lg:w-5/6 mx-auto mt-10'>
        <div>
            <h1 className="text-center text-2xl">¡Enseña en My Learning!</h1>
            <p className='text-center text-sm'>Únete al equipo de instructores de My Learning</p>
        </div>
        <div>
            <img src="/static/instructors_team.webp" alt="Equipo instructores My Learning" className='block lg:w-1/2 mx-auto my-2' />
            <div className='flex flex-col items-center'>
                <p className='my-1'>En Colombia, contamos con </p>
                <p className='flex flex-col md:flex-row lg:flex-row justify-evenly my-2 bg-slate-800 w-full text-white'>
                    <span className='flex justify-evenly items-center p-6'>
                        <span className='flex items-center text-5xl animate-bounce'>
                            +100
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg> 
                        </span> 
                        <span className='animate-bounce text-2xl'>Instructores</span>
                    </span>
                    <span className='flex justify-evenly items-center'>
                        <span className='flex items-center text-5xl animate-bounce'>
                            +1000
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path> </svg>
                        </span> 
                        <span className='animate-bounce text-2xl'>Alumnos</span>
                    </span>
                </p>
                <p className='my-1'>Todos dispuestos a superarse diariamente</p>
            </div>
        </div>
        <div className='mt-4'>
            <h2 className="text-center text-2xl">Nuestra metodología de trabajo</h2>
            <p className='text-center text-sm'>¡Fácil!</p>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                {[
                    {
                    title: "Planifica e innova con tu curso",
                    src: "/static/new_1.jpg",
                    alt: "My Learning instructor setting up a course",
                    },
                    {
                    title: "Prepara el material para sus lecciones",
                    src: "/static/new_2.jpg",
                    alt: "My Learning instructor preparing videos",
                    },
                    {
                    title: "Ya estás listo para dar lo mejor de ti",
                    src: "/static/new_3.jpg",
                    alt: "My Learning happy instructor",
                    },
                ].map((item, index) => (
                    <div key={index} className="w-full md:w-1/3 bg-white p-4 flex flex-col items-center">
                    <h3 className="text-center mb-4">{item.title}</h3>
                    <div className="w-full h-64 overflow-hidden">
                        <Image
                        width={500}
                        height={500}
                        src={item.src}
                        alt={item.alt}
                        className="object-cover w-full h-full"
                        />
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Page