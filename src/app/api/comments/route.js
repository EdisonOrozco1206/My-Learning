import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"


export const config = {
    api: {
      bodyParser: false, 
    },
  };

export async function GET(){
    const comments = await prisma.comment.findMany()
    return NextResponse.json({
        comments: comments
    })
}

export async function POST(req){
    const {content, user_id, lection_id} = await req.json()

    const comment = await prisma.comment.create({
        data: {
            content: content,
            user_id: user_id,
            lection_id: lection_id,
        }
    })

    return NextResponse.json(comment)
}