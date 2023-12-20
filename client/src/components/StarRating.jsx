import { useState } from 'react';
import Star from './Star';

const Rating = ({ max, current, onRate, disableInteraction = false }) => {
  // const [current, setCurrent] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  // const lightStar = current;
  // const darkStar = max - lightStar;

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
      {/* {[...Array(lightStar)].map((_, index) => (
        <Star key={index} style={{ color: 'gold' }} />
      ))}
      {[...Array(darkStar)].map((_, index) => (
        <Star key={index} style={{ color: '#cfcfcf' }} />
      ))} */}
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
export default Rating;
