import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const transaction = await prisma.transaction.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json({
        transaction: transaction
    })
}

export async function PUT(request, {params}){
    const data = await request.json()

    const transaction = await prisma.transaction.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(transaction)
}

export async function DELETE(request, {params}){
    try {
        const transaction = await prisma.transaction.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json(transaction)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}