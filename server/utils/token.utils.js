import jwt from "jsonwebtoken";
import { logger } from "../config/winston.js";

export const generateToken = (user) => {
    try {
        return jwt.sign(
            {
                email: user.email,
                id: user.id,
                role: user.role,
                isPremium: user.isPremium,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                username: user.username,
                latitude: user.latitude,
                longitude: user.longitude,
            },
            process.env.SECRET_KEY,
            { expiresIn: "5m" }
        );
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

export const generateRefreshToken = (user) => {
    try {
        return jwt.sign(
            {
                email: user.email,
                id: user.id,
                role: user.role,
                isPremium: user.isPremium,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                username: user.username,
                latitude: user.latitude,
                longitude: user.longitude,
            },
            process.env.SECRET_REFRESH_TOKEN_KEY,
            { expiresIn: "365d" }
        );
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
