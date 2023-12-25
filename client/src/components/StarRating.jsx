import { useState } from 'react';
import Star from './Star';

const StarRating = ({ max, current, onRate, disableInteraction = false }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleStarClick = (rating) => {
    onRate(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const handleRatingMouseLeave = () => {
    setHoveredStar(null);
  };

  return (
    <div
      className="flex justify-start w-24"
      onMouseLeave={handleRatingMouseLeave}
    >
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          style={{
            color: disableInteraction
              ? index < current
                ? 'gold'
                : '#cfcfcf'
              : hoveredStar !== null && index <= hoveredStar
              ? 'gold'
              : '#cfcfcf',
          }}
          onClick={() => handleStarClick(index + 1)}
          onHover={() => handleStarHover(index)}
          disableInteraction={disableInteraction}
        />
      ))}
    </div>
  );
};
export default StarRating;
