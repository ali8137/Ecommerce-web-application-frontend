// import React from 'react'

import {
  Box,
  Button,
  // Grid,
  Grid2,
  TextField,
} from '@mui/material'
import { grey } from '@mui/material/colors'

const DeliveryAddressForm = () => {


  // another way to handle the submission of the form is by using <Form> and action function also
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
    // finished-TODO: change the below html <form> to react router <Form>. check the code in the far bottom of this file
    // related to the above note: no need to do the above, because i have implemented <Form> in the react component "ProductDetails"
    <form onSubmit={handleSubmit}>
      <Box sx={{ border: `1px solid ${grey[400]}`, borderRadius: 2, p: 4 }}>
        {/* <Grid container sx={{}}> */}
        {/* the above version of <Grid> is deprecated */}
        <Grid2
          container
          columns={12}
          columnSpacing={2}
          rowSpacing={3}
          // sx={{ border: '2px solid gray' }}
        >
          <Grid2 size={{ xs: 12, lg: 6 }} sx={{}}>
            {/* no "item" prop in <Grid2> unlike <Grid> */}
            <TextField
              // size="small"
              required
              //   disabled

              id="firstName"
              // i think the <textfield> component must have different id each
              name="firstName"
              // the name is important to use it when handling the submitted data of the form
              label="first name"
              //   appears in the top part of the <TextField> when focusing in the <TextField>, and appears inside the <TextField> when not

              //   variant='outlined'
              //   variant="filled"

              // defaultValue="Hello World"

              // type="password"
              //   autoComplete="current-password"

              //   type="number"

              //   type="search"

              //   helperText="Some important text"
              // important info below the <TextField>

              // slotProps={{
              //   input: {
              //     readOnly: true,
              //   },
              //   inputLabel: {
              //     shrink: true,
              //   },
              // }}
              // or (but the below is deprecated)
              // inputProps={{
              //   readOnly: true,
              // }}

              // sx={{ width: '100%' }}
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
          <Grid2
            size={{ xs: 12, lg: 6 }}
            sx={
              {
                // height: '8rem',
                // border: '2px solid red',
              }
            }
          >
            {/* <div
              style={{ height: '100%' }}
              // className="border-2"
            > */}
            <TextField
              required
              id="lastName"
              label="last name"
              name="lastName"
              // the name is important to use it when handling the submitted data of the form
              fullWidth
              // sx={
              //   {
              //     // border: '2px solid yellow',
              //     // width: '100%',
              //     // height: '100%', // Sets the outer container's height
              //     // '& .MuiInputBase-root': {
              //     //   height: '100%', // Ensures the input field stretches to the container's height
              //     // },
              //     // '& .MuiOutlinedInput-input': {
              //     //   padding: '12px 14px', // Adjust padding for the input text area
              //     // },
              //     // '& .MuiInputLabel-root': {
              //     //   top: '50%', // Move label to the middle vertically
              //     //   transform: 'translateY(-50%) translateX(15%)', // Adjust for the label's height (center it perfectly)
              //     // },
              //     // '& .MuiInputLabel-shrink': {
              //     //   transform: 'translateY(-200%) scale(0.75)', // Maintain correct position when label shrinks
              //     // },
              //   }
              // }
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
            {/* </div> */}
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              lg: 12,
            }}
            sx={{
              height: '8rem',
              // the above style is to approximately double the height of the <grid2> component wrapping the <TextField>
              // border: '2px solid red',
            }}
          >
            <div
              style={{ height: '100%' }}
              // className="border-2"
            >
              <TextField
                required
                id="address"
                label="Address"
                // the below styling is just to double the height of the <TextField> after doubling the height of the <grid2> component wrapping it
                name="address"
                // the name is important to use it when handling the submitted data of the form
                fullWidth
                // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
                // reusability, and use the style for all the below <TextField> components
                sx={{
                  // border: '2px solid yellow',
                  // width: '100%',
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
              // the name is important to use it when handling the submitted data of the form

              // sx={{ width: '100%' }}
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
              // sx={{ width: '100%' }}
              name="city"
              // the name is important to use it when handling the submitted data of the form
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
              // sx={{ width: '100%' }}
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
              // the name is important to use it when handling the submitted data of the form
              autoComplete="given-name"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <TextField
              required
              id="zip-postal-code"
              label="zip / postal code"
              name="zip"
              // the name is important to use it when handling the submitted data of the form
              fullWidth
              // sx={{ width: '100%' }}
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
              // the name is important to use it when handling the submitted data of the form
              // TODO: add the below stylign as a dedicated tailwind style in the top of this file to enhance
              // reusability, and use the style for all the below <TextField> components
              sx={{
                // border: '2px solid yellow',
                // width: '100%',
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
              // sx={{ width: '100%' }}
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















// // import React from 'react'

// import {
//   Box,
//   Button,
//   // Grid,
//   Grid2,
//   TextField,
// } from '@mui/material'
// import { grey } from '@mui/material/colors'
// import { Form, useNavigation } from 'react-router-dom'

// export async function action({ request }) {
//   const formData = await request.formData()

//   const data = {
//     firstName: formData.get('firstName'),
//     lastName: formData.get('lastName'),
//     address: formData.get('address'),
//     city: formData.get('city'),
//     state: formData.get('state'),
//     zip: formData.get('zip'),
//     phoneNumber: formData.get('phoneNumber'),
//   }
//   console.log(data)

//   return data
// }

// const DeliveryAddressForm = () => {
//   // const handleSubmit = (e) => {
//   //   e.preventDefault()
//   //   const formData = new FormData(e.currentTarget)
//   //   const data = {
//   //     firstName: formData.get('firstName'),
//   //     lastName: formData.get('lastName'),
//   //     address: formData.get('address'),
//   //     city: formData.get('city'),
//   //     state: formData.get('state'),
//   //     zip: formData.get('zip'),
//   //     phoneNumber: formData.get('phoneNumber'),
//   //   }
//   //   console.log(data)
//   // }

//   const navigation = useNavigation()
//   console.log('navigation', navigation)

//   return (
//     <div>
//       {/* react-router <Form> won't work with <BrowserRouter>, it works only with createBrowserRouter() way, that is with data layer API (loader functions) */}
//       <Form
//         method="post"
//         // action="/submit"
//         replace
//       >
//         <Box sx={{ border: `1px solid ${grey[400]}`, borderRadius: 2, p: 4 }}>
//           {/* <Grid container sx={{}}> */}
//           {/* the above version of <Grid> is deprecated */}
//           <Grid2
//             container
//             columns={12}
//             columnSpacing={2}
//             rowSpacing={3}
//             // sx={{ border: '2px solid gray' }}
//           >
//             <Grid2 size={{ xs: 12, lg: 6 }} sx={{}}>
//               {/* no "item" prop in <Grid2> unlike <Grid> */}
//               <TextField
//                 // size="small"
//                 required
//                 //   disabled

//                 id="firstName"
//                 // i think the <textfield> component must have different id each
//                 name="firstName"
//                 // the name is important to use it when handling the submitted data of the form
//                 label="first name"
//                 //   appears in the top part of the <TextField> when focusing in the <TextField>, and appears inside the <TextField> when not

//                 //   variant='outlined'
//                 //   variant="filled"

//                 // defaultValue="Hello World"

//                 // type="password"
//                 //   autoComplete="current-password"

//                 //   type="number"

//                 //   type="search"

//                 //   helperText="Some important text"
//                 // important info below the <TextField>

//                 // slotProps={{
//                 //   input: {
//                 //     readOnly: true,
//                 //   },
//                 //   inputLabel: {
//                 //     shrink: true,
//                 //   },
//                 // }}
//                 // or (but the below is deprecated)
//                 // inputProps={{
//                 //   readOnly: true,
//                 // }}

//                 // sx={{ width: '100%' }}
//                 fullWidth
//                 autoComplete="given-name"
//               />
//             </Grid2>
//             <Grid2
//               size={{ xs: 12, lg: 6 }}
//               sx={
//                 {
//                   // height: '8rem',
//                   // border: '2px solid red',
//                 }
//               }
//             >
//               {/* <div
//               style={{ height: '100%' }}
//               // className="border-2"
//             > */}
//               <TextField
//                 required
//                 id="lastName"
//                 label="last name"
//                 name="lastName"
//                 // the name is important to use it when handling the submitted data of the form
//                 fullWidth
//                 sx={
//                   {
//                     // border: '2px solid yellow',
//                     // width: '100%',
//                     // height: '100%', // Sets the outer container's height
//                     // '& .MuiInputBase-root': {
//                     //   height: '100%', // Ensures the input field stretches to the container's height
//                     // },
//                     // '& .MuiOutlinedInput-input': {
//                     //   padding: '12px 14px', // Adjust padding for the input text area
//                     // },
//                     // '& .MuiInputLabel-root': {
//                     //   top: '50%', // Move label to the middle vertically
//                     //   transform: 'translateY(-50%) translateX(15%)', // Adjust for the label's height (center it perfectly)
//                     // },
//                     // '& .MuiInputLabel-shrink': {
//                     //   transform: 'translateY(-200%) scale(0.75)', // Maintain correct position when label shrinks
//                     // },
//                   }
//                 }
//                 autoComplete="given-name"
//               />
//               {/* </div> */}
//             </Grid2>
//             <Grid2
//               size={{
//                 xs: 12,
//                 lg: 12,
//               }}
//               sx={{
//                 height: '8rem',
//                 // the above style is to approximately double the height of the <grid2> component wrapping the <TextField>
//                 // border: '2px solid red',
//               }}
//             >
//               <div
//                 style={{ height: '100%' }}
//                 // className="border-2"
//               >
//                 <TextField
//                   required
//                   id="address"
//                   label="Address"
//                   // the below styling is just to double the height of the <TextField> after doubling the height of the <grid2> component wrapping it
//                   name="address"
//                   // the name is important to use it when handling the submitted data of the form
//                   fullWidth
//                   sx={{
//                     // border: '2px solid yellow',
//                     // width: '100%',
//                     height: '100%', // Sets the outer container's height
//                     '& .MuiInputBase-root': {
//                       height: '100%', // Ensures the input field stretches to the container's height
//                     },
//                     '& .MuiOutlinedInput-input': {
//                       padding: '12px 14px', // Adjust padding for the input text area
//                     },
//                     '& .MuiInputLabel-root': {
//                       top: '50%', // Move label to the middle vertically
//                       transform: 'translateY(-50%) translateX(20px)', // Adjust for the label's height (center it perfectly)
//                     },
//                     '& .MuiInputLabel-shrink': {
//                       transform:
//                         'translateY(-300%) scale(0.75) translateX(20px)', // Maintain correct position when label shrinks
//                     },
//                   }}
//                   autoComplete="given-name"
//                 />
//               </div>
//             </Grid2>
//             <Grid2 size={{ xs: 12, lg: 12 }}>
//               <TextField
//                 // required
//                 id="description"
//                 label="description"
//                 name="description"
//                 // the name is important to use it when handling the submitted data of the form

//                 // sx={{ width: '100%' }}
//                 fullWidth
//                 multiline
//                 rows={4}
//                 autoComplete="given-name"
//               />
//             </Grid2>
//             <Grid2 size={{ xs: 12, lg: 6 }}>
//               <TextField
//                 required
//                 id="city"
//                 label="city"
//                 // sx={{ width: '100%' }}
//                 name="city"
//                 // the name is important to use it when handling the submitted data of the form
//                 fullWidth
//                 autoComplete="given-name"
//               />
//             </Grid2>
//             <Grid2 size={{ xs: 12, lg: 6 }}>
//               <TextField
//                 required
//                 id="state-province-region"
//                 label="state/province/region"
//                 fullWidth
//                 // sx={{ width: '100%' }}
//                 name="state"
//                 // the name is important to use it when handling the submitted data of the form
//                 autoComplete="given-name"
//               />
//             </Grid2>
//             <Grid2 size={{ xs: 12, lg: 6 }}>
//               <TextField
//                 required
//                 id="zip-postal-code"
//                 label="zip / postal code"
//                 name="zip"
//                 // the name is important to use it when handling the submitted data of the form
//                 fullWidth
//                 // sx={{ width: '100%' }}
//                 autoComplete="shipping postal-code"
//               />
//             </Grid2>
//             <Grid2 size={{ xs: 12, lg: 6 }}>
//               <TextField
//                 required
//                 id="phoneNumber"
//                 label="phone number"
//                 name="phoneNumber"
//                 // the name is important to use it when handling the submitted data of the form
//                 fullWidth
//                 // sx={{ width: '100%' }}
//               />
//             </Grid2>
//           </Grid2>
//           <Button
//             type="submit"
//             variant="contained"
//             color="secondary"
//             size="large"
//             sx={{ width: '30%', marginLeft: '10%', mt: '3rem' }}
      
//             disabled={navigation.state === 'submitting'}
//           >
//             {navigation.state === 'submitting' ? 'Delivering...' : 'Deliver'}
//           </Button>
//         </Box>
//       </Form>
//     </div>
//   )
// }

// export default DeliveryAddressForm
