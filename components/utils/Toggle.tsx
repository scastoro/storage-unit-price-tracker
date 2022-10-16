import React from 'react'

interface Props {
  optionSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
function ViewToggle({optionSelected}: Props) {
  return (
    <select className='border border-black rounded my-auto py-1' onChange={optionSelected}>
      <option>Table</option>
      <option>Chart</option>
    </select>
  )
}

export default ViewToggle