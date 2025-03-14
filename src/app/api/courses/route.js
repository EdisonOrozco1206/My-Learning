import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    const courses = await prisma.course.findMany({
        include: {
            instructor: true
        }
    })
    return NextResponse.json({
        courses: courses
    })
}

export async function POST(req){
    const { title, price, portait, description, category, instructor_id } = await req.json()

    const course = await prisma.course.create({
        data: {
            title: title,
            description: description,
            price: Number(price),
            category: Number(category),
            instructor_id: Number(instructor_id),
            portait: portait,
        }
    })

    return NextResponse.json(course)
}