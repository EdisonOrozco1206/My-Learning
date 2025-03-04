import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const transactions = await prisma.transaction.findMany({
        orderBy: { id: "desc" },
        include: { user: true, course: true },
        take: 10
    })
    return NextResponse.json({
        transactions: transactions
    })
}