import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className=""
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2 className="text-[18px] font-bold">Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.quantity} x {item.price}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => cartCtx.addItem({ ...item })}>+</button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="flex justify-end gap-4">
        <Button
          onClick={handleCloseCart}
          textOnly
          className={`text-[#1d1a16] hover:text-[#312c1d]`}
        >
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button
            onClick={handleGoToCheckout}
            className={`text-[#1d1a16] hover:text-[#312c1d]`}
          >
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
