import Order from "../../models/Order";
import jwt from "jsonwebtoken";
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    const { userId } = getToken(req);

    const orders = await Order.find({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });

    res.status(200).json({ orders } );
  } catch (e) {
    catchErr(e, res);
  }
};

const getToken = req =>
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

const catchErr = (e, res) => {
  console.error(e);
  res.status(403).send("Please login again");
};
