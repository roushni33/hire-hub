import React from 'react'
import { Badge } from './ui/Badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const LatestJobsCard = ({ job }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className='bg-elevated p-5 rounded-lg shadow-xl border border-border cursor-pointer'
        >
            <div className='font-medium text-lg'>
                <h1 className='text-secondary font-semi-bold'>
                    {job?.company?.name}
                </h1>
                <p className='text-sm text-accent'>{job.location}</p>
                <h1 className='font-semi-bold text-lg my-2 text-primary'>{job.title}</h1>
                <p className='text-sm text-muted'>{job.description} </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-secondary font-bold border border-border' variant='ghost'> {job.position} Positions</Badge>
                <Badge className='text-accent font-bold border border-border' variant='ghost'>{job.jobType}</Badge>
                <Badge className='text-primary font-bold border border-border' variant='ghost'>{job.salary} LPA</Badge>
            </div>


        </motion.div>
    )
}

export default LatestJobsCard
