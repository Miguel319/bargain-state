import { Buttom, Segment, Divider, Button } from "semantic-ui-react";

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <b>Sub total:</b> $0.00
        <Button icon="cart" color="blue" floated="right" content="Checkout" />
      </Segment>
    </>
  );
}

export default CartSummary;
