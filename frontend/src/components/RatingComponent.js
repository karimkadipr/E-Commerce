import React from 'react'
import StarRateIcon from '@material-ui/icons/StarRate'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import StarHalfIcon from '@material-ui/icons/StarHalf'

const RatingComponent = ({ rating }) => {
  return (
    <div>
      {rating === 5 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
        </div>
      ) : rating === 4.5 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarHalfIcon />
        </div>
      ) : rating === 4 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 3.5 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarHalfIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 3 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarRateIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 2.5 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarHalfIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 2 ? (
        <div>
          <StarRateIcon />
          <StarRateIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 1.5 ? (
        <div>
          <StarRateIcon />
          <StarHalfIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 1 ? (
        <div>
          <StarRateIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : rating === 0.5 ? (
        <div>
          <StarHalfIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      ) : (
        <div>
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
      )}
    </div>
  )
}

export default RatingComponent
