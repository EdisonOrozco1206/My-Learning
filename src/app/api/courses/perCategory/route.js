import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const dbcategories = await prisma.category.findMany();
    console.log(dbcategories);
    
    let categories = [];

    categories = await Promise.all(
        dbcategories.map(async (c) => {
            const categoryCoursesReq = await fetch(`${process.env.BASE_URL}/api/courses/getperCategory/${c.id}`);
            const categoryCourses = await categoryCoursesReq.json();

            return { name: c.name, courses: categoryCourses };
        })
    );

    return NextResponse.json({ categories });
}
