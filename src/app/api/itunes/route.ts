
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term') || '';
    
    if (!term) {
        return NextResponse.json({ error: 'Query string is required' }, {status: 400});
    }

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=10`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return NextResponse.json(
              { error: 'Failed to fetch data from iTunes Search API' },
              { status: response.status }
            );
        }

        const data = await response.json();

        console.log(data);
        

        return NextResponse.json({ result: data }, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' }, {status: 500});
    }
}
