import { api } from "@/services/axiosInstance"
import { ActivityDTO, EnrollmentDTO } from "@/types/userTypes/activity"
const API_BASE = `${import.meta.env.VITE_API_URL}/user`


// GET /user/activities?tipo=academic|recreational
export const fetchActivities = async (tipo?: "academic" | "recreational") => {
    const url = tipo ? `${API_BASE}activities?tipo=${tipo}` : `/user/actividad`
    const { data } = await api.get<ActivityDTO[]>(url)
    return data
}

// GET /user/enrollments
export const fetchMyEnrollments = async () => {
    const { data } = await api.get<EnrollmentDTO[]>(`/user/enrollments`)
    return data
}

// POST /user/activities/enroll
export const enrollToActivity = async (id_actividad: number) => {
    const { data } = await api.post(`/user/activities/enroll`, { id_actividad })
    return data
}

