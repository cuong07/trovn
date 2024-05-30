import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "../utils/tokenUtils.js";
import { sendMail } from "../utils/mailer.utils.js";
import { otpGenerator } from "../utils/otp.utils.js";
import UserOtpModel from "../models/user.otp.config.js";
import { otpTemplate } from "../utils/otp.template.utils.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const UserService = {
  async getUserById(userId) {
    try {
      return await UserModel.methods.getUserById(userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getUserByGoogleAccountId(id) {
    try {
      return await UserModel.methods.getUserByGoogleAccountId(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const existingUser = await UserModel.methods.getUserByEmail(email);
      if (!existingUser) {
        throw new Error("Không tìm thấy người dùng có email: ", email);
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
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
    console.log(userData);
    try {
      const hashedPassword = await bcrypt.hash(userData?.password, 8);
      const newUser = {
        ...userData,
        password: hashedPassword,
      };
      const user = await UserModel.methods.createUser(newUser);
      const token = generateToken(user);
      return token;
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
};

export default UserService;
