import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const certificates = await prisma.certificates.findMany({
        where: {
            user: {
                document: Number(params.user_id)
            }
        },
        include: {
            course: true
        }
    })

    return NextResponse.json(certificates)
}