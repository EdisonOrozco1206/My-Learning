    import Link from "next/link"
import { prisma } from "@/libs/prisma"
import { cookies } from 'next/headers'
import ToggleDiv from "./ToggleDiv"
import { getSession } from "@/libs/libs"
import SearchInput from "./search/SearchInput"

const getCategories = async () => {
    return await prisma.category.findMany()
}


const Navbar = async () => {
    const categories = await getCategories()
    const userSession = await getSession()
    const user = userSession ? userSession.userData : ''

  return <>
    <header className="bg-slate-900 text-slate-300 p-2">
        <nav className="flex flex-row items-center font-bold pl-14">

            <div>
                <Link href="/">
                    <img src="/static/logo.png" alt="My learning logo" className="w-24" />
                </Link>
            </div>
            <ul className="flex items-center ml-5 w-1/3">
                {cookies().get('session') ? <>
                    <li className="mx-2">
                        <Link href="/mylearning" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Mi aprendizaje</Link>
                    </li>
                    {user.role == 'teacher' && <>
                        <li className="mx-2">
                            <Link href="/teacher" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Mis cursos</Link>
                        </li>
                        <li className="mx-2">
                            <Link href="/admins/certificates" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Certificados</Link>
                        </li>
                    </>}
                    {user.role == 'admin' && <>
                        <li className="mx-2">
                            <Link href="/admins/dashboard/" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Administración</Link>
                        </li>
                    </>}
                </> : <>
                    <li className="mx-2">
                        <Link href="/about" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Sobre nosotros</Link>
                    </li>
                    <li className="mx-2">
                        <Link href="/course" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Cursos</Link>
                    </li>
                </>}
                
                {user && user.role == "user" ? <>
                    <li className="mx-2">
                        <Link href="/course" className="border-b border-slate-300 p-4 hover:bg-slate-300 hover:text-black">Cursos</Link>
                    </li>
                </> : ""}

            </ul>

            <SearchInput></SearchInput>

            <ul className="float-right flex items-center ml-10 w-1/3">
                {
                    cookies().get('session') ? <>
                    
                        <li className="w-4/6 mr-16">
                            <ToggleDiv></ToggleDiv>
                        </li>

                    </> : <>
                    
                        <li>
                            <Link href="/user/login" className="p-3 block px-5 mx-2 border border-slate-300 hover:bg-slate-800">Acceder</Link>
                        </li>
                        <li>
                            <Link href="/user/register" className="p-3 px-5 mx-2 border border-slate-300 hover:bg-slate-400 bg-slate-300 text-black">Registrarse</Link>
                        </li>

                    </>
                }
                <div className="flex justify-between w-1/3">
                    <li className="bg-slate-300 hover:bg-slate-400 p-1 rounded-md cursor-pointer flex justify-center items-center">
                        <Link href={"/cart"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M17 17h-11v-14h-2"></path> <path d="M6 5l14 1l-1 7h-13"></path> </svg>
                        </Link> 
                    </li>
                    <li className="bg-slate-300 hover:bg-slate-400 p-1 rounded-md cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-language" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 5h7" />
                            <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
                            <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
                            <path d="M12 20l4 -9l4 9" />
                            <path d="M19.1 18h-6.2" />
                        </svg>
                    </li>
                </div>
            </ul>
        </nav>
    </header>
    
    <div className="bg-slate-300 text-sm text-slate-500 py-3 overflow-x-auto">
        {categories.map(cat => (
            <Link href={`/category/${cat.id}`} key={cat.id} className="hover:text-slate-700 mx-1 border-r cursor-pointer border-slate-500 px-4">
                {cat.name}
            </Link>
        ))}
    </div>
  </>
}

export default Navbar