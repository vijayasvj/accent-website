import React from 'react'
import { featuresData } from '../constants/featuresData'
import FeatureCard from './FeatureCard'
import { Steps } from '../assets'

const Features = () => {
  return (
    <section className='w-3/4 flex flex-col items-center mb-24 space-y-10'>
        <div className='flex items-center space-x-4'>
        <span className='bg-slate-300 text-slate-950 p-2 rounded-full'><Steps /></span>
        <span className='text-2xl'>Steps to follow</span>
        </div>
        <div className='w-full grid grid-cols-3 gap-4'>
        {featuresData.map((feature) => (
            <FeatureCard data={feature} />
        ))}
        </div>
    </section>
  )
}

export default Features