import React from "react";
import Input from "./Input";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
`;

export function Practice(props) {
  return (
    <Container>
      <h1>다이나믹 스타일링 연습</h1>
      <h2>Size</h2>
      <Input size="small" placeholder="small" />
      <Input size="medium" placeholder="medium" />
      <Input size="large" placeholder="large" />
      <h2>Round</h2>
      <Input $round placeholder="round" />
      <h2>Error</h2>
      <Input $error placeholder="error" />
    </Container>
  );
}
