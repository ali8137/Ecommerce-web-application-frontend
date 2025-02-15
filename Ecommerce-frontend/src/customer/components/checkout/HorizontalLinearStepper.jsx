import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeliveryAddressForm from './DeliveryAddressForm'
import AddressCard from './AddressCard'
import OrderSummary from './OrderSummary'
import Payment from '../payment/Payment'


// TODO: add the loader function. this loader function will fetch the order items, and will call the util function requireAuth() function to check if the user is logged in or not


const steps = ['Login', 'Delivery address', 'Order summary', 'Payment']

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  // we need to keep up with the above two states to know at which step in the <Stepper> component we are and to know whether one of the steps of the <Stepper> component is/was skipped or not

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped

    // console.log('skipped', skipped)
    // console.log('isStepSkipped', isStepSkipped(activeStep))

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    // the above block (along with the last line in this function) will remove the active/current step from the skipped set "skipped". this will help the <Stepper> component below to know that the current step is not skipped in the condition "if (isStepSkipped(index)) {stepProps.completed = false}", and thus will pass the prop "completed" with the value "true" to the <Step> component and hence this current/active step will be marked as completed when the "next" button is clicked".
    // the above block is necessary because when the user clicks on the "next" button for all the steps, then if he clicks on the reset button, this will take the user to first step, but if we didn't have the above block, then for the second step in our case here, which has its "isStepSkipped" returning true due to the previous round of steps by the user, in this round if we don't have the above block, then the second step would still be "isStepSkipped" and hence in this round, even if we clicked on the "next" button when at step 2, it will be marked as skipped and not as completed even though we completed it
    // the necessity of the above block might not appear when only one round/cycle of steps have been clicked/completed by the users

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    // the above setter will set the new value of the variable "activeStep", however the new value will be set in this render, but in the next render of this react component

    // console.log(activeStep)

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      // the current activeStep is the current in this function, but after the final finishes, the render will happen due to the above setter in this function, and hence the current activeStep will no longer be the current one in the next render which is very soon after now. so,in other words, we can say is the current activeStep is(or will be in a moment) the old value of the variable "activeStep". so, after the change of this variable, the <Stepper> component will be in the next step represented by the new value
      // the value of the variable "activeStep" above is still the old value, as the setting of the new value of it due to the above setter "setActiveStep" in this functon didn't take place yet in this render

      // console.log(activeStep)

      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }




  // TODO: implement back-to-shopping-cart-route button 


  // TODO: access the data fetched by the loader function present in this react component



  return (
    <Box sx={{ width: '100%', padding: '50px' }}>
      <Stepper activeStep={activeStep}>
        {/* activeStep prop is the index of the active step, the value of the variable "activeStep" passed as a value of this prop determines which step in te stepper is the active one(the one which UI is displayed. if the activeStep variable is set to 0, the first step in the stepper will be displayed. also, if the activeStep variable is set to 1, the first step in the stepper will be ticked (and the second step in the stepper will be displayed).   */}
        {/* whenever the value of the variable "activeStep" changes, the <Stepper> component will rerender itself and hence re-executes the code below */}
        {/* I don't think the variable "activeStep" has anything to do with any internal functionaility of the <Stepper> component. the only role of this variable is to re-render the <Stepper> component by passing it as prop to it */}

        {/* edit to the above note: in fact, the variable "activeStep" is involved in the internal functionality of the <Stepper> component. where the <Step> components of the array of <Step>s inside the <Stepper> component that has an index of a value that is less than the value of the variable "activeStep", then all these <Step> components will have their "completed" prop set to true and hence these <Step> components will be ticked/marked as completed. they will be marked as completed execept for the case where we manually or programmatically pass a prop "completed" with a value of "false" to certain <Step> component(s) of these <Step> components */}

        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          // the above two variables are to be passed as props to the Step and StepLabel components
          if (isStepOptional(index)) {
            // console.log('index', index, 'isStepOptional', isStepOptional(index))

            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            // console.log('index', index, 'isStepSkipped', isStepSkipped(index))

            stepProps.completed = false
            // when the "skip" button below is clicked, if the current/active step the first block (along with the last line in this function) of the function "handleNext" will remove the active/current step from the skipped set "skipped". this will help the <Stepper> component below to know that the current step is not skipped in the condition "if (isStepSkipped(index)) {stepProps.completed = false}", and thus will pass the prop "completed" with the value "true" to the <Step> component and hence this current/active step will be marked as completed when the "next" button is clicked".
          }

          // console.log('index', index, 'stepProps', stepProps)
          // console.log('index', index, 'labelProps', labelProps)

          return (
            <Step key={label} {...stepProps}>
              {/* {...stepProps} means that the properties of the stepProps object will be passed as props to the StepLabel component. in the above array where we applied the method "map", some elements of this array have their stepProps object having a property called "completed", for each one of these elemnts, the corresponding "<Step>" component will take the value of this property as a prop and thus this <Step> component will not be ticked/marked as completed when the "skip" button is clicked   */}
              {/* I think when the variable "activeStep" changes its value, the <Stepper> component will check the <Step> component of the previous activeStep if its "completed" prop is set to "false", if so, this previous <Step> component of the previous "activeStep" will be not marked as completed */}
              <StepLabel {...labelProps}>{label}</StepLabel>
              {/* {...labelProps} means that the properties of the labelProps object will be passed as props to the StepLabel component. in the above array where we applied the method "map", some elements of this array have their labelProps object having a property called "optional", for each one of these elemnts, the corresponding "<StepLabel>" component will take the value of this property as a prop and thus will display react component that is the value of this 'optional' property  */}
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* this Box component is used to add some space between the buttons */}
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          {/* <Typography sx={{ mt: 2, mb: 1 }}> */}
          {/* we can't have <div> html element inside MUI <Typography> component */}
          {activeStep === 0 ? (
            <div>login step</div>
          ) : activeStep === 1 ? (
            <div className="lg:flex lg:justify-around mb-16 mt-8">
              <div className="lg:w-2/5 border-2 p-8">
                <AddressCard hasButtons={true}/>
              </div>
              <div className="lg:w-2/4">
                <DeliveryAddressForm />
              </div>
            </div>
          ) : activeStep === 2 ? (
            <OrderSummary onNext={handleNext}/>
          ) : (
            <Payment />
          )}  
          {/* </Typography> */}
        </React.Fragment>
      )}
    </Box>
  )
}
