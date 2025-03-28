import React from 'react'
import Navbar from './shared/navbar'
import Job from './Job';



const randomJobs = [1, 2, 3];
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length}) </h1>
        <div className='grid  lg:grid-cols-3 gap-4 mt-5'>
          {
            randomJobs.map((item, index) => {
              return (
                <Job />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Browse