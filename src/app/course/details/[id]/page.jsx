import { getSession } from "@/libs/libs";
import CourseView from "@/components/course/CourseView";

const CoursDetails = async ({params}) => {
    const userSession = await getSession();
    const user = userSession ? userSession?.userData : '';
    var isBought = false;
    var viewedClasses = ''
    
    const res = await fetch(process.env.BASE_URL+"/api/courses/"+params.id);
    const courses = await res.json();
    const course = courses.courses;

    if(user){
        const isBoughtResponse = await fetch(`${process.env.BASE_URL}/api/courses/checkboughtcourse/${user.id}/${params.id}`);
        const isBoughtCourse = await isBoughtResponse.json()
        isBought = isBoughtCourse.course.length > 0;

        const viewedClassesQuery = await fetch(process.env.BASE_URL+`/api/lection_user/course/${params.id}/${user.id}`);  
        viewedClasses = await viewedClassesQuery.json();
    }

    const lectionsquery = await fetch(process.env.BASE_URL+"/api/lections/course/"+params.id)
    const courseLections = await lectionsquery.json();

    return (
        <CourseView course={course} courseLections={courseLections} user={user} viewedClasses={viewedClasses} isBought={isBought} />
    )
}

export default CoursDetails;
