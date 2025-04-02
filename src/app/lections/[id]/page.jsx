import Link from "next/link";
import LectionsCommentsList from "@/components/comments/LectionCommentsList"
import { Suspense } from "react";
import { getSession } from "@/libs/libs";
import { redirect } from "next/navigation";

const page = async ({params}) => {
    const userData = await getSession()

    if(!userData){redirect("/")}

    const checkViewedclass = await fetch(`${process.env.BASE_URL}/api/lection_user/check/${userData.userData.id}/${params.id}`);
    setTimeout(async () => {
        const viewedclass = await checkViewedclass.json();

        if(!viewedclass.lection_user){
            const user_id = Number(userData.userData.id)
            const lection_id = Number(params.id)

            await fetch(process.env.BASE_URL+"/api/lection_user", {
                method: "POST",
                body: JSON.stringify({user_id, lection_id}),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
    }, 10000);

    const lectionquery = await fetch(process.env.BASE_URL+"/api/lections/"+params.id);
    const content = await lectionquery.json();
    const lection = content.lection;

    const courseQuery = await fetch(process.env.BASE_URL+"/api/courses/"+lection.course_id)
    const course = await courseQuery.json();

    const commentquery = await fetch(process.env.BASE_URL+"/api/comments/lection/"+params.id, {
        cache: "no-store",
    });
    const comments = await commentquery.json();

    const extension = lection.content.slice(-4);

    const allLectionsQuery = await fetch(`${process.env.BASE_URL}/api/lections/course/${lection.course_id}`);
    const allLectionsContent = await allLectionsQuery.json();
    const allLections = allLectionsContent.lections;
    allLections.sort((a, b) => a.position - b.position)
    const currentIndex = allLections.findIndex((l) => l.id === lection.id);
    const previousLection = currentIndex > 0 ? allLections[currentIndex - 1] : null;
    const nextLection = currentIndex < allLections.length - 1 ? allLections[currentIndex + 1] : null;


    return (
        <div className="bg-slate-300 pt-3 w-full mx-auto mt-10">
            <Link href={"/course/details/"+course.courses.id}>
                <h2 className="capitalize px-4 text-xl hover:text-slate-800 hover:underline border-b border-slate-500 pb-4 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1"></path> </svg>  
                    {course.courses.title} - #{lection.position} {lection.title}
                </h2>
            </Link>

            <div>
                <Suspense fallback={
                    <p>Cargando contenido</p>
                }>
                    {extension == ".mp4" && (
                        <video src={lection.content} controls autoPlay className="w-full lg:w-4/5 mx-auto mt-4 lg:mt-0 lg:my-4"></video>
                    )}

                    {extension == ".zip" && (
                        <div className="bg-slate-200">
                            <div className="w-1/2 mx-auto flex-row items-center py-8">
                                <h3 className="capitelize text-center my-2">Tu tutor te ha dejado este material de apoyo para que lo descargues ;)</h3>
                                <p className="text-center my-2">Descárgalo haciendo clic en el enlace</p>
                                <a href={"/uploads/"+lection.content} download={lection.content} className="block text-center text-sky-950 my-2 underline hover:text-sky-700">{lection.content}</a>
                            </div>
                        </div>
                    )}
                </Suspense>

                <div className="w-full flex justify-between lg:px-4 py-3">
                    {previousLection && (
                        <Link href={`/lections/${previousLection.id}`} className="flex items-center border p-4 w-1/2 lg:w-1/6 justify-center text-white bg-slate-800 hover:bg-slate-900">Anterior <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M9 14l-4 -4l4 -4"></path> <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path> </svg> </Link>
                    )}
                    
                    {nextLection && (
                        <Link href={`/lections/${nextLection.id}`} className="flex items-center border p-4 w-1/2 lg:w-1/6 justify-center text-white bg-slate-800 hover:bg-slate-900">Siguiente <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M15 14l4 -4l-4 -4"></path> <path d="M19 10h-11a4 4 0 1 0 0 8h1"></path> </svg> </Link>
                    )}
                </div>
            </div>

            <div className="bg-slate-50 mt-4 p-4 w-full">
                <h3 className="capitalize lg:px-4">Lista de comentarios</h3>
                {userData.userData && (
                    <div className="w-full lg:w-5/6 mx-auto mt-4">
                        <Link href={"/comments/new/"+params.id} className="cursor-pointer px-4 py-2 border border-green-500 rounded-sm bg-green-500 text-white hover:bg-green-600">Añadir comentario</Link>
                    </div>
                )}

                <Suspense fallback={
                    <div>Cargando comentarios...</div>
                }>
                    <LectionsCommentsList comments={comments.comments} userData={userData.userData}/>
                </Suspense>
            </div>
        </div>
    )
}

export default page