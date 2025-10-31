import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req : NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({
            error : "Url is required"  
        }, {
            status : 400
        })
    }

    try {
        const response = await axios.get<string>(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const title = $('title').first().text() || $('meta[property="og:title"]').attr('content');

        const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');

        const image = $('meta[property="og:image"]').attr('content');

        return NextResponse.json({
            title : title || '',
            description : description || '',
            image : image || "https://images.unsplash.com/photo-1556139930-c23fa4a4f934?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600",
        }, {
            status : 200
        });
    } catch (e) {
        console.error(`Error Scraping ${url}`, e);
        return NextResponse.json({
            title : '',
            description : '',
            image : ''
        }, {
            status : 200
        });
    }
}