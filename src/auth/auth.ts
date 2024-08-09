import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  //Check if there is a token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token, auth denied" }] });
  }

  //Verfiy token
  const decoded = jwt.verify(token, "somesecret");
  if (!decoded) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Verify failed, auth denied" }] });
  }
  req.body.user = decoded;
  next();
};

export default auth;
