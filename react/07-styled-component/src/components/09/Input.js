import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #eee;
  width: 100%;
  padding: 7px;

  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#7760b4")};
  }
  &::placeholder {
    color: #ced4da;
  }
`;

export default Input;
