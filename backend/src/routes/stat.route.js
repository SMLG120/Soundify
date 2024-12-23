import { Router } from "express";

import { requireAdmin } from "../middleware/auth.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;