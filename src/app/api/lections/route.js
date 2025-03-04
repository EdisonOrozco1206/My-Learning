import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"


export const config = {
    api: {
      bodyParser: false, 
    },
  };

export async function GET(){
    const lections = await prisma.lection.findMany()
    return NextResponse.json({
        lections: lections
    })
}

export async function POST(req){
    const {title, position, course_id, content} = await req.json()

    const lection = await prisma.lection.create({
        data: {
            title: title,
            position: position,
            course_id: course_id,
            content: content
        }
    })

    return NextResponse.json(lection)
}