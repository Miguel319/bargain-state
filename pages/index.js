import React from "react";
import axios from "axios";

function Home({ products }) {
  console.log(products);

 
  return <>home</>;
}

Home.getInitialProps = async () => {
  // Fetch data on server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);

  return { products: response.data };
  // Note this object will be merged with existing props
};

export default Home;
