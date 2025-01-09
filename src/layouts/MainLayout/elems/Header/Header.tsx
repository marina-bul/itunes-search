'use client'

import Image from 'next/image'

import logo from '../../../../../public/logo.png'


export const Header = () => {
  return (
    <div className="w-full p-[25px] px-[50px] flex justify-center sm:justify-start items-center gap-2 bg-foreground text-white">
      <Image src={logo} alt="logo" width={40} height={40} />
      <span className="font-bold leading-[41px]">iTunes Search</span>
    </div>
  )
}