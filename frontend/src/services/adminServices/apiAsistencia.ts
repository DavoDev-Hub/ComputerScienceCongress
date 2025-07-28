import { Asistencia } from "@/types/adminTypes/asistencia"
const API_URL = "http://localhost:3000/admin"
import { api } from "./axiosInstance"

export const getAllAlumnosWithAsistencias = async () => {
    const response = await api.get(`${API_URL}/asistencias/`)
    return response.data
}

export const getAsistenciasByAlumnoId = async (id: number) => {
    const response = await api.get(`${API_URL}/asistencias/alumno/${id}`)
    return response.data
}

export const createAsistencia = async (data: Asistencia) => {
    const response = await api.post(`${API_URL}/asistencias`, data)
    return response.data
}

export const getRecentAttendance = async () => {
    const response = await api.get(`${API_URL}/asistencias/recientes`)
    return response.data
}


export const deleteAsistencia = async (id: number) => {
    const response = await api.delete(`${API_URL}/asistencias/${id}`)
    return response.data
}
