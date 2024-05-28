import Link from "next/link"
import { prisma } from "@/libs/prisma"
// import NavbarCategories from "./NavbarCategories"

const getCategories = async () => {
    // const response = await fetch("http://localhost:3000/api/categories/", {
    //     method: "GET"
    // })
    // const categories = await response.json()
    // return categories

    return await prisma.category.findMany()
}

const Navbar = async () => {
    const categories = await getCategories()

  return <>
    <header className="bg-slate-900 text-slate-300 p-2">
        <nav className="flex flex-row items-center font-bold pl-14">

            <div>
                <Link href="/">
                    <img src="static/logo.png" alt="My learning logo" className="w-24" />
                </Link>
            </div>
            <ul className="flex items-center ml-10 w-1/3 borcer border-white">
                <li className="mx-2">
                    <Link href="/about" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Sobre nosotros</Link>
                </li>
                <li className="mx-2">
                    <Link href="" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Cursos</Link>
                </li>
                <li className="mx-2">
                    <Link href="" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Enseñar</Link>
                </li>

                <div className="right-section flex flex-row items-center">
                    
                </div>
            </ul>

            <ul className="w-1/3">
                <form action="" className="flex items-center w-full">
                    <input type="text" name="course-search" placeholder="Busca un curso..." className="w-3/4 inline-block border-none p-2 text-black" />

                    <button className="inline-block bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                    </button>
                </form>
            </ul>

            <ul className="float-right flex items-center ml-10 w-1/3">
                <li>
                    <Link href="/user/login" className="p-3 block px-5 mx-2 border border-slate-300 hover:bg-slate-800">Iniciar Sesion</Link>
                </li>
                <li>
                    <Link href="/user/register" className="p-3  px-5 mx-2 border border-slate-300 hover:bg-slate-400 bg-slate-300 text-black">Registrarse</Link>
                </li>
                <li className="bg-slate-300 hover:bg-slate-400 p-1 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-language" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 5h7" />
                        <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
                        <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
                        <path d="M12 20l4 -9l4 9" />
                        <path d="M19.1 18h-6.2" />
                    </svg>
                </li>
            </ul>
        </nav>
    </header>
    
    <div className="bg-slate-300 text-sm text-slate-500 py-3">
        {categories.map(cat => (

            <Link href={`/category/${cat.id}`} key={cat.id} className="hover:text-slate-700 mx-1 border-r cursor-pointer border-slate-500 px-4">
                {cat.name}
            </Link>
        ))}
    </div>
  </>
}

export default Navbar