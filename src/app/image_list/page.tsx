import CardList from '@/components/card/CardList'
import React from 'react'

export default function page() {
  return (
    <section className='flex flex-col items-center'>
      <h1 className='sr-only'>이미지 리스트</h1>
      <CardList />
    </section>
  )
}
