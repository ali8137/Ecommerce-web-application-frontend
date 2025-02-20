import { Button, Grid, Link, styled, Typography } from '@mui/material'

const InheritButton = styled(Button)({
  color: 'inherit',
})

const Footer = () => {
  return (
    <Grid container className="bg-black text-center text-white py-5 mt-10">
      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
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
      </Grid>

      <Grid item xs={12} sm={6} md={3} sx={{ padding: '10px' }}>
        <Typography variant="h6" className="pb-5" sx={{ fontWeight: 'bold' }}>
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
