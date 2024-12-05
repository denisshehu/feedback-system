import { useState } from "react";

const RatingStars = ({
  defaultRating = 0,
  isStatic = false,
  updateOnSelect,
}) => {
  const [hovered_rating, setHoveredRating] = useState(0);
  const [selected_rating, setSelectedRating] = useState(defaultRating);

  const getSuffixes = (index) => {
    const firstSuffix =
      index < (hovered_rating || selected_rating) ? "on" : "off";
    const secondSuffix = !isStatic ? "dynamic" : "";
    return `${firstSuffix} ${secondSuffix}`;
  };

  const handleMouseEnter = (index) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index) => {
    setSelectedRating(index + 1);
    updateOnSelect(index + 1);
  };

  return (
    <div className="rating-stars">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`material-symbols-rounded ${getSuffixes(index)}`}
          onMouseEnter={!isStatic ? () => handleMouseEnter(index) : undefined}
          onMouseLeave={!isStatic ? handleMouseLeave : undefined}
          onClick={!isStatic ? () => handleClick(index) : undefined}
        >
          star
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
