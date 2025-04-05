import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(params.id)
            }
        })
    
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()

        const user = await prisma.user.update({
            where: {
                id: Number(params.id)
            },
            data: data
        }) 

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE(request, { params }) {
    try {
        const userId = Number(params.id);

        await prisma.$transaction([
            prisma.comment.deleteMany({ where: { user_id: userId } }),
            prisma.lection_User.deleteMany({ where: { user_id: userId } }),
            prisma.certificates.deleteMany({ where: { user_id: userId } }),
            prisma.transaction.deleteMany({ where: { user_id: userId } }),

            prisma.comment.deleteMany({
                where: { lection: { course: { instructor_id: userId } } },
            }),
            prisma.lection_User.deleteMany({
                where: { lection: { course: { instructor_id: userId } } },
            }),
            prisma.certificates.deleteMany({
                where: { course: { instructor_id: userId } },
            }),
            prisma.transaction.deleteMany({
                where: { course: { instructor_id: userId } },
            }),
            prisma.lection.deleteMany({
                where: { course: { instructor_id: userId } },
            }),
            prisma.course.deleteMany({ where: { instructor_id: userId } }),

            prisma.user.delete({ where: { id: userId } }),
        ]);

        return NextResponse.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
