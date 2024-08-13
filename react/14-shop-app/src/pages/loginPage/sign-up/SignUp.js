import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { asyncCart, getUserAuth, joinUser } from "../../../api/firebase";
import { setUser } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   console.log(userCredential);
      const { user } = userCredential;
      // localStorage 에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
      console.log(cartItems);

      await joinUser(user.uid, user.email);
      await asyncCart(user.uid, cartItems);
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <Form
      title={"회원가입"}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignUp;
