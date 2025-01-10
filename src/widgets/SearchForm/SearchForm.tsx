'use client'

import { useCallback, useState } from 'react';

import { useFilters } from '@/shared/hooks/useFilters';

import type { FC, FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (queryStr: string, filter: string) => void
}

export const SearchForm:FC<SearchFormProps> = ({ onSearch }) => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const { filters, activeFilter, handleChangeActiveFilter } = useFilters()

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, activeFilter)
  }, [searchTerm, activeFilter, onSearch]);

  return (
    <form onSubmit={handleSubmit} className='w-full mb-[30px]'>
      <div className='w-full flex items-center gap-3'>
        <input 
          type="text" 
          placeholder="Search media..." 
          className='w-full p-3 border border-border rounded-[15px]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className='sm:w-[200px] w-[100px] p-2 rounded-lg bg-accent text-white flex items-center justify-center 
          shadow-lg hover:shadow-xl'
        >
          Search
        </button>
      </div>
      
      <div className='mt-4 flex gap-2 items-center flex-wrap'>
        {filters.map(filter => (
          <label 
            key={filter} 
            className="relative flex items-center justify-center w-[60px] sm:w-[100px] cursor-pointer 
            border border-border rounded-md"
          >
            <input
              type="checkbox"
              className="sr-only peer" 
              checked={filter === activeFilter}
              onChange={() => handleChangeActiveFilter(filter)}
            />
            <span 
              className="w-full h-full py-1 flex items-center justify-center 
              bg-white peer-checked:bg-[#fcefe9] text-[12px] sm:text-sm sm:font-medium"
            >
              {filter}
            </span>
          </label>
        ))}
      </div>
    </form>
  );
}