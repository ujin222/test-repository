import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

// 유저이미지(버튼) 눌렀을 때 바가 나타나고, 윈도우 누르면 사라지게 하기
function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem("member"));
  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => setIsOpen(false);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleClick}>
        <img src={personImg} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          {!isLogined ? (
            <>
              <li className={styles.disabled}>위시리스트</li>

              <Link to="/login">
                <li>로그인</li>
              </Link>
              <Link to="/join">
                <li>회원가입</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/wishlist">
                <li>위시리스트</li>
              </Link>
              <Link to="/logout">
                <li>로그아웃</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
