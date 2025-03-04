import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const certificate = await prisma.certificates.findMany({
        where: {
            user_id: Number(params.user_id),
            course_id: Number(params.course_id)
        },
        include: {
            user: true,
            course: true
        }
    })

    return NextResponse.json(certificate)
}