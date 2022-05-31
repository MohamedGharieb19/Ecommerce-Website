import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

const API = "http://127.0.0.1:8000/inventory";
const ACCOUNTS_API = "http://127.0.0.1:8000/accounts";

export const checkout = (purchased, _id, history) => async (dispatch) => {
  try {
    // eslint-disable-next-line
    const { data } = await axios.post(`${ACCOUNTS_API}/addItems`, {
      purchased,
      _id,
    });
    dispatch({
      type: actionTypes.REMOVE_ALL_CART,
    });
    localStorage.setItem("cart", JSON.stringify([]));
    history.push("/purchased");
  } catch (err) {
    console.log(err);
  }
};

export const getCheckout = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${ACCOUNTS_API}/getItems`, {
      _id,
    });
    const res = await axios.post(`${API}/api/products/getByIds`, {
      ids: data.items,
    });
    dispatch({
      type: actionTypes.SET_PURCHASED,
      payload: { items: res.data.products },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API}/api/products/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: 1,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
