import { Router } from "express";
import formController from "./controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.get("/slug/:slug", formController.showBySlug);

router.use(authMiddleware);

router.get("/", formController.index);
router.get("/:id", formController.show);
router.post("/", formController.store);
router.put("/:id", formController.update);
router.delete("/:id", formController.destroy);

export default router;