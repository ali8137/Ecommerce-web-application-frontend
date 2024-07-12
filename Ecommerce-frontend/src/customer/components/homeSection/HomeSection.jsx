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


  // // before dynamically fetching data from the backend using API:
  // const [men_shirt_state, setMen_shirt_state] = useState([])
  // // slice() method to create a new array with the first 10 elements of the original array
  // const [women_dress_state, setWomen_dress_state] = useState([])
  // // // we can directly use javascript methods on the imported json data
  // const [men_jeans_state, setMen_jeans_state] = useState([])
  // const [women_top_state, setWomen_top_state] = useState([])
  // const [men_shoes_state, setMen_shoes_state] = useState([])
  // const [women_gowns_state, setWomen_gowns_state] = useState([])
  // const [men_pants_state, setMen_pants_state] = useState([])
  // const [women_attire_state, setWomen_attire_state] = useState([])
  // const [women_jeans_state, setWomen_jeans_state] = useState([])

  // // any change in any of the above states will cause the re-rendering of all the child components below whether this changed state was the one passed for the child component or not. to prevent that we can use wrap the definition of the below child components with React.memo(), which will do a shallow comparison for the prop. if React.memo() shallow comparison could not prevent the re-rendering for certain case like re-rendering due to re-definition of a function defined in the parent component, then in this case to prevent that in case the re-rendering is expensive, you can use useMemo() or useCallback()


  // const [isPending, startTransition] = useTransition();


  // useEffect(() => {

  //   // the usage of the setters must be inside useEffect() always to prevent infinite loop, because if the setters were added outside of the useEffect() or without it, the component will undergo initial rendering and then after the end of the initial rendering, the setters are executed and hence this will trigger another rendering and so on so forth.
  //   // state setters and the code inside useEffect are executed at the end of the current rendering and not during it, which means during the current rendering, they are not executed. after the end of the current render, they will be executed triggering the next re-renders
    
  //   // note that startTransition() is typically used within handleFormChange for example where the user is interacting with the user interface, and before/above this startTransition() inside the handleFormChange() function will be the main functionality that must be served to the user when interacting with the interface
  //   // related to the above note: the code above startTransition() (and inside handleFormChange) has high-priority, and the code inside startTransition() has low-priority
  //   startTransition(() => {
  //     // related to the above comment line/note: this is how rendering will happen in this case: first the code outside and before/above startTransition() (and inside handleFormChange) and the beginning of the startTransition() (changing the value of isPending from false to true) will cause the re-render, because these two actions are high-priority processes (because they are outside startTransition()). then after that the code inside startTransition() will be executed after because it is low-priority process which can be rendered/displayed after the execution and rendering/displaying of the code outside and before/above (and inside handleFormChange), that is after the formerly mentioned rendering in this comment. after execution of this code, the variable "isPending" will change back to false, and hence causing a new render.
  //     // related to the above comment: react apply a render when the code of one event loop tick have finished executing. after the second render (the render after the initial rendering, that is the rendering caused by the code outside and before/above startTransition() (and inside handleFormChange) ), the code inside startTransition() will be executed in the same tick as event loop tick as this code formerly mentioned in this comment, but it won't be rendered/displayed in the same tick unless it is finished executing(that is in case this low-priority code doesn't take much time), if so, it will be displayed in the same render as the former code
  //     // related to the above note: not sure 100% about it

  //     for (let i = 0; i < 1000; i++) {
  //       // console.log(i);
  //     }

  //     setMen_shirt_state(men_shirt.slice(0, 40))
  //     setWomen_dress_state(women_dress.slice(0, 10))
  //     setMen_jeans_state(men_jeans.slice(0, 10))
  //     setWomen_top_state(women_top.slice(0, 10))
  //     setMen_shoes_state(men_shoes.slice(0, 10))
  //     setWomen_gowns_state(women_gowns.slice(0, 10))
  //     setMen_pants_state(men_pants.slice(0, 10))
  //     setWomen_attire_state(women_attire.slice(0, 10))
  //     setWomen_jeans_state(women_jeans.slice(0, 10))
  //   })
  //   // the above setters will change the above state variables and hence cause the re-rendering of the parent component. also, after the end of the above transition, the state variable "isPending" will be set to false and hence this component will render. so, the result is two re-renders
  // }, [])
  // // the above useEffect() is when playing around with the rendering behavior and with the useTransition() hook

  // console.log("parent re-render", men_shirt_state, isPending)

  // return (
  //   <section>
  //     {isPending ? 
  //     <p className="text-center text-3xl font-bold">
  //       Loading...
  //     </p> : <MemorizedHomeSectionCarousel dataObject={men_shirt_state} />}          
  //         <MemorizedHomeSectionCarousel dataObject={women_dress_state} />
  //         <MemorizedHomeSectionCarousel dataObject={men_jeans_state} />
  //         <MemorizedHomeSectionCarousel dataObject={women_top_state} />
  //         <MemorizedHomeSectionCarousel dataObject={men_shoes_state} />
  //         <MemorizedHomeSectionCarousel dataObject={women_gowns_state} />
  //         <MemorizedHomeSectionCarousel dataObject={men_pants_state} />
  //         <MemorizedHomeSectionCarousel dataObject={women_attire_state} />
  //         <MemorizedHomeSectionCarousel dataObject={women_jeans_state} />
  //   </section>
  // )



}

export default HomeSection