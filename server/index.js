import {
  UserRoutes,
  AmenityRoutes,
  ListingRoutes,
  LocationRoutes,
  FavoriteRoutes,
  BannerRoutes,
  TagRoutes,
  ListingTagRoutes,
} from "./routes/index.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/v1", UserRoutes);
app.use("/api/v1", AmenityRoutes);
app.use("/api/v1", ListingRoutes);
app.use("/api/v1", LocationRoutes);
app.use("/api/v1", FavoriteRoutes);
app.use("/api/v1", BannerRoutes);
app.use("/api/v1", TagRoutes);
app.use("/api/v1", ListingTagRoutes);

app.get((req, res) => {
  res.status(404).send("Sorry, resource not found");
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
