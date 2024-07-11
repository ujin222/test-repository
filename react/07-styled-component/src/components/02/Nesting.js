import React from "react";
import Button from "./Button";

function Nesting(props) {
  return (
    <div>
      <Button children={"Nesting"} />
    </div>
  );
}

export default Nesting;
