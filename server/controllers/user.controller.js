import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import UserService from "../services/user.service.js";

const UserController = {
  async getUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res
          .status(statusCode.NOT_FOUND)
          .json(BaseResponse.error("Không tìm thấy người dùng", null));
      }
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", user));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const { token, refreshToken } = await UserService.login(email, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        scure: true,
        path: "/",
        sameSite: "strict",
      });

      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", token));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res
          .status(statusCode.NOT_FOUND)
          .json(BaseResponse.error("Không tìm thấy người dùng", null));
      }
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", user));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async createUser(req, res) {
    const userData = req.body;
    console.log(req.body);
    try {
      const newUser = await UserService.createUser(userData);
      return res
        .status(statusCode.CREATED)
        .json(BaseResponse.success("Thành công", newUser));
    } catch (error) {
      console.log(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, updatedData);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", updatedUser));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
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
        .json(BaseResponse.error(error.message, error));
    }
  },

  async getUserOtp(req, res) {
    const { user } = req;
    try {
      await UserService.sendEmailVerify(user);
      return res
        .status(statusCode.OK)
        .json(BaseResponse.success("Thành công", null));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
  
  async verifyEmail(req, res) {
    const { otp, email } = req.body;
    try {
      if ((email, otp)) {
        await UserService.verifyEmail(email, otp);
        return res
          .status(statusCode.OK)
          .json(BaseResponse.success("Thành công", null));
      }
      return res
        .status(statusCode.BAD_REQUEST)
        .json(BaseResponse.success("Vui lòng đăng nhập và nhập otp", null));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(BaseResponse.error(error.message, error));
    }
  },
};

export default UserController;
