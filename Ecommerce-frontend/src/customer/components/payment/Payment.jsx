import { Button } from '@mui/material'
import { createPaymentWithStripe } from '../../../utils/api'
import { loadStripe } from '@stripe/stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserCurrentOrder } from '../../../redux/features/orders/ordersSlice'

const Payment = () => {
  const { currentOrder } = useSelector((store) => store.orders)

  const dispatch = useDispatch()

  // TODO: this might change as we progress in the project, where the fetching of the current order will be more targeted
  useEffect(() => {
    dispatch(getUserCurrentOrder())
  }, [dispatch])

  // TODO: you can choose to rather write the below methods in the PaymentSLice in the redux store, or in the api.jsx file
  const createCheckoutSession = async () => {
    try {
      const response = await createPaymentWithStripe({
        currentOrder: currentOrder,
      })
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
      // console.log('sessionId: ', sessionId)
      // console.log('stripe: ', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      )

      const { error } = await stripe.redirectToCheckout({ sessionId })

      // console.log('error: ', error)

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
