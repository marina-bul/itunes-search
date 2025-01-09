import { useCallback, useState } from 'react';

type SearchError = string | null

interface SearchResult<T> {
  data: T[]
  isLoading: boolean
  isSuccess: boolean
  error: SearchError
  handleSearchData: (queryString: string) => void
}

export const useSearch = <T>():SearchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<SearchError>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSearchData = useCallback(async(queryString: string) => {  
    setError(null);
    setData([]);
    setIsSuccess(false);
    setIsLoading(true);

    if (!queryString.trim()) {
      setIsLoading(false);
      setError('Query string is required');
      return;
    }

    try {
      const response = await fetch(`/api/itunes?term=${encodeURIComponent(queryString)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
        
      if (response.ok) {
        setData(data.results);
        setIsSuccess(true)
      } else {
        setError('Oops! An error occurred. Try to reload page')
        console.error('Error:', data.error);
      }

    } catch (error) {
      setError('Oops! An error occurred. Try to reload page')
      console.error('Error making request:', error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  return { data, error, isLoading, isSuccess, handleSearchData }
}


