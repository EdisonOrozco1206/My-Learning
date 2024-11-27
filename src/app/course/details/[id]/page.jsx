import { prisma } from "@/libs/prisma"

const CoursDetails = async ({params}) => {
    const course = await prisma.course.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            instructor: true
        }
    });

    return (
        <div className="bg-slate-300 p-4 w-5/6 mx-auto mt-10">
            <div className="max-h-96 overflow-hidden hover:opacity-65">
                <img src={"/uploads/"+course.portait} alt={"Portada curso "+course.title} className="w-full" />
            </div>
            <div className="p-4">
                <h1 className="text-2xl">{course.title}</h1>
                <h2>{course.instructor.name} {course.instructor.lastname}</h2>
                <p>{course.description}</p>
                <div className="flex gap-4 mt-4 items-center">
                    <p className="bg-slate-800 text-white py-2 px-4">$ {course.price}</p>
                    <p className="border border-slate-800 hover:bg-slate-400 hover:text-slate-90t0 py-2 px-4 cursor-pointer">Agregar al carrito</p>
                </div>
                
            </div>
        </div>
    )
}

export default CoursDetails