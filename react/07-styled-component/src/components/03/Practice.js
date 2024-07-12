import React from "react";
import Input from "./Input";
import Login from "./Login";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  margin: 0 auto;
`;

export function Practice(props) {
  return (
    <Container>
      {/* <Input /> */}
      <Login />
    </Container>
  );
}
