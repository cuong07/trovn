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
} from "./routes/index.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cron from "node-cron";
import BannerModel from "./models/banner.model.js";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: "*", credentials: 'http://localhost:5173',  }));
app.use(cors());

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

app.use(express.static("./public"));

app.get((req, res) => {
  res.status(404).send("Sorry, resource not found");
});

cron.schedule("0 0 * * *", async () => {
  console.log("Chạy công việc đã lên lịch để cập nhật các banner đã hết hạn.");
  await BannerModel.methods.updateExpiredBanners();
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
