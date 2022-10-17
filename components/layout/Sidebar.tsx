import UnitSizeList from 'components/utils/UnitSizeList'
import React from 'react'
import { ChildrenProps } from 'types/types'

function Sidebar({ children }: ChildrenProps) {
  return (
    <div className='flex flex-col justify-start mr-3'>
      {children}
      <UnitSizeList />
    </div>
  )
}

export default Sidebar