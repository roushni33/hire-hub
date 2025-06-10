import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='bg-elevated text-primary py-5 border-t border-border'>
        <div className='max-w-7xl mx-auto px-20'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <h1 className='font-bold text-2xl text-accent'>Company</h1>
              <p className='text-sm text-secondary'>About</p>
              <p className='text-sm text-secondary'>Contact</p>
              <p className='text-sm text-secondary'>Careers</p>
            </div>
            <div>
              <h1 className='font-bold text-2xl text-accent'>Product</h1>
              <p className='text-sm text-secondary'>Features</p>
              <p className='text-sm text-secondary'>Pricing</p>
              <p className='text-sm text-secondary'>Documentation</p>
            </div>
            <div>
              <h1 className='font-bold text-2xl text-accent'>Resources</h1>
              <p className='text-sm text-secondary'>Blog</p>
              <p className='text-sm text-secondary'>FAQ</p>
              <p className='text-sm text-secondary'>Support</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary text-muted py-5 border-t border-border'>
        <div className='max-w-7xl mx-auto px-20'>
          <p className='text-center text-sm'>© 2025 Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer