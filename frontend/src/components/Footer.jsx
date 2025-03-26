import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='bg-[#6A36C2] text-white py-5'>
            <div className='max-w-7xl mx-auto px-20'>
            <div className='grid grid-cols-3 gap-4'>
                <div>
                <h1 className='font-bold text-2xl'>Company</h1>
                <p className='text-sm'>About</p>
                <p className='text-sm'>Contact</p>
                <p className='text-sm'>Careers</p>
                </div>
                <div>
                <h1 className='font-bold text-2xl'>Product</h1>
                <p className='text-sm'>Features</p>
                <p className='text-sm'>Pricing</p>
                <p className='text-sm'>Documentation</p>
                </div>
                <div>
                <h1 className='font-bold text-2xl'>Resources</h1>
                <p className='text-sm'>Blog</p>
                <p className='text-sm'>FAQ</p>
                <p className='text-sm'>Support</p>
                </div>
            </div>
            </div>
        </div>
        <div className='bg-[#6A36C2] text-white py-5'>
            <div className='max-w-7xl mx-auto px-20'>
            <p className='text-center text-sm'>© 2021 Company Name. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer