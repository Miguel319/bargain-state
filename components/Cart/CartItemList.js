import {
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Message
} from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList({ products, user, removeFromCart, success }) {
  const router = useRouter();

  const redirectToProducts = () => router.push("/");
  const redirectToProductDetails = () =>
    router.push(`/product?_id=${p.product._id}`);
  const redirectToLogin = () => router.push("/login");

  const mapCartProductsToItems = products =>
    products.map(p => ({
      childKey: p.product._id,
      header: (
        <Item.Header as="a" onClick={redirectToProductDetails}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x ${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => removeFromCart(p.product._id)}
        ></Button>
      )
    }));

  if (success) {
    return (
      <Message
        success
        header="Success"
        content="Your order has been processed successfully!"
        icon="star outline"
      />
    );
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="blue" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          Your cart is currently empty.
        </Header>

        <div>
          {user ? (
            <Button color="orange" onClick={redirectToProducts}>
              View Products
            </Button>
          ) : (
            <Button onClick={redirectToLogin}>
              Login so you can add products.
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return <Item.Group divided items={mapCartProductsToItems(products)} />;
}

export default CartItemList;
