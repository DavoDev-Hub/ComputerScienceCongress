import { Asistencia } from "@/types/adminTypes/asistencia"
import { api } from "./axiosInstance"
const API_BASE = `${import.meta.env.VITE_API_URL}`

export const getAllAlumnosWithAsistencias = async () => {
    const response = await api.get(`${API_BASE}/asistencias/`)
    return response.data
}

export const getAsistenciasByAlumnoId = async (id: number) => {
    const response = await api.get(`${API_BASE}/asistencias/alumno/${id}`)
    return response.data
}

export const createAsistencia = async (data: Asistencia) => {
    const response = await api.post(`${API_BASE}/asistencias`, data)
    return response.data
}

export const getRecentAttendance = async () => {
    const response = await api.get(`${API_BASE}/asistencias/recientes`)
    return response.data
}


export const deleteAsistencia = async (id: number) => {
    const response = await api.delete(`${API_BASE}/asistencias/${id}`)
    return response.data
}
