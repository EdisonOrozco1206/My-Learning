import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const transaction = await prisma.transaction.findMany({
        where: {
            id: Number(params.id)
        },
        orderBy: {
            id: "desc"
        },
        include: {
            user: true,
            course: true
        },
    })

    return NextResponse.json({
        transaction: transaction
    })
}