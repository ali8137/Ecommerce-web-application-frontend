import React from 'react'
import HomeSectionCarousel from './HomeSectionCarousel'

const MemorizedHomeSectionCarousel = React.memo(HomeSectionCarousel)

// memorizedHomeSectionCarousel.displayName = 'memorizedHomeSectionCarousel';
// // the above is incase we want to change the displayname of the component "memorizedHomeSectionCarousel"

export default MemorizedHomeSectionCarousel;
