import axios from "axios"
import { Actividad } from "@/types/adminTypes/activity"
const API_BASE = "http://localhost:3000/admin"

export const getActividades = async (): Promise<Actividad[]> => {
    const res = await axios.get(`${API_BASE}/actividades`)
    return res.data
}

export async function crearActividad(data: Actividad) {
    const res = await axios.post(`${API_BASE}/actividades`, data)
    return res.data
}

export async function eliminarActividad(id: string) {
    const res = await fetch(`${API_BASE}/actividades/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Error al eliminar la actividad")
}

export async function editarActividad(id: string, data: Actividad) {
    const res = await axios.put(`${API_BASE}/actividades/${id}`, data)
    return res.data
}




