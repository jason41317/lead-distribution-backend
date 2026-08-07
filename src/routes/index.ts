import { Router } from "express";
import { authRoutes } from "../modules/auth";
import { brokerRoutes } from "../modules/broker";
import { formRoutes } from "../modules/form";
import { distributionRoutes } from "../modules/distribution";
import { leadRoutes } from "../modules/lead";

const router = Router();

router.use("/auth", authRoutes);
router.use("/brokers", brokerRoutes);
router.use("/forms", formRoutes);
router.use("/distributions", distributionRoutes);

router.use("/leads", leadRoutes);


// router.get("/me", authMiddleware, (req, res) => {
//     res.json({
//         user: req.user,
//     });
// });

export default router;