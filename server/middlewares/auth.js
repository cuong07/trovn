import { StatusCode } from "../config/StatusCode.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res
              .status(StatusCode.UNAUTHORIZED)
              .json({ message: "Token has expired" });
          }
          return res
            .status(StatusCode.UNAUTHORIZED)
            .json({ message: "Invalid token" });
        }
        req.user = user;
        next();
      });
    } else {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "No token provided" });
    }
  } catch (error) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: "No token provided" });
  }
};
