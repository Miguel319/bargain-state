import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "PUT":
      await handlePutReq(req, res);
      break;
    default:
      res.status(405).send("Method not allowed.");
  }
};

const handleGetReq = async (req, res) => {
  if (!("authorization" in req.headers))
    return res.status(401).send("No authorization token");

  try {
    const { userId } = getToken(req);

    const user = await User.findOne({ _id: userId });

    user
      ? res.status(200).json(user)
      : res.status(404).send({
          success: false,
          message: "Unable to find user."
        });
  } catch (e) {
    catchErr(e, res);
  }
};

const handlePutReq = async (req, res) => {
  try {
    const { _id, role } = req.body;
    await User.findOneAndUpdate({ _id }, {role});

    res.status(203).send('User updated successfully!');
  } catch (e) {
    catchErr(e, res);
  }
};


const catchErr = (e, res) => {
    console.error(error);
    res.status(403).send("Invalid token");
}

const getToken = req =>
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET);