import jwt from "jsonwebtoken";
import { BaseResponse } from "../responses/BaseResponse.js";
import { statusCode } from "../config/statusCode.js";

const errorMessage = {
    EXPIRED_TOKEN: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại",
    UNAUTHORIZED_ACCESS: "Không có quyền truy cập",
    PLEASE_LOGIN: "Vui lòng đăng nhập để truy cập",
};

export const verifyToken = (authorization) => {
    try {
        return new Promise((resolve, reject) => {
            if (authorization) {
                const accessToken = authorization.split(" ")[1];
                jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                });
            } else {
                reject(new Error("Authorization header is missing"));
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const verifyTokenAllRole = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const user = await verifyToken(authorization);
        if (user.isLooked) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(
                    BaseResponse.error(
                        "Tài khoản của bạn đã bị vô hiệu hóa",
                        null
                    )
                );
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(BaseResponse.error(errorMessage.EXPIRED_TOKEN, null));
        }
        return res
            .status(statusCode.UNAUTHORIZED)
            .json(BaseResponse.error(errorMessage.UNAUTHORIZED_ACCESS, null));
    }
};

export const verifyTokenWithAdmin = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const user = await verifyToken(authorization);
        if (user.role === "ADMIN") {
            req.user = user;
            next();
        } else {
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(
                    BaseResponse.error(errorMessage.UNAUTHORIZED_ACCESS, null)
                );
        }
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(BaseResponse.error(errorMessage.EXPIRED_TOKEN, null));
        }
        return res
            .status(statusCode.UNAUTHORIZED)
            .json(BaseResponse.error(errorMessage.UNAUTHORIZED_ACCESS, null));
    }
};

export const verifyTokenWithUserPremium = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const user = await verifyToken(authorization);
        if (user.isLooked) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(
                    BaseResponse.error(
                        "Tài khoản của bạn đã bị vô hiệu hóa",
                        null
                    )
                );
        }
        if (user.isPremium) {
            req.user = user;
            next();
        } else {
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(
                    BaseResponse.error(errorMessage.UNAUTHORIZED_ACCESS, null)
                );
        }
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(BaseResponse.error(errorMessage.EXPIRED_TOKEN, null));
        }
        return res
            .status(statusCode.UNAUTHORIZED)
            .json(BaseResponse.error(errorMessage.UNAUTHORIZED_ACCESS, null));
    }
};
