'use client'

import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";

const SearchPage = ({params}) => {
    const [courses, setCourses] = useState([])
    const search = encodeURIComponent(params.search)

    useEffect(() => {
        async function fetchData() {
            const coursesReq = await fetch(`/api/courses/perName?search=${search}`)
            setCourses(await coursesReq.json())
        }
        fetchData()
    }, [search])

    console.log(courses);

    return (
        <div className="bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10">
            <h1 className="text-center text-2xl border-b border-slate-900 pb-2">Resultados de búsqueda...</h1>

            {courses && courses.length > 0 ? (
                <CourseCard courses={courses}></CourseCard>
            ) : (<p>No se ha encontrado nada.</p>)}
        </div>
    )
}

export default SearchPage