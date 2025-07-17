export interface Alumno {
    id: number
    nombre: string
    correo: string
    matricula: number
    semestre: number
}

export interface DetalleActividad {
    id: number
    titulo: string
    tipo: "conferencia" | "actividad"
    lugar: string
    fecha: string
    hora: string
    ponente?: string
}

export interface AlumnoConAsistencias {
    id: number
    nombre: string
    correo: string
    matricula: number
    semestre: number
    asistenciasConferencias: number
    asistenciasActividades: number
    totalAsistencias: number
    detalle: {
        conferencias: DetalleActividad[]
        actividades: DetalleActividad[]
    }
}

