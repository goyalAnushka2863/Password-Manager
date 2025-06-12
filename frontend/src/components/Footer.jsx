import React from 'react'

const Footer = () => {
    return (
        <>

            <div className='bg-[#210c5e] px-5 fixed bottom-0 w-full flex flex-col items-center justify-center'>
                <div className="logo font-bold text-2xl">
                    <span className='text-[#a59afffa]'>&lt;</span>
                    Pass
                    <span className='text-[#a59afffa]'>OP/&gt;</span>
                </div>
                <div className="flex items-center justify-center">

                    <span>Created with</span>
                    <lord-icon
                        src="https://cdn.lordicon.com/xyboiuok.json"
                        trigger="morph"
                        state="morph-heart"
                        colors="primary:#e83a30">
                    </lord-icon>
                    <span>CodeWithAnushka</span>
                </div>
            </div>
        </>
    )
}

export default Footer
