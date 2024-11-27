import React from 'react'
import { getSession } from "@/libs/libs"
import { prisma } from '@/libs/prisma';
import EditCourseForm from '@/components/course/editCourseForm';
import { redirect } from 'next/navigation';

const getCategories = async () => {
  return await prisma.category.findMany();
}

const EditCourse = async ({params}) => {
  const { id } = params;
  const categories = await getCategories();
  const session = await getSession()
  

  const courseInfo = await prisma.course.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  
  if(!session || session.userData.role != 'teacher'){redirect("/user/login")}
  if(courseInfo.instructor_id != session.userData.id){redirect("/")}

  const userData = session ? session.userData : ''

  return <EditCourseForm categories={categories} userData={userData} courseInfo={courseInfo}></EditCourseForm>

}

export default EditCourse