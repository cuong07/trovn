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
                select: {
                    id: true,
                    username: true,
                    email: true,
                    phoneNumber: true,
                    description: true,
                    address: true,
                    avatarUrl: true,
                    role: true,
                    isPremium: true,
                    createdAt: true,
                    fullName: true,
                    updatedAt: true,
                    googleAccountId: true,
                    isVerify: true,
                    latitude: true,
                    longitude: true,
                    isLooked: true,
                    violationCount: true,
                },
            });
        },

        async getUserByGoogleAccountId(id) {
            return await db.user.findFirst({
                where: {
                    googleAccountId: id,
                },
                select: {
                    id: true,
                    username: true,
                    description: true,
                    email: true,
                    phoneNumber: true,
                    address: true,
                    avatarUrl: true,
                    role: true,
                    googleAccountId: true,
                    isPremium: true,
                    createdAt: true,
                    updatedAt: true,
                    fullName: true,
                    isVerify: true,
                    latitude: true,
                    longitude: true,
                    isLooked: true,
                    violationCount: true,
                },
            });
        },

        async getUserByEmail(email) {
            const user = await db.user.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { username: email },
                        { phoneNumber: email },
                    ],
                },
            });
            return user;
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

        async updateVerify(userId) {
            return await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    isVerify: true,
                },
            });
        },

        async findManyUserByDate(startOfDay, endOfDay) {
            return await db.user.count({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });
        },

        async getAllUsers() {
            return await db.user.findMany();
        },
    },
};

export default User;
