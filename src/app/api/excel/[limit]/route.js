import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import * as XLSX from "xlsx";

export async function GET(req, { params }) {
    const limit = Number(params.limit) || 0;

    const data = await prisma.transaction.findMany({
        orderBy: { date: "desc" },
        ...(limit > 0 ? { take: limit } : {})
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte transacciones");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
        headers: {
            "Content-Disposition": "attachment; filename=Reporte-transacciones.xlsx",
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    });
}
