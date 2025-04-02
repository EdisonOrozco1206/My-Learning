"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/libs/cartLibs";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { sendEmail } from "@/libs/emails";
import { getSession } from "@/libs/libs";
import Image from "next/image";

const checkAndassignCourses = async (id, router) => {
    try {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
                Authorization: `Bearer APP_USR-1019432933134765-012819-a40c3c8b7cf1faaf86a4ff8950198d6c-2239164662`
            }
        });
        const data = await res.json();

        if (data.status === "approved") {
            const courses = data.metadata.cart;
            await Promise.all(courses.map(async (c) => {
                let amount = c.price;
                let course_id = Number(c.id);
                let user_id = Number(data.metadata.associated_user);
                let status = "success";

                await fetch("/api/transactions", {
                    method: "POST",
                    body: JSON.stringify({ course_id, amount, user_id, status }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            }));
            return courses;
        } else {
            router.push("/checkout/pending");
        }
    } catch (error) {
        console.log(error.message);
    }
};

const PaymentHandler = ({ setCart, setUser, setSentEmail }) => {
    const router = useRouter();
    const { clearCart } = useCartStore();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const paymentId = searchParams.get("payment_id");
        if (!paymentId) {
            router.push("/");
            return;
        }

        const fetchData = async () => {
            const cartData = await checkAndassignCourses(paymentId, router);
            const user = await getSession();

            if (!user) {
                router.push("/");
                return;
            }

            setUser(user.userData);

            if (cartData) {
                setCart(cartData);
                clearCart();
            } else {
                router.push("/checkout/pending");
            }
            setLoading(false);
        };

        fetchData();
    }, [searchParams, router, setCart, setUser, clearCart]);

    if (loading) return <h2>Cargando detalles de la compra...</h2>;

    return null;
};

const Page = () => {
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [sentEmail, setSentEmail] = useState(null);
    const [payment_id, setPaymentId] = useState('')

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            setPaymentId(urlParams.get("payment_id") || "");
        }
    }, []);

    const email = async () => {
        const res = await sendEmail.sendBill(payment_id, user.email, user.name);
        if (res.status === 200) setSentEmail(true);
    };

    return (
        <div className='bg-slate-300 p-4 w-full lg:w-4/5 mx-auto mt-10'>
            <Suspense fallback={<h2>Cargando detalles de la compra</h2>}>
                <PaymentHandler setCart={setCart} setUser={setUser} setSentEmail={setSentEmail} />
            </Suspense>
            <div className='flex flex-col lg:flex-row w-fit items-center gap-4 mx-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 bg-white rounded-full mx-auto my-2' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={40} height={40} strokeWidth={2}>
                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                    <path d="M9 12l2 2l4 -4"></path>
                </svg>
                <h1 className='text-center text-xl'>Tu transacción ha sido aprobada</h1>
            </div>
            {cart && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Detalles de compra:</h2>
                    <ul>
                        {cart.map((course) => (
                            <li key={course.id} className="p-2 bg-white rounded-none lg:rounded-md my-2 flex flex-col lg:flex-row items-center border-b border-slate-900 lg:border-none">
                                <div className="w-full lg:w-1/2 lg:border-r border-slate-500 max-h-44 overflow-hidden object-center">
                                    <Image quality={100} src={course.portait} alt={course.title} width={200} height={200} className="object-cover w-full" />
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col items-center px-3">
                                    <p className="text-center py-2">{course.title}</p>
                                    <p className="text-center py-2">{course.description}</p>
                                    <p className="text-center py-2 bg-slate-800 text-white w-1/2">${course.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col lg:flex-row items-center justify-between mt-4 lg:mt-0">
                        <Link href="/mylearning" className="mx-2 bg-slate-800 p-4 lg:p-2 text-white hover:bg-slate-900 w-full lg:w-auto text-center my-2 lg:my-0">Regresar</Link>
                        {!sentEmail ? (
                            <button onClick={email} className="mx-2 bg-green-500 p-4 lg:p-2 text-white hover:bg-green-600 w-full lg:w-auto text-center my-2 lg:my-0">Enviar comprobante al correo</button>
                        ) : (
                            <p className="text-green-500 text-sm block">¡Enviado correctamente!</p>
                        )}
                        <p className="font-bold text-lg mt-4">Total: ${cart.reduce((total, course) => total + course.price, 0)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;