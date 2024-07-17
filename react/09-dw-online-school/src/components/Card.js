import React from "react";
import cn from "classnames";
import styles from "./Card.module.css";

function Card({ className, children }) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}

export default Card;
