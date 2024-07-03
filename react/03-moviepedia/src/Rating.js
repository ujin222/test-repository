import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <span>★</span>;
}

function Rating(props) {
  return (
    // 반복 시엔 항상 Key={} 값을 정해준다. 겹치지 않는 것으로!
    <div>
      {RATINGS.map((arrNum) => (
        <Star key={arrNum} />
      ))}
    </div>
  );
}

export default Rating;
