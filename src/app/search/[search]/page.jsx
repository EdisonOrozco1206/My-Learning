import { prisma } from "@/libs/prisma"
import CourseCard from "@/components/CourseCard";

const SearchPage = async ({params}) => {
    const search = decodeURIComponent(params.search)
    
    const courses = await prisma.course.findMany({
        where: { 
            OR: [
                { title: { contains: search } },
                { description: { contains: search } }
            ]
    
        },
        include: {
            instructor: true
        }
    });

    return (
        <div className="bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10">
            <h1 className="text-center text-2xl">Resultados de búsqueda...</h1>

            {courses && courses.length > 0 ? (
                <CourseCard courses={courses}></CourseCard>
            ) : (<p>No se ha encontrado nada.</p>)}
        </div>
    )
}

export default SearchPage