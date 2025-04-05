import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const search = req.nextUrl.searchParams.get("search") || "";

    console.log(search);
    

    const courses = await prisma.course.findMany({
        where: { 
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } }
            ]
        },
        include: {
            instructor: true
        }
    });

    return NextResponse.json(courses);
}