import React from 'react'
import { Badge } from './ui/Badge';

const LatestJobsCard = ({ job }) => {
    return (
        <div className='bg-white p-5 rounded-lg shadow-xl border border-gray-100 cursor-pointer'>
            <div className='font-medium text-lg'>
                <h1>{job.company.name}</h1>
                <p className='text-sm text-gray-500'>{job.location}</p>
                <div>

                </div>
                <h1 className='font-bold text-lg my-2'>{job.title}</h1>
                <p className='text-sm text-gray-600'>{job.description} </p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'> {job.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job.jobType}</Badge>
                <Badge className='text-[#7209B7] font-bold' variant='ghost'>{job.salary} LPA</Badge>
            </div>


        </div>
    )
}

export default LatestJobsCard
