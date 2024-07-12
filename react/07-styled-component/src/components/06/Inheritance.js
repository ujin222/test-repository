import React from "react";
import TermsOfService from "../06/TermsOfService";
import Button from "./Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const StyledTermsOfService = styled(TermsOfService)`
  background-color: #ededed;
  width: 400px;
  height: 400px;
  padding: 20px;
`;

const SubmitButton = styled(Button)`
  background-color: #de117d;
  width: 200px;

  // hover background-color: #f5070f;
`;

function Inheritance() {
  return (
    <Container>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </Container>
  );
}

export default Inheritance;
