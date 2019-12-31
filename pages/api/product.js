import Product from "../../models/Product";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "DELETE":
      await handleDeleteReq(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

const handleGetReq = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });

  res.status(200).json(product);
};

const handleDeleteReq = async (req, res) => {
    const { _id } = req.query;
    await Product.findOneAndDelete({_id});
    res.status(204)
        .json({});
}