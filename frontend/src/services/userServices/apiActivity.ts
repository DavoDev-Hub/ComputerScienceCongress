// src/services/user/activityService.ts
import { api } from "@/services/axiosInstance"
import { ActivityDTO, EnrollmentDTO } from "@/types/userTypes/activity"

// GET /user/actividades?tipo=academic|recreational
export const fetchActivities = async (tipo?: "academic" | "recreational") => {
    const url = tipo ? `/user/actividades?tipo=${tipo}` : `/user/actividades`
    const { data } = await api.get<ActivityDTO[]>(url)
    return data
}

// GET /user/actividades/inscripciones
export const fetchMyEnrollments = async () => {
    const { data } = await api.get<EnrollmentDTO[]>(`/user/actividades/inscripciones`)
    return data
}

// POST /user/actividades/inscribirse
export const enrollToActivity = async (id_actividad: number) => {
    const { data } = await api.post(`/user/actividades/inscribirse`, { id_actividad })
    return data
}

