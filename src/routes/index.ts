import { Router } from "express";
import { authRoutes } from "../modules/auth/index.js";
import { brokerRoutes } from "../modules/broker/index.js";
import { formRoutes } from "../modules/form/index.js";
import { distributionRoutes } from "../modules/distribution/index.js";
import { leadRoutes } from "../modules/lead/index.js";

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