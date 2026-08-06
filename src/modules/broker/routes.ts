import { Router } from "express";
import brokerController from "./controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", brokerController.index);
router.get("/:id", brokerController.show);
router.post("/", brokerController.store);
router.put("/:id", brokerController.update);
router.delete("/:id", brokerController.destroy);

export default router;