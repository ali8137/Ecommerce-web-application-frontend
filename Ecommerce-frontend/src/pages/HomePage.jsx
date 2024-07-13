// import React from 'react'

import Footer from "../customer/components/footer/Footer"
import MainCarousel from "../customer/components/homeCarousel/MainCarousel"
import HomeSection from "../customer/components/homeSection/HomeSection"

const HomePage = () => {
  return (
    <div>
        <MainCarousel />
        <HomeSection />
        <Footer />
    </div>
  )
}

export default HomePage