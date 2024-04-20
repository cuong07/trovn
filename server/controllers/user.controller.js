import UserService from "../services/user.service.js";

const UserController = {
  async getUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async createUser(req, res) {
    const userData = req.body;
    try {
      const newUser = await UserService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, updatedData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      await UserService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default UserController;
