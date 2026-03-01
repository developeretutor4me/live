import React from 'react'
import NavbarSoon from './components/NavbarSoon'
import HeroSoon from './components/HeroSoon/HeroSoon'
import NewWay from './components/NewWay'
import WhyeTutor from '@/components/WhyeTutor'
import WhyEtutorWithus from '../for-etutor/components/WhyEtutorWithus'
import BecomeEtutor from './components/BecomeEtutor'
import StayUpdated from './components/StayUpdated'
import ConnectWithUs from './components/ConnectWithUs'
import Footer from '@/components/Footer'
import FaqsSoon from './components/FaqsSoon'

const Page = () => {
  return (
    <div>
        <NavbarSoon/>
        <HeroSoon/>
        <NewWay/>
        <BecomeEtutor/>
        <StayUpdated/>
        <ConnectWithUs/>
        <FaqsSoon/>
        <Footer/>
      
    </div>
  )
}

export default Page
