import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const user_id = Number(params.user_id)
    const course_id = Number(params.course_id)

    const res = await prisma.transaction.findMany({
        where: {
            user_id: user_id,
            course_id: course_id
        }
    })

    return NextResponse.json({course: res})
}