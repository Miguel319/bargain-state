import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import React from "react";
import cookie from 'js-cookie';
import catchErrors from "../utils/catchErrors";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = React.useState(products);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const removeFromCart = async (productId) => {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };

    const response = await axios.delete(url, payload);

    setCartProducts(response.data);

  };

  const checkout = async (paymentData) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get('token');
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      const reponse = await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (e) {
      catchErrors(e, window.alert);
    } finally {
      setLoading(false);
    }

  };
  
  return (
    <Segment loading={loading}>
      <CartItemList
        removeFromCart={removeFromCart}
        user={user}
        products={cartProducts}
        success={success}
      />
      <CartSummary
        success={success}
        products={cartProducts}
        checkout={checkout}
      />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);

  if (!token) return { products: [] };

  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);

  return { products: response.data };
};

export default Cart;
