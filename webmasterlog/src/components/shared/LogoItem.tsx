'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LogoItem = () => {
  return (
    <div className='flex items-center justify-between gap-2 p-2'>
      <div className='avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center'>
        <Link href={'https://github.com/Avdhesh-Varshney/WebMasterLog'}>
          <Image src={`/logo.webp`} alt='logo' width={50} height={50} sizes='50' />
        </Link>
      </div>
      <div className="grow">
        <p className='text-[16px] font-bold'>
          <Link href={'https://github.com/Avdhesh-Varshney/WebMasterLog'}>
            Web Master Log
          </Link>
        </p>
        <p className='text-[12px] text-neutral-500'>
          <Link href={'https://github.com/Avdhesh-Varshney'}>
            Avdhesh Varshney
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogoItem;
