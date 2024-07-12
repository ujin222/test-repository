import React from "react";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import Icon from "./kakao.svg";

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  margin: 0 auto;
  width: 400px;
  text-align: center;

  & > h1 {
    font-weight: bold;
    margin: 10px;
    background: linear-gradient(90deg, skyblue, purple);
    background-clip: text;
    color: transparent;
  }
`;

const AlertDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > a {
    color: #781ad1;
    border-bottom: 1px solid #781ad1;
    font-weight: 600;
    cursor: pointer;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  & > label {
    color: #d1b3e0;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

const KakaoButton = styled(Button)`
  background-color: #fae100;
  background-image: url(${Icon});
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: 34% 16px;
  padding-left: 30px;
  color: black;

  &:hover {
    background-color: #ffd632;
  }
`;

function Login(props) {
  return (
    <Container>
      <h1>DW 온라인스쿨</h1>
      <AlertDiv>
        <p>회원이 아니신가요?</p>
        <a>회원가입 하기</a>
      </AlertDiv>
      <InputDiv>
        <label>이메일</label>
        <Input placeholder="Email" />
        <label>비밀번호</label>
        <Input type="password" placeholder="Password" />
      </InputDiv>
      <ButtonDiv>
        <Button>로그인 하기</Button>
        <KakaoButton> 카카오 로그인</KakaoButton>
      </ButtonDiv>
    </Container>
  );
}

export default Login;
