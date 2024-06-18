import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cron from "node-cron";

import BannerModel from "./models/banner.model.js";
import { app, server } from "./socket/index.js";
import {
  UserRoutes,
  AmenityRoutes,
  ListingRoutes,
  LocationRoutes,
  FavoriteRoutes,
  BannerRoutes,
  TagRoutes,
  ListingTagRoutes,
  AdvertisingPackageRoutes,
  PaymentRoutes,
  OrderRoutes,
  ConversationRoutes,
  AnalyticsRoutes,
  GoogleAuthRoutes,
} from "./routes/index.js";
import "./config/passport.config.js";
import session from "express-session";
import passport from "./config/passport.config.js";
import path from "path";
import { fileURLToPath } from "url";
import redisClient from "./config/redis.client.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8888;

// TODO: server config
app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

// TODO: Routes
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AmenityRoutes);
app.use("/api/v1", ListingRoutes);
app.use("/api/v1", LocationRoutes);
app.use("/api/v1", FavoriteRoutes);
app.use("/api/v1", BannerRoutes);
app.use("/api/v1", TagRoutes);
app.use("/api/v1", ListingTagRoutes);
app.use("/api/v1", AdvertisingPackageRoutes);
app.use("/api/v1", PaymentRoutes);
app.use("/api/v1", OrderRoutes);
app.use("/api/v1", ConversationRoutes);
app.use("/api/v1", AnalyticsRoutes);
app.use("/api/v1", GoogleAuthRoutes);

// TODO: relative path
app.use(express.static("./public"));

// TODO: run update banner 00h00
cron.schedule("0 0 * * *", async () => {
  console.log(
    "Chạy công việc theo lịch trình để cập nhật các banner đã hết hạn."
  );
  await BannerModel.methods.updateExpiredBanners();
});

// TODO: Redis

app.get("*", (req, res) => {
  res.status(404).send("Sorry, resource not found");
});

server.listen(PORT, () => {
  console.log("----------SERVER RUNNING----------");
  console.log(`-> http://localhost:${PORT}`);
});

// redisClient
//   .connect()
//   .then(() => {
//     console.log("----------REDIS CONNECTED----------");
//     console.log("-> SUCCESS");

//     server.listen(PORT, () => {
//       console.log("----------SERVER RUNNING----------");
//       console.log(`-> http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("----------REDIS CONNECT ERROR----------");
//     console.log(error);
//   });
