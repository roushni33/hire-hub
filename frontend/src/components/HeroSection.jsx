import React from 'react'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <span className='px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>No.1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold mt-6'>Search,Apply & <br />Get Your <span className='text-[#6a38c2] '>Dream Jobs</span></h1>
            <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit omnis nisi assumenda dolores </p>
            <div>
                <input type='text' placeholder='Search for jobs' className='border border-gray-300 shadow-sm rounded-full px-4 py-2 mt-6' />
                <button className='bg-[#6a38c2] text-white px-4 py-2 rounded-full ml-2'>Search</button>
            </div>
        </div>
    )
}

export default HeroSection
