'use client'
import React from 'react'
import { useMyContext } from '@/contexts/Context'
import Image from 'next/image'

export const Avatar = () => {
    const { avatarURL } = useMyContext()
  return (
    <img 
        src={avatarURL} 
        alt="User Icon" 
        className='w-10 h-10 rounded-full object-cover object-center'
    />
  )
}
