import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "../utils/tokenUtils.js";

const UserService = {
  async getUserById(userId) {
    try {
      return await UserModel.methods.getUserById(userId);
    } catch (error) {
      throw error;
    }
  },

  async login(email, password) {
    try {
      const existingUser = await UserModel.methods.getUserByEmail(email);
      if (!existingUser) {
        throw Error("Không tìm thấy người dùng có email: ", email);
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        throw Error("Mật khẩu không chính xác");
      }
      const token = generateToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);
      return { token, refreshToken };
    } catch (error) {
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
      throw error;
    }
  },

  async updateUser(userId, updatedData) {
    try {
      return await UserModel.methods.updateUser(userId, updatedData);
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      return await UserModel.methods.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
