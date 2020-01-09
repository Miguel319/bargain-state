import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "POST":
      await handlePostReq(req, res);
      break;
    case "DELETE":
      await handleDeleteReq(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetReq = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });

  res.status(200).json(product);
};

async function handlePostReq(req, res) {
  console.log(req.body);
  const { name, price, description, mediaUrl } = req.body;

  try {
    if (!name || !price || !description || !mediaUrl)
      return res.status(422).json({
        success: false,
        message: "All fields are required."
      });

    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();

    res.status(201).json({
      sucess: true,
      product: product.data
    });
  } catch (e) {
    catchErr(e, res);
  }
  res.status(201).json(product);
}

const handleDeleteReq = async (req, res) => {
  const { _id } = req.query;
  try {
    await Product.findOneAndDelete({ _id });

    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );

    res.status(204).json({});
  } catch (e) {
    catchErr(e, res);
  }
};

const catchErr = (e, res) => {
  console.error(e);
  return res.status(500).json({
    success: false,
    message: "Unable to process operation. Please try again later."
  });
};
