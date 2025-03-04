import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    const lection_user = await prisma.lection_User.findMany()
    return NextResponse.json({
        lection_user: lection_user
    })
}

export async function POST(req){
    const {user_id, lection_id} = await req.json()

    const lection_user = await prisma.lection_User.create({
        data: {
            user_id: user_id,
            lection_id: lection_id,
        }
    })

    return NextResponse.json(lection_user)
}