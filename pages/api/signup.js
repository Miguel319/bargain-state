import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { username, email, password } = req.body;

  try {
    usernameLengthErr(username, res);

    const userByUsername = await User.findOne({ username });
    usernameTaken(res, userByUsername);

    const userByEmail = await User.findOne({ email });
    emailTaken(res, userByEmail);

    pswrdLengthErr(password, res);

    const newUser = await new User({
      username,
      email,
      password
    }).save();

    const token = createToken(newUser);

    console.log(token);

    res.status(201).json({
      success: true,
      token
    });
  } catch (e) {
    console.log(e);
    return serverErr(res);
  }
};

const usernameTaken = (res, user) => {
  if (user) {
    return res.status(422).send({
      success: false,
      message: "There's a user with this username already registered."
    });
  }
};

const emailTaken = (res, user) => {
  if (user) {
    return res.status(422).send({
      success: false,
      message: "There's a user with this email already registered."
    });
  }
};

const pswrdLengthErr = (password, res) => {
  if (password.length < 4) {
    return res.status(422).send({
      success: true,
      message: "The password must have at least 4 characters."
    });
  }
};

const usernameLengthErr = (username, res) => {
  if (username.length < 4) {
    return res.status(422).send({
      success: false,
      message: "The username must have at least 4 characters."
    });
  }
};

const serverErr = res => {
  return res.status(500).send({
    success: false,
    message: "Unable to signup. Please try again."
  });
};

const createToken = newUser => {
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  return token;
};
