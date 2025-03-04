import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    const certificates = await prisma.certificates.findMany({
        orderBy: {
            id: "desc"
        },
        include: {
            user: true,
            course: true
        }
    })
    
    return NextResponse.json({
        certificates: certificates
    })
}

export async function POST(req){
    const { user_id, course_id } = await req.json()

    const date = new Date();
    const currentDate = date.toISOString();

    const certificate = await prisma.certificates.create({
        data: {
            user_id: user_id,
            course_id: course_id,
            validated_at: currentDate
        }
    })

    return NextResponse.json(certificate)
}