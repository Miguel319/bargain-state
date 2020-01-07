const calculateCartTotal = products => {
  const total = products.reduce((acc, val) => {
    acc += val.product.price * val.quantity;
    return acc;
  }, 0);

  const cartTotal = Number(((total * 100) / 100).toFixed(2));
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
