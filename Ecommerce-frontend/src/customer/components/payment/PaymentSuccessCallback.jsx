// import React from 'react'

import DoneIcon from '@mui/icons-material/Done'

const PaymentSuccessCallback = () => {
  return (
    <>
      <div className="text-2xl font-bold">the payment was successful</div>
      <DoneIcon sx={{ color: 'green', fontSize: '100px' }} />
    </>
    // TODO: add more css styling in case needed
  )
}

export default PaymentSuccessCallback
