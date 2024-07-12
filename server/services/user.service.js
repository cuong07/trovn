import bcrypt from "bcrypt";
import fs from "fs";

import UserModel from "../models/user.model.js";
import { generateRefreshToken, generateToken } from "../utils/tokenUtils.js";
import { sendMail } from "../utils/mailer.utils.js";
import { otpGenerator } from "../utils/otp.utils.js";
import UserOtpModel from "../models/user.otp.config.js";
import { otpTemplate } from "../utils/otp.template.utils.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { uploader } from "../utils/uploader.js";
import { analyzeImage } from "../core/analyze.image.js";
import { bannedTemplate } from "../utils/banned.template.js";
import { deleteImage } from "../config/cloundinary.js";

const UserService = {
    async getUserById(userId) {
        try {
            return await UserModel.methods.getUserById(userId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getUserByEmail(email) {
        try {
            return await UserModel.methods.getUserByEmail(email);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async login(email, password) {
        try {
            console.log(password);
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
            return { token, refreshToken };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async createUser(userData) {
        try {
            console.log(userData?.password);
            const hashedPassword = await bcrypt.hash(userData?.password, 8);
            const newUser = {
                ...userData,
                password: hashedPassword,
            };
            const user = await UserModel.methods.createUser(newUser);

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async updateUser(userId, updatedData) {
        try {
            return await UserModel.methods.updateUser(userId, updatedData);
        } catch (error) {
            console.log(error);
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
            console.log("AVATAR: ", JSON.stringify(validImage));
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
            console.log(error);
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
            console.log(error);
            throw error;
        }
    },

    async deleteUser(userId) {
        try {
            return await UserModel.methods.deleteUser(userId);
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            throw error;
        }
    },

    async getUserDetailsFromToken(token) {
        if (!token) {
            return {
                message: "session out",
                logout: true,
            };
        }
        const user = await verifyToken(token);
        return await UserModel.methods.getUserById(user.id);
    },

    async getUserByGoogleAccountId(id) {
        try {
            return UserModel.methods.getUserByGoogleAccountId(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getUserDetailsFromToken(token) {
        if (!token) {
            return {
                message: "session out",
                logout: true,
            };
        }
        const user = await verifyToken(token);
        return await UserModel.methods.getUserById(user.id);
    },

    async getAllUsers() {
        // Thêm phương thức này
        try {
            return await UserModel.methods.getAllUsers();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default UserService;
