import CourseCard from '@/components/CourseCard'
import { getSession } from '@/libs/libs';

const page = async () => {
    const userData = await getSession()
    const res = await fetch(process.env.BASE_URL+"/api/courses/boughtCourses/"+userData.userData.id);
    const courses = await res.json()
    

    return (
        <div className='bg-slate-300 p-4 w-full lg:w-4/5 mx-auto mt-10'>
            <h1 className='text-center text-2xl border-b border-slate-800 pb-2'>Tú aprendizaje</h1>

            <CourseCard courses={courses}></CourseCard>
        </div>
    )
}

export default page