"use client"
import React, { useState } from 'react'

const Switcher13 = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='mr-[18px] text-sm font-medium text-black'>
          Switch Version
        </span>
        <div className='shadow-card flex h-[46px] w-[282px] items-center justify-center rounded-md bg-btnbg'>
          <span
            className={`flex h-9 w-fit items-center justify-center rounded ${
              !isChecked ? 'bg-darkBlue text-white' : 'text-red-600'
            }`}
          >
            completed
          </span>
          <span
            className={`flex h-9 w-fit items-center justify-center rounded ${
              isChecked ? 'bg-darkBlue' : 'text-body-color'
            }`}
          >
            upcoming
          </span>
        </div>
      </label>
    </>
  )
}

export default Switcher13
