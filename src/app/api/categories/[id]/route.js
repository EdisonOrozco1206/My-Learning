import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET (request, {params}){
    const category = await prisma.category.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json(category)
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()

        const category = await prisma.category.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
        
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE (request, {params}){
    try {
        const category = await prisma.category.delete({
            where: {
                id: Number(params.id)
            }
        })
    
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}