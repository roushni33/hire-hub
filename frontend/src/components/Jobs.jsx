import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'



const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Jobs = () => {
     const {allJobs} = useSelector(store => store.jobs);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-20   py-6'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>


                    {
                        allJobs.length === 0 ? <span> No Jobs Found </span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        allJobs.map((job) => {
                                            return (
                                                <div key={job?._id} >
                                                    <Job job={job}/>
                                                </div>
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