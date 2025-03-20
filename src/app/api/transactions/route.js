import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            id: "desc"
        },
        include: {
            user: true,
            course: true
        }
    })
    
    return NextResponse.json({
        transactions: transactions
    })
}

export async function POST(req){
    const { user_id, course_id, amount, status } = await req.json()

    const existingTransaction = await prisma.transaction.findFirst({
        where: {
            user_id,
            course_id
        }
    });

    if (existingTransaction) {
        return NextResponse.json(
            { error: "Ya existe una transacción para este curso y usuario." },
            { status: 400 }
        );
    }


    const date = new Date();
    const currentDate = date.toISOString();

    const transaction = await prisma.transaction.create({
        data: {
            user_id: user_id,
            course_id: course_id,
            amount: amount,
            status: status,
            date: currentDate
        }
    }); 

    return NextResponse.json(transaction)
}