import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(request, {params}){
    const lections = await prisma.lection.findFirst({
        where: {
            course_id: Number(params.courseId),
            position: Number(params.position)
        }
    })
    
    return NextResponse.json({
        lections: lections,
    })
}