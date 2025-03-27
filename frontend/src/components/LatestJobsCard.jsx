import React from 'react'
import { Badge } from './ui/Badge';

const LatestJobsCard = () => {
    return (
        <div className='bg-white p-5 rounded-lg shadow-xl border border-gray-100 cursor-pointer'>
            <div className='font-medium text-lg'>
                <h1>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
                <div>

                </div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing lorem  dolor sit amet consectetur adipisicing </p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'> 12 Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'> Part Time</Badge>
                <Badge className='text-[#7209B7] font-bold' variant='ghost'> 24 LPA</Badge>
            </div>


        </div>
    )
}

export default LatestJobsCard
