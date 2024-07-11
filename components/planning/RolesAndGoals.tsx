import React from 'react'
import { List } from '@/components/planning/List'
import { BetterButton } from './BetterButton'

export const RolesAndGoals = () => {
  return (
    <div className='p-4'>
        <List 
            dbColumnName='roles'
        />
        <BetterButton dbColumnName='roles'/>
        {/* <List
            dbColumnName='checklist_items'
        /> */}
    </div>
  )
}
