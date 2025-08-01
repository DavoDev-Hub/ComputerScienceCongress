import { api } from "./axiosInstance";
const API_BASE = `${import.meta.env.VITE_API_URL}/admin`;
export const getAllAlumnosWithAsistencias = async () => {
    const response = await api.get(`${API_BASE}/asistencias/`);
    return response.data;
};
export const getAsistenciasByAlumnoId = async (id) => {
    const response = await api.get(`${API_BASE}/asistencias/alumno/${id}`);
    return response.data;
};
export const createAsistencia = async (data) => {
    const response = await api.post(`${API_BASE}/asistencias`, data);
    return response.data;
};
export const getRecentAttendance = async () => {
    const response = await api.get(`${API_BASE}/asistencias/recientes`);
    return response.data;
};
export const deleteAsistencia = async (id) => {
    const response = await api.delete(`${API_BASE}/asistencias/${id}`);
    return response.data;
};
