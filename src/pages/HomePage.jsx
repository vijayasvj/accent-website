import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
        <div className=' pt-10 overflow-y-scroll h-full overflow-x-hidden hide-scrollbar flex flex-col items-center justify-between'>
        <Navbar />
        <HeroSection />
        <Features />
        <Footer />
        </div>
    </div>
  )
}

export default HomePage