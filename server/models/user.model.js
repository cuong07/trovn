import { PrismaClient } from "@prisma/client";
import db from "../lib/db.js";

const User = {
  fields: {
    id: {
      type: "String",
      primaryKey: true,
      unique: true,
    },
    username: {
      type: "String",
    },
    email: {
      type: "String",
      unique: true,
    },
    password: {
      type: "String",
    },
    createdAt: {
      type: "DateTime",
      default: () => new Date(),
    },
    updatedAt: {
      type: "DateTime",
      default: () => new Date(),
    },
  },

  methods: {
    async getUserById(userId) {
      return await db.user.findUnique({
        where: { id: userId },
      });
    },
    async createUser(userData) {
      return await db.user.create({
        data: userData,
      });
    },

    async updateUser(userId, updatedData) {
      return await db.user.update({
        where: { id: userId },
        data: updatedData,
      });
    },
    async deleteUser(userId) {
      return await db.user.delete({
        where: { id: userId },
      });
    },
  },
};

export default User;
