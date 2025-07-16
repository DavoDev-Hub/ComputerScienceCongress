import { Router } from "express"
import {
    registrarAsistencia,
    getAllAsistencias,
    getAsistenciasPorAlumno,
    deleteAsistencia
} from "../controllers/asistencia.controller"
const router = Router()

router.post("/", registrarAsistencia)
router.get("/", getAllAsistencias)
router.get("/alumno/:id", getAsistenciasPorAlumno)
router.delete("/:id", deleteAsistencia)

export default router

