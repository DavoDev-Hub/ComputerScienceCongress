import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { alumnoSchema } from "../schemas/alumno.schema";
import { actividadSchema } from "../schemas/actividad.schema";
const prisma = new PrismaClient();

export const getAlumnos = async (req: Request, res: Response) => {
    const alumnos = await prisma.alumno.findMany()
    res.json(alumnos)
}

export const getAlumnosById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const alumno = await prisma.alumno.findUnique({ where: { id } })

    if (!alumno) {
        return res.status(404).json({ error: ' Alumno no encontrado ' })
    }
    res.json(alumno)
}

export const postAlumnos = async (req: Request, res: Response) => {
    const result = alumnoSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Datos invalidos",
            detalles: result.error.format(),
        })
    }
}
