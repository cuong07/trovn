import { statusCode } from "../config/statusCode.js";
import jwt from "jsonwebtoken";
import { BaseResponse } from "../responses/BaseResponse.js";

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res
              .status(statusCode.UNAUTHORIZED)
              .json(
                BaseResponse.error(
                  "Phiên đăng nhập hêt hạn vui lòng đăng nhaaph lại",
                  null
                )
              );
          }
          return res
            .status(statusCode.UNAUTHORIZED)
            .json(BaseResponse.error("Không có quyền truy cập", null));
        }
        req.user = user;
        next();
      });
    } else {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.error("Vui lòng đăng nhập để truy cập", null));
    }
  } catch (error) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(BaseResponse.error("Vui lòng đăng nhập để truy cập", null));
  }
};

export const verifyTokenWidthAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res
              .status(statusCode.UNAUTHORIZED)
              .json(
                BaseResponse.error(
                  "Phiên đăng nhập hêt hạn vui lòng đăng nhập lại",
                  null
                )
              );
          }
          return res
            .status(statusCode.UNAUTHORIZED)
            .json(BaseResponse.error("Không có quyền truy cập", null));
        }
        if (user.role === "ADMIN") {
          req.user = user;
          next();
          return;
        }
        return res
          .status(statusCode.UNAUTHORIZED)
          .json(BaseResponse.error("Không có quyền truy cập", null));
      });
    }
  } catch (error) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(BaseResponse.error("Vui lòng đăng nhập để truy cập", null));
  }
};
