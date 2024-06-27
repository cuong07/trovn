import { createClient } from "redis";

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
    console.log("Connected to Redis...");
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redisClient.connect().catch(console.error);
} else {
  console.log("Redis caching is disabled.");
}

export default redisClient;
