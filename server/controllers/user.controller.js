import { statusCode } from "../config/statusCode.js";
import UserService from "../services/user.service.js";

const UserController = {
  async getUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ error: "User not found" });
      }
      return res.status(statusCode.OK).json(user);
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ error: "User not found" });
      }
      return res.status(statusCode.OK).json(user);
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },

  async createUser(req, res) {
    const userData = req.body;
    try {
      const newUser = await UserService.createUser(userData);
      return res.status(statusCode.CREATED).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, updatedData);
      return res.status(statusCode.OK).json(updatedUser);
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      await UserService.deleteUser(userId);
      return res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },
};

export default UserController;
