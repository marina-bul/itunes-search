'use client'

import { FC, FormEvent, useState } from "react";

interface SearchFormProps {
  onFormSubmit: (queryStr: string) => void
}

export const SearchForm:FC<SearchFormProps> = ({ onFormSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(searchTerm)
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex items-center gap-3 mb-[30px]'>
      <input 
        type="text" 
        placeholder="Search media..." 
        className='w-full p-3 border border-[#dce4e7] rounded-[15px]'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        type="submit"
        className='w-[200px] p-2 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl'
      >
        Search
      </button>
    </form>
  );
}