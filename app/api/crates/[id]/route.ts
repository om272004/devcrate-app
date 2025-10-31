import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import db from "@/lib/prisma";

export async function DELETE(req : NextRequest,
    { params } : { params : Promise<{id : string }>}
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({
            msg : "Unauthorized user"
        }, {
            status : 401
        })
    }

    const uId = session.user.id;
    const {id} = await params;

    try {
        const crate = await db.crate.findUnique({
            where : {
                id : id,
            },
        })

        if (!crate) {
            return NextResponse.json({
                msg : "Crate not found"
            }, {
                status : 404
            })
            
        } else if (crate.userId !== uId) {
            return NextResponse.json({
                msg : "You are not the owner of the crate"
            }, {
                status : 403
            })
            
        }

        await db.crate.delete({
            where : {
                id : id
            }
        })
        console.log(3);

        return NextResponse.json({
            msg : "Crate deleted"
        }, {
            status : 200
        })

    } catch (e) {
        console.error("Error occured", e);
        return NextResponse.json({
            msg : "Error Occured"
        }, {
            status : 500
        })
    }
}