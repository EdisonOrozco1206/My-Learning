import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const courses = await prisma.course.findMany({
        where: {
            instructor_id: Number(params.id) 
        },
        orderBy: [{
            id: 'desc'
        }]
    })

    return NextResponse.json(courses)
}