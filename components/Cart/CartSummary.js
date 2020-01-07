import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

function CartSummary({ products, checkout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);

    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);

    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <b>Sub total:</b> ${cartAmount}
        <StripeCheckout
          name="Bargain State"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          billingAddress={true}
          shippingAddress={true}
          zipCode={true}
          stripeKey="pk_test_6r80iUon4I3qdRQClphjiokE00mo5tJbUU"
          locale={"en"}
          token={checkout}
          triggerEvent="onClick"
        >
          <Button
            disabled={isCartEmpty || success}
            icon="cart"
            color="blue"
            floated="right"
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
