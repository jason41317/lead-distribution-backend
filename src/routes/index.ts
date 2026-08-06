import { Router } from "express";
import { authRoutes } from "../modules/auth";
import { brokerRoutes } from "../modules/broker";
import { formRoutes } from "../modules/form";
import { distributionRoutes } from "../modules/distribution";

const router = Router();

router.use("/auth", authRoutes);
router.use("/brokers", brokerRoutes);
router.use("/forms", formRoutes);
router.use("/distributions", distributionRoutes);


// router.get("/me", authMiddleware, (req, res) => {
//     res.json({
//         user: req.user,
//     });
// });

export default router;