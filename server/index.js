import {
  UserRoutes,
  AmenitieRoutes,
  ListingRoutes,
  LoactionRoutes,
  FavoriteRoutes,
<<<<<<< HEAD
  BannerRoutes,
=======
  TagRoutes,
>>>>>>> 30a7bee0553b4bce1559a4f9634bd70fc062d618
} from "./routes/index.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { otpGenerator } from "./utils/otp.utils.js";

import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/v1", UserRoutes);
app.use("/api/v1", AmenitieRoutes);
app.use("/api/v1", ListingRoutes);
app.use("/api/v1", LoactionRoutes);
app.use("/api/v1", FavoriteRoutes);
app.use("/api/v1", BannerRoutes);
app.use("/api/v1", TagRoutes);



app.get((req, res) => {
  res.status(404).send("Sorry, resource not found");
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
