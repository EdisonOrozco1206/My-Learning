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

    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[cellRef]) continue;

        worksheet[cellRef].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } }, // Azul
            alignment: { horizontal: "center" },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } }
            }
        };
    }

    worksheet["!cols"] = Object.keys(data[0]).map(() => ({ wch: 20 }));
    

    for (let R = headerRange.s.r + 1; R <= headerRange.e.r; ++R) {
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
            if (!worksheet[cellRef]) continue;

            worksheet[cellRef].s = {
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };
        }
    }

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