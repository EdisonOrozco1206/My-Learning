import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const users = await prisma.user.findMany()

    return NextResponse.json({
        users: users
    })
}

export async function POST(request){
    try {
        const {name, lastname, email, document_type, document, phone, password} = await request.json()

        const bcrypt = require("bcrypt")
        const secure_password = bcrypt.hashSync(password, 10)

        const user = await prisma.user.create({
            data: {
                name: name,
                lastname: lastname,
                document_type: document_type,
                document: document,
                phone: phone,
                email: email,                                                                                                                                                                     
                password: secure_password
            }
        })

        return NextResponse.json(user)
    } catch (error) {zzzvc
        return NextResponse.json(error.message)
    }
}