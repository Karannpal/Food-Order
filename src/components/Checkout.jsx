import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Input from "./Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";

const Checkout = () => {
  const cartCtx = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.enteries);
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>

        <p className="flex justify-end gap-4">
          <Button type="button" onClick={handleClose} textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
