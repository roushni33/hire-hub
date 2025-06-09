import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '../redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <span className='px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>HireHub – Where Top Talent Meets Top Jobs</span>
            <h1 className='text-5xl font-bold mt-6'>Connecting <span className='text-[#5c34a8]' >Talent</span>  <br />with <span className='text-[#6a38c2] '>Opportunity</span></h1>
            <p className='mt-4'>Empowering careers. Enabling smarter hiring </p>
            <div>
                <input type='text' placeholder='Search for jobs' onChange={(e) => setQuery(e.target.value)} className='border border-gray-300 shadow-sm rounded-full px-4 py-2 mt-6' />
                <button onClick={searchJobHandler} className='bg-[#6a38c2] text-white px-4 py-2 rounded-full ml-2'>Search</button>
            </div>
        </div>
    )
}

export default HeroSection
