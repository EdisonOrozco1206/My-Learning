import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){
    try {
        const { newPassword } = req.json()
        const id = Number(params.id)
        const bcrypt = require("bcrypt")
        const secure_password = bcrypt.hashSync(newPassword, 10)

        const user = await prisma.user.update({
            where: {
                id:  id
            },
            data: {
                password: secure_password
            }
        })

        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json({error: error.message})
    }
}