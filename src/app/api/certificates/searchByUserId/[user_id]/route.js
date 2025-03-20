import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const certificates = await prisma.certificates.findMany({
        where: {
            user_id: Number(params.user_id)
        }
    })

    return NextResponse.json(certificates)
}