import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){
    const comments = await prisma.comment.findMany({
        where: {
            lection_id: Number(params.id)
        },
        orderBy: {
            id: "desc"
        },
        include: {
            user: true
        }
    })

    return NextResponse.json({
        comments: comments
    })
}