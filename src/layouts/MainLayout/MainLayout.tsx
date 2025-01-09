'use client'

import { Footer } from './elems/Footer/Footer'
import { Header } from './elems/Header/Header'

import type { FC, PropsWithChildren } from 'react'


export const MainLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}