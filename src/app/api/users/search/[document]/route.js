import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    try {
        const user = await prisma.user.findUnique({
            where: {
                document: Number(params.document)
            }
        })
    
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}
