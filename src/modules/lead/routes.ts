import { Router } from "express";
import leadController from "./controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/public", leadController.storePublic);

router.use(authMiddleware);

router.post("/", leadController.store);
router.get("/", leadController.index);
router.get("/:id", leadController.show);


export default router;