import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-2 bg-gray-800 text-white'>
      <div className="logo"><span className='font-bold text-xl mx-8'>TaskTaker</span></div>
      <ul className=' flex gap-8 mx-8'>
        <li className='cursor-pointer hover:font-bold transition-all'>
          Home
        </li>
        <li className='cursor-pointer hover:font-bold transition-all'>
          Your Tasks
          </li>
      </ul>
    </nav>
  )
}

export default Navbar