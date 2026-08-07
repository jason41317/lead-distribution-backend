import { Router } from "express";
import distributionController from "./controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", distributionController.index);
router.get("/:id", distributionController.show);
router.post("/", distributionController.store);
router.put("/:id", distributionController.update);
router.delete("/:id", distributionController.destroy);

router.post("/:id/brokers", distributionController.createDistributionBrokers);

export default router;