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
                                <div className='text-center mt-5'>
                    <span className='px-4 py-2 rounded-full bg-secondary text-accent font-medium'>
                        HireHub – Where Top Talent Meets Top Jobs
                    </span>
                    <h1 className='text-5xl font-bold mt-6 text-primary'>
                        Connecting <span className='text-secondary'>Talent</span> <br />
                        with <span className='text-accent'>Opportunity</span>
                    </h1>
                    <p className='mt-4 text-muted'>Empowering careers. Enabling smarter hiring </p>
                    <div>
                        <input
                            type='text'
                            placeholder='Search for jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='border border-border shadow-sm rounded-full px-4 py-2 mt-6 placeholder:text-muted bg-elevated text-primary'
                        />
                        <button
                            onClick={searchJobHandler}
                            className='bg-accent text-bg-primary px-4 py-2 rounded-full ml-2 button-hover'
                        >
                            Search
                        </button>
                    </div>
                </div>
    )
}

export default HeroSection
