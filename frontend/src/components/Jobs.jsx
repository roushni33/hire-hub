import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '../hooks/useGetAllJobs'




const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.salary?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            })

            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchQuery])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-20   py-6'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>


                    {
                        filterJobs.length === 0 ? <span> No Jobs Found </span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        filterJobs.map((job) => {
                                            return (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id} >
                                                    <Job job={job} />
                                                </motion.div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs