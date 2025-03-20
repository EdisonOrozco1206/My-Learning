import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

    const lections = await prisma.lection.findMany({
        where: {
            course_id: Number(params.id),
        },
    });

    const lection_user = await prisma.lection_User.findMany({
        where: {
            lection_id: {
                in: lections.map(lection => lection.id),
            },
            user_id: Number(params.user_id)
        }
    });

    return NextResponse.json({
        lection_user: lection_user,
    });
}
