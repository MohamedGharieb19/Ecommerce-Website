import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Product from "../components/Product";
import { getProducts as listProducts } from "../redux/actions/productActions";

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, totalProducts, loading, error } = getProducts;
  const size = 12;

  useEffect(() => {
    dispatch(listProducts(1, size));
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>
      <div style={{ padding: "2rem" }}>
        <MyPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(data) => {
            dispatch(listProducts(data.selected + 1, size));
          }}
          pageRangeDisplayed={5}
          pageCount={parseInt(totalProducts / size) + 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          onClick={(clickEvent) => {
            console.log("onClick", clickEvent);
          }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
