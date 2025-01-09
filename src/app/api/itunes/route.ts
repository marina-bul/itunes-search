
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
              { error: 'Failed to fetch data from iTunes API' },
              { status: response.status }
            );
        }

        const data = await response.json();

        console.log(data);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = data.results.map((mediaItem:any) => {
            return {
                id: mediaItem.collectionId || mediaItem.trackId || mediaItem.artistId || 0,
                name: mediaItem.collectionName || mediaItem.trackName || mediaItem.artistName || '',
                url: mediaItem.collectionViewUrl || mediaItem.trackViewUrl || mediaItem.artistLinkUrl || '',
                image: mediaItem.artworkUrl100 || '',
                artistName: mediaItem.artistName,
                type: mediaItem.wrapperType
            }
        })

        return NextResponse.json({results: transformedData}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data from iTunes API' }, {status: 500});
    }
}
