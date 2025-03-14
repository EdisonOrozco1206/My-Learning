import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}){

    const user = await prisma.user.findUnique({
        where: {
            email: params.email
        }
    })

    return NextResponse.json({user})
}