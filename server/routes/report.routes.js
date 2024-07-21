import express from "express";
import ReportController from "../controllers/report.controller.js";
import {
    verifyTokenAllRole,
    verifyTokenWithAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/reports", verifyTokenAllRole, ReportController.create);
router.get("/reports", ReportController.findAll);

router.put(
    "/reports/accept/:id",
    verifyTokenWithAdmin,
    ReportController.accept
);
router.put(
    "/reports/refuse/:id",
    verifyTokenWithAdmin,
    ReportController.refuse
);

router.put("/reports/:id", verifyTokenWithAdmin, ReportController.update);
router.delete("/reports/:id", verifyTokenWithAdmin, ReportController.delete);

export default router;
