import { Router } from "express"
import {
    registrarAsistencia,
    getAllAsistencias,
} from "../controllers/asistencia.controller"
const router = Router()

router.post("/", registrarAsistencia)
router.get("/", getAllAsistencias)

export default router

