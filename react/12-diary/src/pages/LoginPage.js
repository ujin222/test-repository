import React, { useContext } from "react";
import "./LoginPage.css";
import * as Fcicons from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const { auth } = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    navigate("/new", { replace: true });
  };
  return (
    <div className="login_box">
      <button onClick={signInWithGoogle}>
        <Fcicons.FcGoogle />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;
