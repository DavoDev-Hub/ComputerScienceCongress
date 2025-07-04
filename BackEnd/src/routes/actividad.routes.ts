import { Router } from "express";
import {
    getActividades,
    getActividadById,
    postActividad,
    putActividad,
    deleteActividad
} from "../controllers/actividad.controller";

const router = Router();

router.get("/", getActividades);
router.get("/:id", getActividadById);
router.post("/", postActividad);
router.put("/:id", putActividad);
router.delete("/:id", deleteActividad);

export default router;

