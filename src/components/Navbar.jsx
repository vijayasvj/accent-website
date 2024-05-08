import React from 'react'
import { navbarData } from '../constants/navbarData'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <section className='flex w-full justify-between items-center px-6'>
        <span className='text-3xl font-semibold'><Link to="/">Accent Palette</Link></span>
        <ul className='flex items-center space-x-8'>
            {navbarData.map((navbar) => (
                <li key={navbar.id}>
                    <Link to={navbar.url} className={`${navbar.label === "Home" ? 'text-slate-100 underline underline-offset-4' : "text-slate-500"} hover:text-slate-100 ease-in-out duration-150`}>{navbar.label}</Link>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Navbar