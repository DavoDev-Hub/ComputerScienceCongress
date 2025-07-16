import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const obtenerEstudiantesConAsistencias = async (req: Request, res: Response) => {
    try {
        const estudiantes = await prisma.alumno.findMany({
            include: {
                asistencias: {
                    include: {
                        conferencia: true,
                        actividad: true,
                    },
                },
            },
        })

        const resultado = estudiantes.map((est) => {
            const conferencias = est.asistencias
                .filter(a => a.conferencia !== null)
                .map(a => a.conferencia)

            const actividades = est.asistencias
                .filter(a => a.actividad !== null)
                .map(a => a.actividad)

            return {
                id: est.id,
                nombre: est.nombre,
                email: est.correo,
                matricula: est.id,
                semestre: est.semestre,
                conferenciasAsistidas: conferencias,
                actividadesAsistidas: actividades,
                totalAsistencias: conferencias.length + actividades.length,
            }
        })

        res.json(resultado)
    } catch (error) {
        console.error("Error al obtener estudiantes:", error)
        res.status(500).json({ error: "Error al obtener estudiantes" })
    }
}


