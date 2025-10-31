import db from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                msg : "Email and Password are required"
            }, {status : 400})
        }

        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            return NextResponse.json({
                msg: "User Already Exists."
            }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            msg: "User created successfully"
        }, {
            status: 201
        })
    } catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}