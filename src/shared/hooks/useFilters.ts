import { useCallback, useState } from 'react';


interface FiltersResult {
  activeFilter: string
  filters: string[]
  handleChangeActiveFilter: (value: string) => void
}

export const useFilters = ():FiltersResult => {
  const filters = ['all', 'music', 'audiobook', 'movie', 'podcast']
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const handleChangeActiveFilter = useCallback((newValue: string) => {
    setActiveFilter(newValue)
  }, [])


  return { activeFilter, filters, handleChangeActiveFilter }
}


