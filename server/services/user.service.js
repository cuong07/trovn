import UserModel from "../models/user.model.js";

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
      return await UserModel.methods.createUser(userData);
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
