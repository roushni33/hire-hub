import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';





const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <h1 className='font-bold text-xl my-10 text-primary'>Search Results ({allJobs.length}) </h1>
        <div className='grid  lg:grid-cols-3 gap-4 mt-5'>
          {
            allJobs.map((job) => {
              return (
                <Job key={job._id} job={job} />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Browse