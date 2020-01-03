import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
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
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: "Invalid token"
    });
  }
};

const getToken = req =>
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
