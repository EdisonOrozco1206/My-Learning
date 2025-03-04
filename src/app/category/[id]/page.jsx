import React from 'react'
import { prisma } from '@/libs/prisma'
import CourseCard from '@/components/CourseCard'

const Category = async ({params}) => {

  const category = await prisma.category.findUnique({
    where: {
      id: Number(params.id)
    }
  });

  const coursesReq = await fetch(process.env.BASE_URL+"/api/courses/getperCategory/"+params.id)
  const coursesData = await coursesReq.json()
  const courses = coursesData.courses

  return (
    <div className="bg-slate-300 mt-10 w-4/5 mx-auto p-5">
      <h2 className="text-3xl pb-4 text-slate-800 font-bold border-b text-center border-slate-800">
        NUESTROS CURSOS DE <span className='uppercase'>{category.name}</span>
      </h2>

      <CourseCard courses={courses}></CourseCard>
    </div>
  )
}

export default Category