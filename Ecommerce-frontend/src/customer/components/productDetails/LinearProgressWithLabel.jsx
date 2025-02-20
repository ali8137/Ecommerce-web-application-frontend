import { Box, LinearProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const LinearProgressWithLabel = (prop) => {
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
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body1"
          sx={{}}
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
  value: PropTypes.number.isRequired,
  // To ensure the passed props are of the expected type, you can use PropTypes to validate props. This is optional but helpful in preventing bugs.
}

export default LinearProgressWithLabel
