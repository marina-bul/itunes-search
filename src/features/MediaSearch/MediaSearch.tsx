'use client'

import { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import Image from "next/image";
import Link from "next/link";


export const MediaSearch = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchMedia(queryString: string) {
    setError(null);
    setLoading(true);

    try {
        const response = await fetch(`/api/itunes?term=${encodeURIComponent(queryString)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log(data);
        

        if (response.ok) {
          setMediaItems(data.result.results);
        } else {
          setError('Oops! An error occured. Try to reload page')
          console.error('Error:', data.error);
        }
    } catch (error) {
        setError('Oops! An error occured. Try to reload page')
        console.error('Error making request:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SearchForm onFormSubmit={fetchMedia} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && mediaItems.length > 0 && (
        <ul className="flex justify-between gap-8 flex-wrap list-none">
          {mediaItems.map(item => (
            <li key={item.collectionId || item.trackId} className="w-[300px] border border-[#dce4e7] rounded-[10px]">
              <Link href={item.collectionViewUrl || item.trackViewUrl} target="blank" className="flex gap-4">
                <Image 
                  src={item.artworkUrl100} 
                  alt={item.collectionName || item.trackName} 
                  width={100} 
                  height={100} 
                  style={{ objectFit: "contain" }} 
                />
                <div className="w-full p-2">
                  <p className="mb-4 p-1 text-sm text-right border rounded-[8px] bg-[#fcefe9]">{item.wrapperType}</p>
                  <p className="mb-2 font-medium">{item.artistName}</p>
                  <p className="mb-4 text-sm">{item.collectionName || item.trackName}</p>
                  
                </div>
              </Link>

              
            </li>
          ))}
        </ul> 
      )
      }
    </>
  );
}