import React from 'react'
import HomeSectionCarousel from './HomeSectionCarousel'

// React.memo() below prevent the re-rendering of the below component in case its parent re-renders unless the cause of rerendering of the parent component is the prop passed to the below component
const MemorizedHomeSectionCarousel = React.memo(HomeSectionCarousel)

export default MemorizedHomeSectionCarousel
