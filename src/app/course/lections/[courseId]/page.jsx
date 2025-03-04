import { prisma } from "@/libs/prisma"
import { getSession } from "@/libs/libs";
import TeacherCourseAdminLections from "@/components/lections/TeacherCourseAdminLections";

const CourseLectionsPage = async ({params}) => {
    const userSession = await getSession()
    const user = userSession ? userSession.userData : ''    
    
    const course = await prisma.course.findUnique({
        where: {
            id: Number(params.courseId)
        },
        include: {
            instructor: true,
            lections: true
        }
    });
    const lectionsquery = await fetch(process.env.BASE_URL+"/api/lections/course/"+params.courseId);
    const courseLections = await lectionsquery.json()
    
    return (
        <TeacherCourseAdminLections courseId={params.courseId} course={course} lections={courseLections.lections} />
    )
}

export default CourseLectionsPage