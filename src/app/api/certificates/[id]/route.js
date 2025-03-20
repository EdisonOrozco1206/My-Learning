import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request, {params}){

    const certificate = await prisma.certificates.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            user: true,
            course: true
        }
    })

    return NextResponse.json({
        certificate: certificate
    })
}

export async function PUT(request, {params}){
    const data = await request.json()

    const certificate = await prisma.certificates.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(certificate)
}

export async function DELETE(request, {params}){
    try {
        const certificate = await prisma.certificates.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json(certificate)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}