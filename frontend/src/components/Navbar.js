import React, { useState } from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/actions/productActions";
import { signOut } from "../redux/actions/authActions";

const Navbar = ({ click }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const [searchString, setSearchString] = useState("");
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleSignOut = () => {
    dispatch(signOut(history));
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>
          <Link to="/home" style={{ textTransform: "none" }}>
            MERN Shopping Cart
          </Link>
        </h2>
      </div>

      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button
            type="submit"
            className="searchButton"
            onClick={() => {
              dispatch(searchProducts(searchString));
              history.push("/search");
            }}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <ul className="navbar__links">
        {currentUser !== null ? (
          <>
            <li onClick={handleSignOut}>
              <Link to="/">Sign out</Link>
            </li>
            <li>
              <Link to="/purchased" className="cart__link">
                <i className="fas fa-shopping-cart"></i>
                <span>Purchased</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart__link">
                <i className="fas fa-shopping-cart"></i>
                <span>
                  Cart <span className="cartlogo__badge">{getCartCount()}</span>
                </span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/home">Shop</Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
