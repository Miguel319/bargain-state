import React from "react";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import catchErrors from "../../utils/catchErrors";

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timeout;
    
    if (success) timeout = setTimeout(() => setSuccess(false), 3000);

    return () => clearTimeout(timeout);
  }, [success]);

  const mngState = event => setQuantity(Number(event.target.value));

  const addProduct = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (e) {
      catchErrors(e.message, window.alert);
    } finally {
      setLoading(false);
    }
  };

  const redirectToSignup = () => router.push("/signup");

  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      value={quantity}
      onChange={mngState}
      action={
        user && success
          ? {
              color: "blue",
              content: "Item added",
              icon: "plus cart",
              disabled: true
            }
          : user
          ? {
              color: "violet",
              content: "Add to cart",
              loading,
              disabled: loading,
              icon: "plus cart",
              onClick: addProduct
            }
          : {
              color: "blue",
              content: "Signu up to purchase",
              icon: "signup",
              onclick: redirectToSignup
            }
      }
    />
  );
}

export default AddProductToCart;
