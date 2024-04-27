import {
  UserRoutes,
  AmenitieRoutes,
  ListingRoutes,
  LoactionRoutes,
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
app.use("/api/v1", AmenitieRoutes);
app.use("/api/v1", ListingRoutes);
app.use("/api/v1", LoactionRoutes);

app.get((req, res) => {
  res.status(404).send("Sorry, resource not found");
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
