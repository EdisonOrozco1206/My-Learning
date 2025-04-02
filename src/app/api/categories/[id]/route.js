import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET (request, {params}){
    const category = await prisma.category.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json(category)
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()

        const category = await prisma.category.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
        
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE(request, {params}) {
    try {
        await prisma.comment.deleteMany({
            where: {
                lection: {
                    course: {
                        category: Number(params.id)
                    }
                }
            }
        });

        await prisma.lection_User.deleteMany({
            where: {
                lection: {
                    course: {
                        category: Number(params.id)
                    }
                }
            }
        });

        await prisma.lection.deleteMany({
            where: {
                course: {
                    category: Number(params.id)
                }
            }
        });

        await prisma.course.deleteMany({
            where: {
                category: Number(params.id)
            }
        });

        const category = await prisma.category.delete({
            where: {
                id: Number(params.id)
            }
        });
    
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(error.message);
    }
}
