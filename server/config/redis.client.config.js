import { createClient } from "redis";
import { logger } from "./winston.js";

let redisClient;

if (process.env.USE_REDIS_CACHE === "true") {
    redisClient = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    redisClient.on("connect", () => {
        logger.info("Connected Redis Successfully");
    });

    redisClient.on("error", (err) => {
        logger.error("Redis error:", err);
    });

    redisClient.connect().catch(console.error);
} else {
    logger.info("Redis caching is disabled.");
}

export default redisClient;
