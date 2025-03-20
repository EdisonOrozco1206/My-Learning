import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}) {
    
    try {
        const id = Number(params.id)

        const courses = await prisma.course.findMany({
            where: {
                transactions: {
                    some: {
                        user_id: id,
                        status: "success"
                    }
                }
            },
            include: {
                instructor: true
            }
        })

        return NextResponse.json(courses)
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}