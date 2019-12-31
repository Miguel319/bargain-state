import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from '../utils/baseUrl';

function Home({ products }) {
  return <ProductList products={products}></ProductList>;
}

Home.getInitialProps = async () => {
  // Fetch data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);

  return { products: response.data };
  // Note this object will be merged with existing props
};

export default Home;
