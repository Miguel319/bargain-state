import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    const passswordsMatch = await bcrypt.compare(password, user.password);

    noUserErr(user, res, passswordsMatch);

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token: token
    });
  } catch (e) {
    console.log(e);
    serverErr(res);
  }
};

const generateToken = user => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  console.log(token);

  return token;
};

const noUserErr = (user, res, passswordsMatch) => {
  const sameMessage = "Unable to login. Please check your credentials.";

  if (!user) {
    return res.status(404).send({
      success: false,
      message: sameMessage
    });
  }

  if (!passswordsMatch) {
    return res.status(401).send({
      success: false,
      message: sameMessage
    });
  }
};

const serverErr = res => {
  return res.status(500).send({
    success: false,
    message: "Unable to login. Please try again."
  });
};
