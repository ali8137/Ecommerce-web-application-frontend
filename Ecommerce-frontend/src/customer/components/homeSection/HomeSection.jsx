import { useState } from "react"
import women_dress from "../../data/women_dress.json"
// the name of the "variable" after import is the name of the json file we are dragging the data from. this is when we are importing json data
import women_jeans from "../../data/women_jeans.json"
import men_shirt from "../../data/men_shirt.json"
import women_top from "../../data/women_top.json"
import men_jeans from "../../data/men_jeans.json"
import women_gowns from "../../data/women_gowns.json"
import women_attire from "../../data/women_attire.json"
import men_pants from "../../data/men_pants.json"
import men_shoes from "../../data/men_shoes.json"
import MemorizedHomeSectionCarousel from "./MemorizedHomeSectionCarousel"



const HomeSection = () => {


  // before dynamically fetching data from the backend using API:
  const [men_shirt_state, ] = useState(men_shirt.slice(0,10))
  // slice() method to create a new array with the first 10 elements of the original array
  const [women_dress_state, ] = useState(women_dress.slice(0,10))
  // we can directly use javascript methods on the imported json data
  const [men_jeans_state, ] = useState(men_jeans.slice(0,10))
  const [women_top_state, ] = useState(women_top.slice(0,10))
  const [men_shoes_state, ] = useState(men_shoes.slice(0,10))
  const [women_gowns_state, ] = useState(women_gowns.slice(0,10))
  const [men_pants_state, ] = useState(men_pants.slice(0,10))
  const [women_attire_state, ] = useState(women_attire.slice(0,10))
  const [women_jeans_state, ] = useState(women_jeans.slice(0,10))

  // any change in any of the above states will cause the re-rendering of all the child components below whether this changed state was the one passed for the child component or not. to prevent that we can use wrap the definition of the below child components with React.memo(), which will do a shallow comparison for the prop. if React.memo() shallow comparison could not prevent the re-rendering for certain case like re-rendering due to re-definition of a function defined in the parent component, then in this case to prevent that in case the re-rendering is expensive, you can use useMemo() or useCallback()

  return (
    <section>
      <MemorizedHomeSectionCarousel dataObject={men_shirt_state} />
      <MemorizedHomeSectionCarousel dataObject={women_dress_state} />
      <MemorizedHomeSectionCarousel dataObject={men_jeans_state} />
      <MemorizedHomeSectionCarousel dataObject={women_top_state} />
      <MemorizedHomeSectionCarousel dataObject={men_shoes_state} />
      <MemorizedHomeSectionCarousel dataObject={women_gowns_state} />
      <MemorizedHomeSectionCarousel dataObject={men_pants_state} />
      <MemorizedHomeSectionCarousel dataObject={women_attire_state} />
      <MemorizedHomeSectionCarousel dataObject={women_jeans_state} />
    </section>
  )
}

export default HomeSection