import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  background-color: #781ad1;
  border: none;
  color: #fff;
  padding: 16px;
  font-size: 16px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "8px")};
  cursor: pointer;

  &:hover {
    background-color: #7760b4;
  }
`;

export default Button;
