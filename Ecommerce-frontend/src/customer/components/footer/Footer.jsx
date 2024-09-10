import { Button, Grid, Link, styled, Typography } from "@mui/material"
// import DeleteIcon from '@mui/icons-material/Delete'
// import SendIcon from '@mui/icons-material/Send'
// import AlarmIcon from '@mui/icons-material/Alarm'
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
// import FingerPrintIcon from '@mui/icons-material/FingerPrint'
// import CloudUploadIcon from '@mui/icons-material/CloudUpload'




// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// })


const InheritButton = styled(Button)({
    color: 'inherit',
})


const Footer = () => {
  return (
    <Grid container className="bg-black text-center text-white py-5 mt-10">
      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
          {/* sx or any MUI styling overrides/takes precedence over tailwind css styling inside MUI component */}
          Company
        </Typography>

        <div>
          <InheritButton>Home</InheritButton>
        </div>
        <div>
          <InheritButton>About Us</InheritButton>
        </div>
        <div>
          <InheritButton>Blog</InheritButton>
        </div>
        <div>
          <InheritButton>About Us</InheritButton>
        </div>
        <div>
          <InheritButton>Contact Us</InheritButton>
        </div>

        {/* <InheritButton variant="contained" color="success" size="medium" startIcon={<DeleteIcon />} endIcon={<SendIcon />}>Home</InheritButton>
            <InheritButton component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                upload file
                <VisuallyHiddenInput type="file" /> */}
        {/* type="file" means this input component accepts files */}
        {/* </Button> */}

        {/* <Input type="text" placeholder="search" color="warning" sx={{margin: '10px', border: '1px solid white', color: 'white'}} />


            <IconButton aria-label="delete" size="large" disabled color="primary"><DeleteIcon /></IconButton>
            <IconButton aria-label="add an alarm" color="primary"><AlarmIcon /></IconButton>
            <IconButton aria-label="add to shopping cart" color="inherit"><AddShoppingCartIcon /></IconButton>
            <IconButton aria-label="fingerprint" color="secondary"><FingerPrintIcon /></IconButton> */}
      </Grid>

      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
          {/* sx or any MUI styling overrides/takes precedence over tailwind css styling inside MUI component */}
          Solutions
        </Typography>

        <div>
          <InheritButton>Marketing</InheritButton>
        </div>
        <div>
          <InheritButton>Analytics</InheritButton>
        </div>
        <div>
          <InheritButton>Commerce</InheritButton>
        </div>
        <div>
          <InheritButton>Insights</InheritButton>
        </div>
        <div>
          <InheritButton>Supports</InheritButton>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
          {/* sx or any MUI styling overrides/takes precedence over tailwind css styling inside MUI component */}
          Documentation
        </Typography>

        <div>
          <InheritButton>Guides</InheritButton>
        </div>
        <div>
          <InheritButton>API status</InheritButton>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
          {/* sx or any MUI styling overrides/takes precedence over tailwind css styling inside MUI component */}
          Legal
        </Typography>

        <div>
          <InheritButton>Claim</InheritButton>
        </div>
        <div>
          <InheritButton>Privacy</InheritButton>
        </div>
        <div>
          <InheritButton>Terms</InheritButton>
        </div>
      </Grid>

      <Grid item xs={12} sx={{ paddingTop: '2em' }}>
        <Typography variant="body2" component={'p'}>
          Copyright &copy; 2024. All rights reserved.
        </Typography>
        <Typography variant="body2" component={'p'}>
            made with love by me
        </Typography>
        <Typography variant="body2" component={'p'} gutterBottom>
          Icons made by {''}
          <Link
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik"
            color="inherit"
          >
            Freepik
          </Link>{' '}
          {''}
          from {''}
          <Link
            href="https://www.flaticon.com/"
            title="Flaticon"
            color="inherit"
          >
            www.flaticon.com
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer