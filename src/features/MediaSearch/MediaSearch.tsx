'use client'

import { useSearch } from '@/shared/hooks/useSearch';
import { SearchForm } from '@/widgets/SearchForm/SearchForm';

import { MediaItem } from './elems/MediaCard/MediaCard';

import type { IMediaItem } from '@/shared/types/media';


export const MediaSearch = () => {
  const {
    data: mediaItems, 
    isLoading, 
    isSuccess, 
    error, 
    handleSearchData
  } = useSearch<IMediaItem>()

  return (
    <>
      <SearchForm onSearch={handleSearchData}/>

      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <ul className="flex justify-around gap-8 flex-wrap list-none">
          { mediaItems.length ? (
            mediaItems.map(item => <MediaItem key={item.id} mediaItem={item} />)
          ) : (
            <li>No results for your request. Please, try a new search</li>
          )
          }
        </ul> 
      )}

      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}