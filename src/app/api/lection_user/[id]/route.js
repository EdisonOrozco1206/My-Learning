import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const lection_user = await prisma.lection_User.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json({
        lection_user: lection_user
    })
}

export async function PUT(request, {params}){
    const data = await request.json()

    const lection_user = await prisma.lection_User.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(lection_user)
}

export async function DELETE(request, {params}){
    try {
        const lection_user = await prisma.lection_User.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json(lection_user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}