// src/routes/actividad.routes.ts
import { Router } from "express";
import { getActividades, getActividadById } from "../controllers/actividad.controller";

const router = Router();

router.get("/", getActividades);
router.get("/:id", getActividadById);

export default router;

