import styled from "styled-components";

const PADDINGS = {
  large: 20,
  medium: 15,
  small: 10,
};

const Input = styled.input`
  outline: none;
  margin: 15px;
  font-size: 17px;
  padding: ${({ size }) => PADDINGS[size] ?? PADDINGS["medium"]}px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "5px")};
  border: ${({ $error }) => ($error ? "2px solid red" : "2px solid #eee")};

  &:hover {
    background-color: #eee;
  }
`;

export default Input;

// import styled from 'styled-components';

// const SIZES = {
//   large: 24,
//   medium: 20,
//   small: 16,
// };

// const Input = styled.input`
//   font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px;
//   border-radius: ${({ $round }) => ($round ? '9999px' : '4px')};
//   border: 2px solid ${({ $error }) => $error ? '#f44336' : '#eeeeee'};
//   padding: 16px;
//   outline: none;

//   &:focus {
//     border-color: ${({ $error }) => $error ? '#f44336' : '#7760b4'};
//   }
// `;

// export default Input;
