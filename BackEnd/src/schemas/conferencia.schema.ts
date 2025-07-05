import { z } from 'zod'

export const conferenciaSchema = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(5),
    imagen: z.string(),
    horaInicio: z.string(),
    horaFin: z.string(),
}); 
