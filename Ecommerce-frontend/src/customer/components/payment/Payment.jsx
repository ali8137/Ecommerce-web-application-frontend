// import React from 'react'

import { Button } from '@mui/material'
import { createPaymentWithStripe } from '../../../utils/api'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';


const Payment = () => {
  // const navigate = useNavigate();

  // const [sessionId, setSessionId] = useState(null);
  // the above is wrong. return the sessionId is better than setting the state variable "sessionId"

  const createCheckoutSession = async () => {
    // setIsLoading(true);
    try {
      const response = await createPaymentWithStripe()

      // const { checkoutUrl } = response;
      const { sessionId } = response

      // window.location.href = checkoutUrl;
      // - you can't use any react router way/mean (useNavigate, etc) to
      //   navigate to the payment approcal URL, because the payment approval
      //   URL is not a route in this app/website.

      // setSessionId(sessionId);
      // the above is wrong. return the sessionId is better than setting the state variable "sessionId"

      console.log('sessionId: ', sessionId)

      return sessionId
    } catch (err) {
      console.error('error creating payment with stripe: ', err)
      // setError(err);
    } finally {
      // setIsLoading(false);
    }
  }

  const handlePaymentWithStripe = async () => {
    const sessionId = await createCheckoutSession()
    // the above is correct. return the sessionId is better than setting the state variable "sessionId"

    if (sessionId) {
      console.log('sessionId: ', sessionId)
      console.log('stripe: ', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      )
      // console.log("stripe: ", stripe)

      const { error } = await stripe.redirectToCheckout({ sessionId })

      console.log('error: ', error)

      if (error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div>
      <Button
        size="md"
        color="primary"
        variant="contained"
        onClick={handlePaymentWithStripe}
      >
      {/* TODO: disable the button when the loading/request processing is occuring */}
        Pay Now
      </Button>
    </div>
  )
}

export default Payment

// // import React from 'react'

// import { Button } from '@mui/material'
// import { createPaymentWithPaypal } from '../../../utils/api'
// // import { useNavigate } from 'react-router-dom';

// const Payment = () => {
//   // const navigate = useNavigate();

//   const handlePaymentWithPayPal = async () => {
//     // setIsLoading(true);
//     try {
//       const response = await createPaymentWithPaypal()

//       const approvalUrl = response.approvalUrl

//       window.location.href = approvalUrl
//       // - you can't use any react router way/mean (useNavigate, etc) to
//       //   navigate to the payment approcal URL, because the payment approval
//       //   URL is not a route in this app/website.
//     } catch (err) {
//       console.error('error creating payment with paypal: ', err)
//       // setError(err);
//     } finally {
//       // setIsLoading(false);
//     }
//   }

//   return (
//     <div>
//       <Button
//         size="md"
//         color="primary"
//         variant="contained"
//         onClick={handlePaymentWithPayPal}
//       >
//         Pay Now
//       </Button>
//     </div>
//   )
// }

// export default Payment
