import bcrypt from "bcrypt";
import fs from "fs";

import UserModel from "../models/user.model.js";
import { generateRefreshToken, generateToken } from "../utils/token.utils.js";
import { sendMail } from "../utils/mailer.utils.js";
import { otpGenerator } from "../utils/otp.utils.js";
import UserOtpModel from "../models/user.otp.config.js";
import { otpTemplate } from "../utils/otp.template.utils.js";
import {
    verifyRefreshToken,
    verifyToken,
} from "../middlewares/auth.middleware.js";
import { uploader } from "../utils/uploader.js";
import { analyzeImage } from "../core/analyze.image.js";
import { bannedTemplate } from "../utils/banned.template.js";
import { deleteImage } from "../config/cloundinary.js";
import { logger } from "../config/winston.js";

let refreshTokens = [];

const UserService = {
    async getUserById(userId) {
        try {
            return await UserModel.methods.getUserById(userId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getUserByEmail(email) {
        try {
            return await UserModel.methods.getUserByEmail(email);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async login(email, password) {
        try {
            const existingUser = await UserModel.methods.getUserByEmail(email);

            if (!existingUser) {
                throw new Error("Không tìm thấy người dùng có email: ", email);
            }
            if (existingUser.isLooked) {
                throw new Error("Tài khoản của bạn đã bị vô hiệu hóa");
            }
            const isMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isMatch) {
                throw new Error("Mật khẩu không chính xác");
            }

            const token = generateToken(existingUser);
            const refreshToken = generateRefreshToken(existingUser);
            refreshTokens.push(refreshToken);
            return { token, refreshToken };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async createUser(userData) {
        try {
            logger.info("Password: ", userData?.password);
            const hashedPassword = await bcrypt.hash(userData?.password, 8);
            const newUser = {
                ...userData,
                password: hashedPassword,
            };
            const user = await UserModel.methods.createUser(newUser);

            return user;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updateUser(userId, updatedData) {
        try {
            return await UserModel.methods.updateUser(userId, updatedData);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updateUserAvatar(userId, file) {
        try {
            const { path } = file;
            const newPath = await uploader(path);
            fs.unlinkSync(path);
            if (!newPath) {
                return new Error("Image error");
            }
            const user = await UserModel.methods.getUserById(userId);

            const validImage = await analyzeImage(newPath?.url);
            logger.info("AVATAR: ", JSON.stringify(validImage));

            if (validImage?.isAdultContent) {
                await deleteImage(newPath.url);
                await this.checkBanned(userId);
                throw new Error("Hình ảnh chứa nội dung phản cảm");
            }
            if (validImage?.isRacyContent) {
                await deleteImage(newPath.url);
                await this.checkBanned(userId);
                throw new Error("Hình ảnh chứa nội dung không phù hợp");
            }

            await deleteImage(user.avatarUrl);

            return await UserModel.methods.updateUser(userId, {
                avatarUrl: newPath?.url,
            });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async checkBanned(userId) {
        try {
            let subject = "";
            const user = await UserModel.methods.getUserById(userId);
            if (!user) {
                throw new Error("Không tìm thấy người dùng");
            }
            if (user.violationCount >= 3) {
                subject = "Tài khoản của bạn đã bị vô hiệu hóa";
                await UserModel.methods.updateUser(user.id, { isLooked: true });
            } else {
                subject = "Cảnh báo hành vi";
                await UserModel.methods.updateUser(user.id, {
                    violationCount: user.violationCount + 1,
                });
            }
            let template = bannedTemplate(user.email);
            sendMail(user.email, subject, template);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteUser(userId) {
        try {
            return await UserModel.methods.deleteUser(userId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async verifyEmail(email, otp) {
        try {
            const userOtp = await UserOtpModel.methods.getUserOtpByEmailAndOtp(
                email,
                otp
            );
            if (userOtp) {
                await UserModel.methods.updateUser(userOtp.userId, {
                    isVerify: true,
                });

                await UserOtpModel.methods.updateUserOtp(userOtp.id, {
                    isActive: false,
                });

                return;
            }
            throw new Error("Otp không chính xác vui lòng nhập lại");
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async sendEmailVerify(user) {
        try {
            const otp = otpGenerator(6);
            const { email, id } = user;
            const template = otpTemplate(email, otp);
            let subject = "Xác minh mã OTP";
            const newUserOpt = {
                userId: id,
                otp,
            };
            await UserOtpModel.methods.createUserOtp(newUserOpt);
            sendMail(email, subject, template);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async changePassword(id, password) {
        try {
            const user = await UserModel.methods.getUserById(id);
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = {
                ...user,
                password: hashedPassword,
            };
            const update = await UserModel.methods.updateUser(id, newUser);
            const token = generateToken(update);
            return token;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getUserDetailsFromToken(token) {
        try {
            if (!token) {
                return {
                    message: "session out",
                    logout: true,
                };
            }
            const user = await verifyToken(token);
            return await UserModel.methods.getUserById(user.id);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                logger.warning("Token has expired");
            } else {
                logger.error("Token verification failed:", error.message);
            }
        }
    },

    async getUserByGoogleAccountId(id) {
        try {
            return UserModel.methods.getUserByGoogleAccountId(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async getUserDetailsFromToken(token) {
        try {
            if (!token) {
                return {
                    message: "session out",
                    logout: true,
                };
            }
            const user = await verifyToken(token);
            return await UserModel.methods.getUserById(user.id);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                logger.error("Token has expired");
                // Add logic to refresh token or prompt user to log in again
            } else {
                logger.error("Token verification failed:", error.message);
                // Handle other errors
            }
        }
    },

    async getAllUsers() {
        try {
            return await UserModel.methods.getAllUsers();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async refreshToken(token) {
        try {
            logger.info("Refresh service");
            logger.info("token: ", token);
            if (!token) return new Error("Bạn chưa được xác thực");
            if (!refreshTokens.includes(token))
                return new Error("Token không hợp lệ");

            const user = await verifyRefreshToken(token);
            const existingUser = await this.getUserById(user.id);
            refreshTokens = refreshTokens.filter((tk) => tk !== token);
            const newToken = generateToken(existingUser);
            const newRefreshToken = generateRefreshToken(existingUser);
            refreshTokens.push(newRefreshToken);
            return { newToken, newRefreshToken };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default UserService;
