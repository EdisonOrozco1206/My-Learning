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
    const { document, course_id } = await req.json()

    const date = new Date();
    const currentDate = date.toISOString();

    const user = await prisma.user.findUnique({
        where: {
            document: Number(document)
        }
    })

    const certificate = await prisma.certificates.create({
        data: {
            user_id: user.id,
            course_id: course_id,
            validated_at: currentDate
        }
    })

    return NextResponse.json(certificate)
}