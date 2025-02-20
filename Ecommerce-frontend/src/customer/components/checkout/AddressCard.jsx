import { Button } from '@mui/material'

const AddressCard = (prop) => {
  const { hasButtons } = prop
  return (
    <div>
      <h2 className="font-bold text-lg">rami sarbal</h2>
      <p className="">123, 1st street, cairo, egypt</p>
      <h3 className="font-semibold">phone Number</h3>
      <p className="">+201111111111</p>
      {hasButtons && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, width: '40%' }}
        >
          Deliver
        </Button>
      )}
    </div>
  )
}

export default AddressCard
