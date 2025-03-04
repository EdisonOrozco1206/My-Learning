import CourseCard from "@/components/CourseCard";

const Course = async () => {
    const coursesReq = await fetch(process.env.BASE_URL+"/api/courses/perCategory");
    const coursesData = await coursesReq.json()
    const data = coursesData.categories

    return (
        <div className='bg-slate-300 p-4 w-4/5 mx-auto mt-10'>
            <h1 className="text-center text-2xl border-b border-slate-800 pb-3">Todos nuestros cursos</h1>
            <div>
                {data.map(element => (
                    <div className="bg-white my-4">
                        <h2 className="text-xl text-center py-4 border-b border-slate-300">Cursos de - {element.name}</h2>
                        <CourseCard courses={element.courses.courses}></CourseCard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Course