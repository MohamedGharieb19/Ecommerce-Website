/* eslint-disable react-hooks/exhaustive-deps*/
import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";
import { getCheckout } from "../redux/actions/cartActions";

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { purchased } = useSelector((state) => state.cart);
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(getCheckout(currentUser._id));
  }, []);

  useEffect(() => {
    setItems(purchased?.map((item) => ({ ...item, product: item._id })));
  }, [purchased]);
  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Purchased Items</h2>

          {items?.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/home">Go Back</Link>
            </div>
          ) : (
            items?.map((item) => <CartItem key={item.product} item={item} />)
          )}
        </div>
      </div>
    </>
  );
};

export default ItemsScreen;
