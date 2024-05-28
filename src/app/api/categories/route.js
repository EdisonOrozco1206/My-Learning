import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const categories = await prisma.category.findMany()

    return NextResponse.json({
        categories: categories
    })
}

export async function POST(req){
    const {name} = await req.json()

    const category = await prisma.category.create({
        data: {
            name: name
        }
    })

    return NextResponse.json(category)
}