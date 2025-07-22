import axios from "axios"
import type { Conferencia } from "../types/conference"
const API_BASE = "http://localhost:3000/admin"


export const getConferencias = async (): Promise<Conferencia[]> => {
    const res = await axios.get(`${API_BASE}/conferencias`)
    return res.data
}

export async function crearConferencia(data: Conferencia) {
    const res = await axios.post(`${API_BASE}/conferencias`, data)
    return res.data
}

export async function eliminarConferencia(id: string) {
    const res = await fetch(`${API_BASE}/conferencias/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Error al eliminar la conferencia")
}

export async function editarConferencia(id: string, data: Conferencia) {
    const res = await axios.put(`${API_BASE}/conferencias/${id}`, data)
    return res.data
}

