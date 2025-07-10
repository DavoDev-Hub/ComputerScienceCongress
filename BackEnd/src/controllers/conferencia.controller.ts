import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { conferenciaSchema } from "../schemas/conferencia.schema";
import { actividadSchema } from "../schemas/actividad.schema";
const prisma = new PrismaClient()

// Get todas las conferencias 

export const getConferencia = (async (req: Request, res: Response) => {
    const conferencias = await prisma.conferencia.findMany();
    res.json(conferencias);
});


export const getConferenciaById = (async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const conferencia = await prisma.conferencia.findUnique({ where: { id } })

    if (!conferencia) {
        return res.status(404).json({ error: 'Conferencia no encontrada' });
    }
    res.json(conferencia);
});


export const postConferencia = (async (req: Request, res: Response) => {
    const result = conferenciaSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(404).json({
            error: "Datos invalidos",
            detalles: result.error.format(),
        });
    }

    try {
        const nueva = await prisma.conferencia.create({
            data: result.data,
        });
    } catch (error) {
        console.error('Error al crear la actividad: ', error);
        res.status(500).json({ error: "Error del servidor" });
    }
});



export const putConferencia = (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = actividadSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Datos Invalidos",
            detalles: result.error.format()
        });
    }

    try {
        const actualizada = await prisma.conferencia.update({
            where: { id },
            data: result.data
        });

        res.json(actualizada);
    } catch (error) {
        res.status(404).json({ error: "La congreso no se encuenta, ingrese otro" })
    }
});


export const deleteConferencia = (async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.conferencia.delete({ where: { id } });
        res.json({ mensaje: "Congreso eliminado correctamente" })
    } catch (error) {
        res.status(400).json({ mensaje: "No se encontro la actividad" })
    }
});

