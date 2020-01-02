import { Header, Segment, Button, Icon } from "semantic-ui-react";

function CartItemList() {
  const user = false;

  return (
    <Segment secondary color="blue" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        Your cart is currently empty.
      </Header>

      <div>
        {user ? (
          <Button color="orange">View Products</Button>
        ) : (
          <Button>Login so you can add products.</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;
