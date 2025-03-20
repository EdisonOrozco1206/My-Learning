import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    let categories = [];
    const dbcategories = await prisma.category.findMany({});

    for (const c of dbcategories) {
        const courses = await prisma.course.findMany({
            where: {
                category: Number(c.id)
            },
            include:{
                instructor: true
            }
        });
        categories.push({
            name: c.name,
            courses: courses
        });
    }

    return NextResponse.json({ categories });
}