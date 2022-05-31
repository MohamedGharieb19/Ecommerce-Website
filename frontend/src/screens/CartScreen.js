import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import {
  addToCart,
  checkout,
  removeFromCart,
} from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    dispatch(
      checkout(
        cartItems.map((item) => item.product),
        currentUser._id,
        history
      )
    );
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/home">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
