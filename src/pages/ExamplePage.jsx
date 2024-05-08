import React from 'react'
import Header from '../components/Header'
import ExampleContainer from '../components/ExamplesContainer'
import { LeftArrow } from '../assets'
import { Link } from 'react-router-dom'

const ExamplePage = () => {
  return (
    <div className='w-full h-screen overflow-hidden pt-10 pb-4 flex flex-col justify-between space-y-10 relative'>
        <Header
          title={"Accent Examples Showcase"}
          description={"Explore a diverse collection of words and phrases, accompanied by authentic audio recordings to help you grasp various accents."}
        />
        <main className="w-full overflow-y-scroll hide-scrollbar">
            <ExampleContainer />
        </main>
        <Link to='/'>
        <button className='absolute bg-slate-200 top-6 left-6 !mt-0 flex items-center space-x-1 rounded-sm shadow-md shadow-black text-slate-950 px-2 text-sm font-semibold'>
          <LeftArrow />
          <span>Back</span>
        </button>
        </Link>
    </div>
  )
}

export default ExamplePage