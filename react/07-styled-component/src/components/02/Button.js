import styled from "styled-components";
import IconImg from "./nail.png";

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  background-color: #6750a4;
  padding: 20px;
  margin: 10px;
  color: #fff;
  border: none;
  /* display: flex;
  align-items: center;
  gap: 10px; */

  /* &:hover > img {
    opacity: 0.5;
  } */

  &:hover {
    ${Icon} {
      opacity: 0.5;
    }
  }
`;

function Button({ children }) {
  return (
    <div>
      <StyledButton>
        <Icon src={IconImg} />
        {children}
        {/* Nesting */}
      </StyledButton>
    </div>
  );
}

export default Button;
