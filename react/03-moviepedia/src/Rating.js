import React from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selectRating, rating, selected, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = selectRating ? () => selectRating(rating) : undefined;
  const handleMouseHover = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseHover}
    >
      ★
    </span>
  );
}

function Rating({ selectRating, hoverRating, onHover, onMouseOut }) {
  return (
    // 반복 시엔 항상 Key={} 값을 정해준다. 겹치지 않는 것으로!
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selectRating={selectRating}
          rating={arrNum}
          selected={hoverRating >= arrNum}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
