'use client'

import { useCartStore } from "@/libs/cartLibs"
import { api } from "@/libs/apiMercadopago"
import { useRouter } from "next/navigation"
import { getSession } from "@/libs/libs"
import Image from "next/image"
import Link from "next/link"

const Page = () => {
    const router = useRouter();
    const { cart, removeFromCart, clearCart } = useCartStore()
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleBuy = async () => {
        const userData = await getSession()

        if(!userData){
            router.push("/user/login");
        }

        const url = await api.message.submit(cart, userData.userData);
        router.push(url);
    };

    return (
        <div className="bg-slate-300 mt-10 lg:w-4/5 mx-auto p-5">
            <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">
                Tu carrito de compras
            </h2>

            {cart.length == 0 ? (
                <div>
                    <p>Parece que aún no hay nada en tu carrito de compras</p>
                </div>
            ) : (
                <div className="flex flex-col-reverse lg:flex-row justify-evenly">
                    <div className="w-full lg:w-9/12">
                        {cart.map(item => (
                            <div key={item.id} className="flex flex-col md:flex-row lg:flex-row justify-between gap-4 border-b border-slate-500">
                                <div className="md:w-5/12 lg:w-3/12 m-4 mx-auto">
                                    <Image quality={100} src={item.portait} alt={"Portada curso "+item.title} width={300} height={300}></Image>
                                </div>
                                <div className="md:w-8/12 lg:w-8/12 m-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center">
                                    <div>
                                        <Link href={"/course/details/"+item.id} className="whitespace-nowrap hover:underline">{item.title.slice(0, 30)}...</Link>
                                    </div>
                                    <div>
                                        <p className="whitespace-nowrap  border border-slate-900 px-4 py-2 mt-4 lg:mt-0">$ {item.price}</p>
                                    </div>
                                </div>
                                <div className="md:w-2/12 lg:w-4/12 m-4 flex items-center justify-center">
                                    <button onClick={() => removeFromCart(item.id)} title="Eliminar del carrito" className="bg-red-500 p-2 text-white flex text-center text-xl rounded-md hover:bg-red-600 hover:text-slate-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M4 7h16" /> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /> <path d="M10 12l4 4m0 -4l-4 4" /> </svg> 
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center items-center bg-white text-center 2-full lg:w-3/12 p-4">
                        <p className="border px-4 py-2 border-slate-900 w-full">Total: $ {total}</p>
                        <button onClick={handleBuy} className="mt-2 bg-green-500 px-5 py-3 text-white flex justify-center w-full rounded-sm hover:bg-green-600 hover:text-slate-300">Pagar</button>
                        <button onClick={() => clearCart()} className="mt-2 bg-red-500 px-5 py-3 text-white flex w-full justify-center rounded-sm hover:bg-red-600 hover:text-slate-300">Eliminar carrito</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page