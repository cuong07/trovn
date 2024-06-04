import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const { token } = req.user;
        res.redirect(`http://localhost:5173/?token=${token}`);
    }
);

export default router;
