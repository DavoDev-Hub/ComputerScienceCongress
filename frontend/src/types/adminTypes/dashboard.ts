export interface DashboardData {
    totalEstudiantes: number
    totalActividades: number
    asistenciasHoy: number
    qrEscaneadosHoy: number
    actividadesActivas: {
        id?: number
        nombre: string
        tipo: string
        fecha: string
        hora: string
        asistentes: number
        cupo: number
        estado: string
    }[]
    recentAttendances: {
        id?: number
        estudiante: string
        matricula: number
        actividad: string
        tiempo: string
    }[]
}
