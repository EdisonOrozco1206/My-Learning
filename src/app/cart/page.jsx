'use client'

import { useCartStore } from "@/libs/cartLibs"
import { api } from "@/libs/apiMercadopago"
import { useRouter } from "next/navigation"
import { getSession } from "@/libs/libs"

const page = () => {
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
        <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
            <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">
                Tu carrito de compras
            </h2>

            {cart.length == 0 ? (
                <div>
                    <p>Parece que aún no hay nada en tú carrito de compras</p>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <button onClick={() => clearCart()} className="mt-2 bg-red-500 px-2 py-1 text-white flex text-center rounded-sm hover:bg-red-600 hover:text-slate-300">Eliminar carrito</button>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <p>Total: $ {total}</p>
                            <button onClick={handleBuy} className="mt-2 bg-green-500 px-2 py-1 text-white flex text-center rounded-sm hover:bg-green-600 hover:text-slate-300">Pagar</button>
                        </div>
                    </div>
                    {cart.map(item => (
                        <div key={item.id} className="grid grid-cols-5 gap-4 border-b border-slate-500">
                            <div className="col-span-2 m-4">
                                <img src={"/uploads/"+item.portait} alt="" />
                            </div>
                            <div className="col-span-2 m-4 flex justify-between items-center">
                                <div>
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <p>$ {item.price}</p>
                                </div>
                            </div>
                            <div className="col-span-1 m-4 flex items-center justify-center">
                                <button onClick={() => removeFromCart(item.id)} title="Eliminar del carrito" className="bg-red-500 p-2 text-white flex text-center text-xl rounded-md hover:bg-red-600 hover:text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M4 7h16" /> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /> <path d="M10 12l4 4m0 -4l-4 4" /> </svg> 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default page