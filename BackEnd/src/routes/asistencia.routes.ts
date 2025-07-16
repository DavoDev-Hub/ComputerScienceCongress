// src/routes/estudiantes.routes.ts
import { Router } from "express"
import { obtenerEstudiantesConAsistencias } from "../controllers/asistencia.controller"
const router = Router()

router.get("/asistencias", obtenerEstudiantesConAsistencias);

export default router

