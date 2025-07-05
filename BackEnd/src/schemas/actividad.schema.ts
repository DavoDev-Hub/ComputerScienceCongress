import { z } from "zod";

export const actividadSchema = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(5),
    tipo: z.enum(["academico", "recreativo"]),
    imagen: z.string(),
    horaInicio: z.string(),
    horaFin: z.string(),
    cupo: z.number().int().min(1),
});

