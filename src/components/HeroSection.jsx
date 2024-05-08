import React from 'react'
import { LeftQuote, RightQuote } from '../assets'

const HeroSection = () => {
  return (
    <section className='w-full flex flex-col items-center my-24 space-y-8'>
        <div className='flex flex-col space-y-5 w-1/2'>
            <div className='w-full flex justify-start'>
            <LeftQuote className="w-10 h-10" />
            </div>
                <span className='text-2xl text-center'>Unlock the power of your voice. Master new accents, refine your pronunciation, and communicate with confidence.</span>
                <div className='w-full flex justify-end'>
            <RightQuote className="w-10 h-10" />

                </div>
        </div>
        <p className='w-3/4 text-center text-slate-400'>Explore our platform to immerse yourself in a world of accents and languages. Begin with our intuitive testing tools to assess your current pronunciation, then dive into personalized learning modules crafted to help you adapt and perfect any accent of your choice. For a deeper understanding of all that we offer, be sure to read our features section below and discover how you can transform your linguistic skills.</p>
    </section>
  )
}

export default HeroSection