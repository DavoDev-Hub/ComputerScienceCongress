export interface ConferenceDTO {
    id: number
    nombre: string
    ponente?: string | null
    descripcion: string
    lugar?: string | null
    fecha?: string | null
    horaInicio?: string | null
    horaFin?: string | null
}

export interface ConferenceUI {
    id: string
    title: string
    speaker: string
    description: string
    date: string
    time: string
    duration: string
    location: string
    enrolled: true
}

export const mapConferenceToUI = (c: ConferenceDTO): ConferenceUI => {
    const start = c.horaInicio ? new Date(c.horaInicio) : undefined
    const end = c.horaFin ? new Date(c.horaFin) : undefined
    const durationMin = start && end ? Math.max(0, Math.round((+end - +start) / 60000)) : 0

    return {
        id: String(c.id),
        title: c.nombre,
        speaker: c.ponente ?? "Ponente por definir",
        description: c.descripcion,
        date: c.fecha ? new Date(c.fecha).toLocaleDateString() : "Fecha por definir",
        time: start ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
        duration: durationMin ? `${durationMin} min` : "Duración por definir",
        location: c.lugar ?? "Por definir",
        enrolled: true,
    }
}

