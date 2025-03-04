import { redirect } from "next/navigation";
import { getSession } from "@/libs/libs"
import EditCommentForm from "@/components/comments/EditCommentForm"

const page = async ({params}) => {
    const userData = await getSession();

    if(!params.id){ redirect("/") }
    if(!userData || userData == null){redirect("/user/login")}

    const commentquery = await fetch(process.env.BASE_URL+"/api/comments/"+params.id)
    const comment = await commentquery.json();

    if(!comment || comment.comment.user_id != userData.userData.id){ redirect("/"); }

    return (
        <EditCommentForm comment={comment.comment} />
    )
}

export default page