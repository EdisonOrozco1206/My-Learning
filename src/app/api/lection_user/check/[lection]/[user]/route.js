import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"


export async function GET(request, {params}){
    const lection_user = await prisma.lection_User.findFirst({
        where: {
            user_id: Number(params.user),
            lection_id: Number(params.lection)
        }
    })

    return NextResponse.json({
        lection_user: lection_user
    })
}