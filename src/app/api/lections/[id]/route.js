import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const lection = await prisma.lection.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json({
        lection: lection
    })
}

export async function PUT(request, {params}){
    const data = await request.json()

    const lection = await prisma.lection.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(lection)
}

export async function DELETE(request, {params}){
    try {
        const lection = await prisma.lection.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json(lection)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}