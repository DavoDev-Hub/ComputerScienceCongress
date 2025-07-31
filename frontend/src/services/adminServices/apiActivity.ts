import { Actividad } from "@/types/adminTypes/activity"
import { api } from "./axiosInstance"
const API_BASE = `${import.meta.env.VITE_API_URL}/admin`

export const getActividades = async (): Promise<Actividad[]> => {
    const res = await api.get(`${API_BASE}/actividades`)
    return res.data
}

export async function crearActividad(data: Actividad) {
    const res = await api.post(`${API_BASE}/actividades`, data)
    return res.data
}

export async function eliminarActividad(id: string) {
    const res = await fetch(`${API_BASE}/actividades/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Error al eliminar la actividad")
}

export async function editarActividad(id: string, data: Actividad) {
    const res = await api.put(`${API_BASE}/actividades/${id}`, data)
    return res.data
}

