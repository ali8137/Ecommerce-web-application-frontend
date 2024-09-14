// import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const LinearProgressWithLabel = (prop) => {
  // I dont know why when using "props" above instead of "prop", vs code shows an error message and the project functionality is well

  const { value } = prop

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '60%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 8,
            '& .MuiLinearProgress-bar': {
              backgroundColor:
                value > 75
                  ? 'green'
                  : value > 50
                  ? 'yellow'
                  : value > 25
                  ? 'orange'
                  : 'red',
              // custom bar color
            },
            backgroundColor: '#e0e0e0', // custom background color
          }}
        />
        {/* or */}
        {/* <LinearProgress variant="determinate" {...props} /> */}
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body1"
          sx={
            {
              // color:
              //   (value > 75) && "green" || (value > 50) && "yellow" || (value > 25) && "orange" || "red",
            }
          }
          className={
            value > 75
              ? 'text-green-600'
              : value > 50
              ? 'text-yellow-500'
              : value > 25
              ? 'text-orange-500'
              : 'text-red-600'
          } // not a good coloring style being applied here
          // or
          // className={(value > 75 && "text-green-600") || (value > 50 && "text-yellow-500") || (value > 25 && "text-orange-500") || "text-red-600"}
        >
          {(value > 75 && 'very good') ||
            (value > 50 && 'good') ||
            (value > 25 && 'average') ||
            'bad'}
        </Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  // To ensure the passed props are of the expected type, you can use PropTypes to validate props. This is optional but helpful in preventing bugs.
  // the above is just some sort of validaton technique for props
}

export default LinearProgressWithLabel
