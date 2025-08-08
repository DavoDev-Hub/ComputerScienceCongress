export interface ActivityDTO {
    id: number
    nombre: string
    descripcion: string
    tipo: "academico" | "recreativo" | string
    lugar?: string | null
    fecha?: string | null
    horaInicio?: string | null
    horaFin?: string | null
    cupo: number
    inscritos: number
}

export interface EnrollmentDTO {
    id_inscripcion: number
    fecha_inscripcion: string
    actividad: ActivityDTO
}

export interface UIActivity {
    id: string
    title: string
    icon: string
    category: string
    description: string
    date: string
    time: string
    duration: string
    location: string
    instructor: string
    enrolled: number
    capacity: number
}

export const mapDTOToUI = (a: ActivityDTO): UIActivity => {
    const start = a.horaInicio ? new Date(a.horaInicio) : undefined
    const end = a.horaFin ? new Date(a.horaFin) : undefined
    const durationMin = start && end ? Math.max(0, Math.round((+end - +start) / 60000)) : 0

    return {
        id: String(a.id),
        title: a.nombre,
        icon: a.tipo === "academico" ? "BookOpen" : "Gamepad2",
        category: a.tipo === "academico" ? "Académica" : "Recreativa",
        description: a.descripcion,
        date: a.fecha ? new Date(a.fecha).toLocaleDateString() : "Fecha por definir",
        time: start ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
        duration: durationMin ? `${durationMin} min` : "Duración por definir",
        location: a.lugar ?? "Por definir",
        instructor: "UAA",
        enrolled: a.inscritos ?? 0,
        capacity: a.cupo ?? 0,
    }
}

