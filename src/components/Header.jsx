import React from 'react'

const Header = ({title, description}) => {
  return (
    <section className='flex flex-col items-center space-y-2'>
        <span className='text-3xl font-semibold'>{title}</span>
        <p className='text-md text-slate-500'>{description}</p>
    </section>
  )
}

export default Header