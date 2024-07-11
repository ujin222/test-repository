import React from "react";
import Button from "./Button";
import Wrapper from "./Wrapper";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import Box from "./Box";
import Circle from "./Circle";
import Input from "./Input";

function HelloStyled(props) {
  return (
    <div>
      {/* <Button>Hello Styled !!</Button> */}
      <Wrapper>
        {/* <BoxOne />
        <BoxTwo /> */}
        <Box bgColor="#cf6a87">
          <span>🤯</span>
        </Box>
        <Box as="button" bgColor="#574b90" />
        <Circle bgColor="brown" />
      </Wrapper>
      <form>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <input type="text" required />
          <Button>제출</Button>
        </Wrapper>
      </form>
      <Wrapper>
        <Circle bgColor="blue" />
      </Wrapper>
    </div>
  );
}

export default HelloStyled;
