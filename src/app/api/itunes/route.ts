
import { NextResponse } from 'next/server';

import type { IApiMediaItem } from '@/shared/types/media';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('term');
  const media = searchParams.get('media') || '';
    
  if (!term) {
    return NextResponse.json({ error: 'Query string is required' }, { status: 400 });
  }

  const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${encodeURIComponent(media)}&limit=10`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from iTunes API' },
        { status: response.status }
      );
    }

    const data = await response.json();
        
    const transformedData = data.results.map((mediaItem:IApiMediaItem) => {
      return {
        id: mediaItem.collectionId || mediaItem.trackId || mediaItem.artistId || 0,
        name: mediaItem.collectionName || mediaItem.trackName || mediaItem.artistName || '',
        url: mediaItem.collectionViewUrl || mediaItem.trackViewUrl || mediaItem.artistLinkUrl || '',
        image: mediaItem.artworkUrl100 || '',
        artistName: mediaItem.artistName,
        type: mediaItem.wrapperType
      }
    })

    return NextResponse.json({ results: transformedData }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data from iTunes API' }, { status: 500 });
  }
}
