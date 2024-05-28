import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    const courses = await prisma.course.findMany()
    return NextResponse.json({
        courses: courses
    })
}

export async function POST(request){
    const {title, description, price, category, instructor_id} = await request.json()

    const course = await prisma.course.create({
        data: {
            title: title,
            description: description,
            price: price,
            category: category,
            instructor_id: instructor_id
        }
    })

    return NextResponse.json(course)
}