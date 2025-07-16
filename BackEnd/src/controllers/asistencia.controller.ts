import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { asistenciaSchema } from "../schemas/asistencia.schema";
const prisma = new PrismaClient()

export const registrarAsistencia = async (req: Request, res: Response) => {
    try {
        const parsed = asistenciaSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: parsed.error.format(),
            })
        }

        const nuevaAsistencia = await prisma.asistencia.create({
            data: parsed.data,
        })

        return res.status(201).json(nuevaAsistencia)
    } catch (error) {
        console.error("Error al registrar asistencia:", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const getAllAsistencias = async (req: Request, res: Response) => {
    try {
        const asistencias = await prisma.asistencia.findMany({
            include: {
                alumno: {
                    select: {
                        id: true,
                        nombre: true,
                        matricula: true,
                    },
                },
                actividad: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                conferencia: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
            },
        })

        const asistenciasConTipo = asistencias.map((a) => ({
            id: a.id,
            alumno: a.alumno,
            fecha_asistencia: a.fecha_asistencia,
            tipo: a.actividad ? "actividad" : "conferencia",
            nombre: a.actividad?.nombre || a.conferencia?.nombre,
        }))

        return res.status(200).json(asistenciasConTipo)
    } catch (error) {
        console.error("Error al obtener asistencias:", error)
        return res.status(500).json({ error: "Error al obtener asistencias" })
    }
}



