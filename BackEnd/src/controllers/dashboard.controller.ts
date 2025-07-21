import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { startOfDay, endOfDay } from 'date-fns'
const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const now = new Date()

        const [totalEstudiantes, totalActividades, asistenciasHoy, qrEscaneadosHoy] = await Promise.all([
            prisma.alumno.count(),
            prisma.actividad.count(),
            prisma.asistencia.count({
                where: {
                    fecha_asistencia: {
                        gte: startOfDay(now),
                        lte: endOfDay(now),
                    },
                },
            }),
            prisma.qr_generado.count({
                where: {
                    fecha_generado: {
                        gte: startOfDay(now),
                        lte: endOfDay(now),
                    },
                    estado: true,
                },
            }),
        ])

        const actividadesActivas = await prisma.actividad.findMany({
            where: {
                fecha: {
                    equals: new Date().toISOString().split("T")[0], // solo las de hoy
                },
            },
            include: {
                inscripcion: true,
            },
        })

        const recentAttendances = await prisma.asistencia.findMany({
            take: 5,
            orderBy: { fecha_asistencia: 'desc' },
            include: {
                alumno: true,
                actividad: true,
                conferencia: true,
            },
        })

        return res.json({
            totalEstudiantes,
            totalActividades,
            asistenciasHoy,
            qrEscaneadosHoy,
            actividadesActivas: actividadesActivas.map((a) => ({
                id: a.id,
                nombre: a.nombre,
                tipo: a.tipo,
                hora: a.horaInicio?.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) ?? '',
                asistentes: a.inscripcion.length,
                cupo: a.cupo,
                estado: new Date() >= a.horaInicio! && new Date() <= a.horaFin! ? 'en_curso' : 'programada',
            })),
            recentAttendances: recentAttendances.map((r) => ({
                id: r.id,
                estudiante: r.alumno.nombre,
                matricula: r.alumno.matricula,
                actividad: r.actividad?.nombre || r.conferencia?.nombre || 'Desconocida',
                tiempo: r.fecha_asistencia.toISOString(),
            })),
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

