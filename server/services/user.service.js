import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/TokenUtils.js";

const UserService = {
  async getUserById(userId) {
    try {
      return await UserModel.methods.getUserById(userId);
    } catch (error) {
      throw new Error(`Error while getting user by ID: ${error.message}`);
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
      return { message: "Thành Công", token };
    } catch (error) {
      throw new Error(`Error while creating user: ${error.message}`);
    }
  },

  async updateUser(userId, updatedData) {
    try {
      return await UserModel.methods.updateUser(userId, updatedData);
    } catch (error) {
      throw new Error(`Error while updating user: ${error.message}`);
    }
  },

  async deleteUser(userId) {
    try {
      return await UserModel.methods.deleteUser(userId);
    } catch (error) {
      throw new Error(`Error while deleting user: ${error.message}`);
    }
  },
};

export default UserService;
