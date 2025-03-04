import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const courses = await prisma.course.findMany({
        where: {
            category: Number(params.id)
        },
        orderBy: [{
            id: 'desc'
        }],
        include: {
            instructor: true,
        }
    });

      return NextResponse.json({courses});
}