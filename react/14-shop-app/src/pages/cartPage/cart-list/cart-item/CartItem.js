import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProduct,
  deleteCartItem,
  deleteFromCart,
  incrementProduct,
} from "../../../../store/cart/cartSlice";

function CartItem({ image, title, category, price, quantity, total, id }) {
  const dispatch = useDispatch();
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);

  const incrementCount = () => {
    dispatch(incrementProduct(id));
  };
  const decrementCount = () => {
    dispatch(decrementProduct(id));
  };

  const deleteProduct = () => {
    if (isAuthenticated) {
      dispatch(
        deleteCartItem({
          collectionName: ["users", uid, "cart"],
          productId: id,
        })
      );
    } else {
      dispatch(deleteFromCart(id));
    }
  };
  return (
    <div className={styles.cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} X {quantity} = $ {total.toFixed(2)}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button onClick={decrementCount}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
