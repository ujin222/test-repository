import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 50px;
  width: 500px;
  height: 500px;

  p {
    margin: 5px;
  }
`;

const LoginInput = styled.input`
  padding: 16px;
  width: 50%;
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  margin: 2px 0 30px;

  &:focus {
    border-color: #7760b4;
  }
`;

function Login(props) {
  return (
    <StyledLogin>
      <h1>로그인</h1>
      <p>Email</p>
      <LoginInput placeholder="이메일" />
      <p>Password</p>
      <LoginInput placeholder="비밀번호" />
    </StyledLogin>
  );
}

export default Login;
