import React from 'react'
import Image from 'next/image'
import logo from "../../../../public/assets/logo.png"
const NavbarSoon = () => {
  return (
    <div className='px-20 py-16 mb:py-7 mb:px-5'>
      <Image  loading="lazy"  className='w-[10rem] ' src={logo} alt='logo' />
    </div>
  )
}

export default NavbarSoon
