import { z } from "zod"

export const alumnoSchema = z.object({
    nombre: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    correo: z
        .string()
        .email("Debe ser un correo institucional válido")
        .regex(/@edu\.uaa\.mx$/, "El correo debe ser institucional"),
    matricula: z
        .string()
        .min(6, "La matrícula debe tener al menos 6 caracteres"),
    semestre: z
        .number({
            invalid_type_error: "El semestre debe ser un número",
        })
        .int("El semestre debe ser un número entero")
        .min(1, "El semestre debe ser mínimo 1")
        .max(12, "El semestre no puede ser mayor a 12"),
})

