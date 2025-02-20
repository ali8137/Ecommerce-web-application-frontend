import { Box, Button, Grid2, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'

const DeliveryAddressForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      phoneNumber: formData.get('phoneNumber'),
    }
    console.log(data)
  }
  // TODO: add the disabled, isSubmitting, errorResponse (or isError) and replace state of the <form>

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ border: `1px solid ${grey[400]}`, borderRadius: 2, p: 4 }}>
        <Grid2 container columns={12} columnSpacing={2} rowSpacing={3}>
          <Grid2 size={{ xs: 12, lg: 6 }} sx={{}}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="first name"
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              fullWidth
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} sx={{}}>
            <TextField
              required
              id="lastName"
              label="last name"
              name="lastName"
              fullWidth
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              lg: 12,
            }}
            sx={{
              height: '8rem',
            }}
          >
            <div style={{ height: '100%' }}>
              <TextField
                required
                id="address"
                label="Address"
                name="address"
                fullWidth
                // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
                sx={{
                  height: '100%', // Sets the outer container's height
                  '& .MuiInputBase-root': {
                    height: '100%', // Ensures the input field stretches to the container's height
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '12px 14px', // Adjust padding for the input text area
                  },
                  '& .MuiInputLabel-root': {
                    top: '50%', // Move label to the middle vertically
                    transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                  },
                }}
                autoComplete="given-name"
              />
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 12 }}>
            <TextField
              // required
              id="description"
              label="description"
              name="description"
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              fullWidth
              multiline
              rows={4}
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <TextField
              required
              id="city"
              label="city"
              name="city"
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              fullWidth
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <TextField
              required
              id="state-province-region"
              label="state/province/region"
              fullWidth
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              name="state"
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <TextField
              required
              id="zip-postal-code"
              label="zip / postal code"
              name="zip"
              fullWidth
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              autoComplete="shipping postal-code"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <TextField
              required
              id="phoneNumber"
              label="phone number"
              name="phoneNumber"
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance reusability, and use the style for all the below <TextField> components
              sx={{
                height: '100%', // Sets the outer container's height
                '& .MuiInputBase-root': {
                  height: '100%', // Ensures the input field stretches to the container's height
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px', // Adjust padding for the input text area
                },
                '& .MuiInputLabel-root': {
                  top: '50%', // Move label to the middle vertically
                  transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
                },
              }}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ width: '30%', marginLeft: '10%', mt: '3rem' }}
        >
          Deliver
        </Button>
      </Box>
    </form>
  )
}

export default DeliveryAddressForm
