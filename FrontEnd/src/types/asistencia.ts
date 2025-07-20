export interface Asistencia {
    id: number
    id_alumno: number
    id_actividad?: number
    id_conferencia?: number
    fecha_asistencia: string
}

export interface AttendanceRecord {
  id: number
  student: {
    name: string
    matricula: string
    email: string
  }
  activity: {
    title: string
    type: "academic" | "recreational"
  }
  timestamp: string
  status: string
}
