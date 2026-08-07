import { Router } from "express";
import brokerController from "./controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/", brokerController.store);

router.use(authMiddleware);

router.get("/", brokerController.index);
router.get("/:id", brokerController.show);


export default router;