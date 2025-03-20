import NewLectionForm from "@/components/lections/NewLectionForm"
import { getSession } from "@/libs/libs";

const NewLEctionPage = async ({params}) => {
    const sessionData = await getSession();
    const user = sessionData.userData ? sessionData.userData : ''
    
    const courseReq = await fetch(process.env.BASE_URL+"/api/courses/"+params.courseId)
    const course = await courseReq.json()

    return (
        <div >
            <NewLectionForm course={course.courses} user={user}></NewLectionForm>
        </div>
    )
}

export default NewLEctionPage