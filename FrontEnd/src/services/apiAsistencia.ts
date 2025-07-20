import axios from "axios"
import type { Asistencia } from "../types/asistencia"
const API_URL = "http://localhost:3000/api"

export const getAllAlumnosWithAsistencias = async () => {
    const response = await axios.get(`${API_URL}/asistencias/`)
    return response.data
}

export const getAsistenciasByAlumnoId = async (id: number) => {
    const response = await axios.get(`${API_URL}/asistencias/alumno/${id}`)
    return response.data
}

export const createAsistencia = async (data: Asistencia) => {
    const response = await axios.post(`${API_URL}/asistencias`, data)
    return response.data
}

export const getRecentAttendance = async () => {
    const response = await axios.get(`${API_URL}/asistencias/recientes`)
    return response.data
}


export const deleteAsistencia = async (id: number) => {
    const response = await axios.delete(`${API_URL}/asistencias/${id}`)
    return response.data
}
