import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "../utils/tokenUtils.js";
import { sendMail } from "../utils/mailer.utils.js";
import { otpGenerator } from "../utils/otp.utils.js";
import UserOtpModel from "../models/user.otp.config.js";
import { otpTemplate } from "../utils/otp.template.utils.js";

const UserService = {
  async getUserById(userId) {
    try {
      return await UserModel.methods.getUserById(userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const existingUser = await UserModel.methods.getUserByEmail(email);
      if (!existingUser) {
        return Error("Không tìm thấy người dùng có email: ", email);
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return Error("Mật khẩu không chính xác");
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

  async verifyEmail(email) {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async sendEmailVerify(user) {
    try {
      const otp = otpGenerator(6);
      const { email, id } = user;
      const template = otpTemplate(email, id);
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
};

export default UserService;
