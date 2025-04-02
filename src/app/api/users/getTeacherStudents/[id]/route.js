import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const id = Number(params.id);

        console.log(id);

        const users = await prisma.user.findMany({
            where: {
                courses: {
                    some: {
                        instructor_id: id
                    }
                },
                NOT: {
                    id: id
                }
            }
        });

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
