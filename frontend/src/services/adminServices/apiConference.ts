import { Conferencia } from "@/types/adminTypes/conference"
const API_BASE = "http://localhost:3000/admin"
import { api } from "./axiosInstance"

export const getConferencias = async (): Promise<Conferencia[]> => {
    const res = await api.get(`${API_BASE}/conferencias`)
    return res.data
}

export async function crearConferencia(data: Conferencia) {
    const res = await api.post(`${API_BASE}/conferencias`, data)
    return res.data
}

export async function eliminarConferencia(id: string) {
    const res = await fetch(`${API_BASE}/conferencias/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Error al eliminar la conferencia")
}

export async function editarConferencia(id: string, data: Conferencia) {
    const res = await api.put(`${API_BASE}/conferencias/${id}`, data)
    return res.data
}

