'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/libs/cartLibs";
import { getSession } from "@/libs/libs";
import { useEffect, useState } from "react";

const CourseCard = ({ courses, userData, showId }) => {
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);
    const [user, setUser] = useState(null);
    const [boughtCourses, setBoughtCourses] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            let user = await getSession();
            if (user) setUser(user.userData);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchBoughtCourses = async () => {
            if (!user) return;

            try {
                const res = await fetch(`/api/courses/boughtCourses/${user.id}`);
                if (!res.ok) throw new Error("Error fetching bought courses");
                const data = await res.json();
                setBoughtCourses(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBoughtCourses();
    }, [user]);

    const handleCartAndRedirect = (course) => {
        addToCart(course);
        router.push("/cart");
    };

    const deleteCourse = async (id) => {
        try {
            const res = await fetch(`/api/courses/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Error deleting course");
            }
            router.refresh();
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    return (
        <div className="w-full mt-8 gap-4 grid grid-cols-3">
            {courses && courses.length > 0 ? courses.map(course => { 
                const isBought = boughtCourses.some((bought) => bought.id === course.id);

                return (
                    <div className="col-span-1 bg-white flex flex-col justify-between" key={course.id}>
                        <Link href={`/course/details/${course.id}`} className="max-h-40 flex justify-center">
                            <Image 
                                className="object-cover"
                                src={course.portait ? `/uploads/${course.portait}` : "https://www.mundodeportivo.com/urbantecno/hero/2022/01/404-1.jpg?width=1200&aspect_ratio=16:9"}
                                alt={`Portada del curso ${course.title}`}
                                layout="instrinsic"
                                width={300}
                                height={400}
                            />
                        </Link>
                        <div className="mt-2">
                            <div className="w-full px-4">
                                <Link href={`/course/details/${course.id}`} className="hover:underline">
                                    {showId ? <p>ID: {course.id}</p> : ''}
                                    <h3 className="text-xl font-bold capitalize">{course.title}</h3>
                                    <p className="w-full pb-2">{course.description}</p>
                                </Link>
                                <p className="pt-2 border-t border-slate-900">{course.instructor.name} {course.instructor.lastname}</p>
                            </div>
                            {!isBought ? (
                                <button onClick={() => handleCartAndRedirect(course)} className="bg-slate-800 text-slate-300 w-full text-lg text-center mt-2 p-2 hover:bg-slate-900 flex justify-between">
                                    <span></span>
                                    <span>$ {course.price}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="30" height="30" strokeWidth="2"> 
                                        <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> 
                                        <path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z"></path> 
                                        <path d="M17 10l-2 -6"></path> 
                                        <path d="M7 10l2 -6"></path> 
                                    </svg>
                                </button>
                            ) : (
                                <Link href={`/course/details/${course.id}`} className="bg-slate-800 text-slate-300 w-full text-lg text-center mt-2 p-2 hover:bg-slate-900 flex justify-center">
                                    {course.instructor.id == user.id ? 'Ver curso' : 'Continuar curso'}
                                </Link>
                            )}
                            {userData && userData.userData.role === "admin" && (
                                <button className="bg-red-800 text-slate-300 w-full text-lg text-center p-2 hover:bg-red-900 flex justify-center" onClick={() => deleteCourse(course.id)}>
                                    Eliminar
                                </button>
                            )} 
                        </div>
                    </div>
                );
            }) : (
                <p className="col-span-3 text-center text-xl">Upss!!, parece que no hay elementos disponibles para mostrar :c</p>
            )}
        </div>
    );
};

export default CourseCard;
