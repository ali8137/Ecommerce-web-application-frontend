// import React from 'react'

import Footer from "../customer/components/footer/Footer"
import MainCarousel from "../customer/components/homeCarousel/MainCarousel"
import HomeSection from "../customer/components/homeSection/HomeSection"


// TODO: add the loader function. this loader function will fetch the products listings, and will call the util function requireAuth() function to check if the user is logged in or not

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