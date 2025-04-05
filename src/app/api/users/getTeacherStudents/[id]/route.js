import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const id = Number(params.id);

        const instructor = await prisma.user.findUnique({
            where: { id }
        });

        if (!instructor) {
            return NextResponse.json({ error: "Instructor no encontrado" });
        }

        const courses = await prisma.course.findMany({
            where: { instructor_id: id },
            select: { id: true }
        });

        const courseIds = courses.map(course => course.id);

        if (courseIds.length === 0) {
            return NextResponse.json({ instructor, users: [] });
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                course_id: { in: courseIds }
            },
            select: { user_id: true }
        });

        const userIds = [...new Set(transactions.map(t => t.user_id))];

        const users = await prisma.user.findMany({
            where: {
                id: { in: userIds }
            }
        });

        return NextResponse.json({ instructor, users });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
