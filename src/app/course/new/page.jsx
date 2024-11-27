import { prisma } from "@/libs/prisma"
import CreateCourseForm from "@/components/course/createCourse";
import { getSession } from "@/libs/libs";
import { redirect } from "next/navigation";

const getCategories = async () => {
    return await prisma.category.findMany();
}

const CreateCoursePage = async () => {
    const categories = await getCategories();
    const session = await getSession()

    if(!session || session.userData.role != 'teacher'){redirect("/user/login")}

    const userData = await session.userData
    
    return <CreateCourseForm categories={categories} userData={userData} />;
}

export default CreateCoursePage;
