import React from 'react'
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='bg-[#3A1D87]'>
        <div className="mycontainer   flex justify-around items-center px-4 h-14 py-5">
            <div className="logo font-bold text-2xl">
                <span className='text-[#a59afffa]'>&lt;</span>
                Pass
                <span className='text-[#a59afffa]'>OP/&gt;</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
