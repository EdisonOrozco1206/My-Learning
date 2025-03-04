import { redirect } from "next/navigation";
import { getSession } from "@/libs/libs"
import NewCommentForm from "@/components/comments/NewCommentForm"

const page = async ({params}) => {
    const userData = await getSession();

    if(!params.id){ redirect("/") }
    if(!userData || userData == null){redirect("/user/login")}

    return (
        <NewCommentForm lection={params.id} userId={userData.userData.id}/>
    )
}

export default page