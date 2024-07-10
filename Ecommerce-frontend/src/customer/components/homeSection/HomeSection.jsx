import { useState } from "react"
import HomeSectionCarousel from "./HomeSectionCarousel"
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


  return (
    <section>
      <HomeSectionCarousel dataObject={men_shirt_state}/>
      <HomeSectionCarousel dataObject={women_dress_state}/>
      <HomeSectionCarousel dataObject={men_jeans_state}/>
      <HomeSectionCarousel dataObject={women_top_state}/>
      <HomeSectionCarousel dataObject={men_shoes_state}/>
      <HomeSectionCarousel dataObject={women_gowns_state}/>
      <HomeSectionCarousel dataObject={men_pants_state}/>
      <HomeSectionCarousel dataObject={women_attire_state}/>
      <HomeSectionCarousel dataObject={women_jeans_state}/>
    </section>
  )
}

export default HomeSection