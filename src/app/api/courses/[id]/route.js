import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const courses = await prisma.course.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            instructor: true,
            lections: true
        }
    })

    return NextResponse.json({
        courses: courses
    })
}

export async function PUT(request, {params}){
    const data = await request.json()

    const course = await prisma.course.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(course)
}

export async function DELETE(request, {params}){
    try {
        const courseId = Number(params.id);

        const lections = await prisma.lection.findMany({
            where: { course_id: courseId },
            select: { id: true }
        });

        const lectionIds = lections.map(lection => lection.id);

        if (lectionIds.length > 0) {
            await prisma.lection_User.deleteMany({
                where: { lection_id: { in: lectionIds } }
            });

            await prisma.comment.deleteMany({
                where: { lection_id: { in: lectionIds } }
            });

            await prisma.lection.deleteMany({
                where: { id: { in: lectionIds } }
            });
        }

        const course = await prisma.course.delete({
            where: {
                id: courseId
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}