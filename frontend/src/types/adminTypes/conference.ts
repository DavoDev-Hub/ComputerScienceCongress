export type Conferencia = {
    id?: number,
    nombre: string,
    ponente: string,
    descripcion: string,
    lugar: string,
    fecha: string,
    horaInicio: string,
    horaFin: string,
}

export type ConferenceCardProps = {
    nombre: string
    fecha: string
    descripcion: string
    lugar: string
    horaInicio: string
    horaFin: string
    ponente: string
    onEdit: () => void
    onDelete: () => void
}
