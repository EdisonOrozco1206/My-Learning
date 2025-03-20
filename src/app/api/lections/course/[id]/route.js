import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){
    const courseId = params.id

    const lections = await prisma.lection.findMany({
        where: {
            course_id: Number(params.id)
        },
        orderBy: {
            position: "asc"
        }
    })

    return NextResponse.json({
        lections: lections
    })
}