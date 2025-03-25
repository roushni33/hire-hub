import React from 'react'
import Navbar from './shared/navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      {/* <LatestJobs/>
        <Footer/>  */}
    </div>
  )
}

export default Home