import CourseCard from "@/components/CourseCard";

const Page = async () => {
    const coursesReq = await fetch(process.env.BASE_URL+"/api/courses/perCategory");
    const coursesData = await coursesReq.json();

    return (
        <div className='bg-slate-300 p-4 w-4/5 mx-auto mt-10'>
            <h1 className="text-center text-2xl border-b border-slate-800 pb-3">Todos nuestros cursos</h1>
            <div>
                {coursesData.categories.length > 0 ? coursesData.categories.map(element => (
                    <div key={element.id || element.name} className="bg-white my-4">
                        <h2 className="text-xl text-center py-4 border-b border-slate-300">
                            Cursos de - {element.name}
                        </h2>
                        <CourseCard courses={element.courses} />
                    </div>
                )) : (<h2 className="text-center mt-2">Aún no hay cursos para mostrar</h2>)}
            </div>
        </div>
    );
}

export default Page;