import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    let dataCount = {};

    dataCount.courses = await prisma.course.count();
    dataCount.teachers = await prisma.user.count({
        where: { role: "teacher" }
    });
    dataCount.users = await prisma.user.count({
        where: { role: "user" }
    });

    let transaction = await prisma.transaction.findFirst({
        orderBy: { amount: 'desc' }
    });

    if (transaction) {
        dataCount.expensive = await prisma.course.findUnique({
            where: { id: transaction.course_id }
        });
    } else {
        dataCount.expensive = null;
    }

    return NextResponse.json(dataCount);
}
