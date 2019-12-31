import React from "react";
import axios from "axios";
import ProductList from '../components/Index/ProductList';

function Home({ products }) {
  return <ProductList products={products}></ProductList>
}

Home.getInitialProps = async () => {
  // Fetch data on server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);

  return { products: response.data };
  // Note this object will be merged with existing props
};

export default Home;
