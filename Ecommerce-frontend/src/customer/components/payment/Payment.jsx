import { Button } from '@mui/material'
import { createPaymentWithStripe } from '../../../utils/api'
import { loadStripe } from '@stripe/stripe-js'

const Payment = () => {
  const createCheckoutSession = async () => {
    try {
      const response = await createPaymentWithStripe()
      const { sessionId } = response

      return sessionId
    } catch (err) {
      console.error('error creating payment with stripe: ', err)
    } finally {
      // setIsLoading(false);
    }
  }

  const handlePaymentWithStripe = async () => {
    const sessionId = await createCheckoutSession()

    if (sessionId) {
      console.log('sessionId: ', sessionId)
      console.log('stripe: ', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      )

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
