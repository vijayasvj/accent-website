import React from 'react'
import { Link } from 'react-router-dom'
import { NavigateTo } from '../assets'

const FeatureCard = ({ data }) => {
  return (
    <section className='bg-slate-900 col-span-1 rounded-lg p-4 h-[420px] flex flex-col items-center justify-between shadow-md shadow-slate-black'>
        <span className='text-4xl my-8 font-bold bg-slate-400 rounded-full w-12 h-12 shadow-lg shadow-slate-950 flex items-center justify-center text-slate-950'>{data.id}</span>
        <span className='text-xl text-slate-300 font-bold'>{data.title}</span>
        <p className='text-slate-500 text-justify w-full'>{data.description}</p>
        <Link to={data.url}>
            <button className='w-fit bg-slate-500 hover:bg-slate-300 text-slate-950 ease-in-out duration-200 px-2 py-1 rounded-md flex items-center space-x-2'>
                <span className='font-semibold'>Go to {data.title}</span><NavigateTo />
            </button>
        </Link>
    </section>
  )
}

export default FeatureCard