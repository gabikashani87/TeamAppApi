import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const addUser = async (userData: UserData) => {
  const createdUser = new User(userData);

  let result = await createdUser.save();
  return result;
};

const registerUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: `user already exist` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let userData: UserData = req.body;
    userData.password = hashedPassword;
    return res.status(200).json({ message: await addUser(userData) });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `Invalid Cradentials` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Cradentials` });
    }

    const token = jwt.sign(user.id, "somesecret");
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const authUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user).select("-password");
    if (!user) {
      return res.status(400).json({ errors: { msg: "No User Found" } });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

const userController = {
  authUser,
  registerUser,
  loginUser,
};

export default userController;

// module.exports.authUser = authUser;
// module.exports.registerUser =registerUser;
// module.exports.loginUser =loginUser;
