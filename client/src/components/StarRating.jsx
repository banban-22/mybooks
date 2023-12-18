import Star from './Star';

const Rating = ({ max, current }) => {
  const lightStar = current;
  const darkStar = max - lightStar;

  return (
    <div className="flex justify-start w-24">
      {[...Array(lightStar)].map((_, index) => (
        <Star key={index} style={{ color: 'gold' }} />
      ))}
      {[...Array(darkStar)].map((_, index) => (
        <Star key={index} style={{ color: 'gray' }} />
      ))}
    </div>
  );
};
export default Rating;
