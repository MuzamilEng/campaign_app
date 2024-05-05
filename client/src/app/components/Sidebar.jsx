import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sidebar } from '../data';
import {Icon} from '@iconify/react'

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className=' w-full max-w-[17vw] p-[1vw] h-screen bg-gray-800'>
      <main className='mx-[1vw] col-center'>
        <figure className='w-full max-w-[4vw] ml-[2vw]'>
        <Icon icon="mingcute:mail-send-line" className='text-[4vw] text-white' />
        </figure>
        <section className='mt-[2vw]'>
          {sidebar?.map((item, index) => (
           <Link  to={item?.path} key={index} 
           className={`flex transition-all duration-300 m-[0.5vw]   p-[0.7vw] 
           ${location.pathname === item.path ? 'border-r-[0.4vw] text-white text-medium border-[#ffff]' : 'hover:border-r-[0.4vw] text-[#A5A4A4]'}`}
         >
             <span className='text-[0.9vw]'><Icon icon="ic:outline-dashboard" /></span>
              <span className='ml-[1vw] text-[1vw] font-medium'>{item?.title}</span>
            </Link>
          ))}
        </section>
      </main>
    </aside> 
  )
}

export default Sidebar;