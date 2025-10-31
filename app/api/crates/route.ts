import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import genAI from "@/lib/gemini";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({
            error: "Unauthorized"
        }, {
            status: 401
        })
    }

    const userId = session.user.id;
    const { title, description, image, url } = await req.json();


    try {

        const model = genAI.getGenerativeModel({ model : "gemini-2.5-flash" })

        const prompt = `
        Based on the following scraped data from a webpage, please provide:
          1. A concise summary (max 3 sentences) of the content.
          2. A list of 3-5 relevant technical keywords (tags).

          Scraped Title: "${title}"
          Scraped Description: "${description}"
          URL: ${url}

          Format your response *exactly* as follows (NO other text):
          SUMMARY:[Your summary here]
          TAGS:[tag1,tag2,tag3]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiText = response.text();

        let summary = "Could not generate summary."
        let tags : string[] = [];
        try {
            summary = aiText.split('SUMMARY:')[1].split('TAGS:')[0].trim();
            const tagsString = aiText.split('TAGS:')[1].trim();
            tags = tagsString.split(',').map(tag => tag.trim());
        } catch (e) {
            console.error("Failed to parse ai response", e)
            return NextResponse.json({
                msg : "error occures"
            }, {status : 500})
        }

        await db.crate.create({
            data: {
                url: url,
                userId: userId,
                title: title,
                description : description,
                image : image || "https://images.unsplash.com/photo-1556139930-c23fa4a4f934?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600",
                tags: tags,
                summary: summary
            }
        })

        return NextResponse.json({
            msg: "ok"
        }, {
            status: 200
        })
    } catch (e) {
        console.error("Error creating crate", e);
        return NextResponse.json({ error: e }, { status: 500 })
    }
}

export async function GET(_req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({
            error: "Unauthorized"
        }, {
            status: 401
        })
    }

    const userId = session.user.id;

    try {

        const crates = await db.crate.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(crates, { status: 200 })

    } catch (e) {
        console.error("Error fetching crates", e);
        return NextResponse.json({ error: e }, { status: 500 })
    }
}