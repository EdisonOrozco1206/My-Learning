import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(params.id)
            }
        })
    
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()

        const user = await prisma.user.update({
            where: {
                id: Number(params.id)
            },
            data: data
        }) 

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE(request, {params}){
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(params.id)
            }
        })

        console.log(params)
    
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}