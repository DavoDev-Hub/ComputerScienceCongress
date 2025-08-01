const API_BASE = `${import.meta.env.VITE_API_URL}/admin`;
import { api } from "./axiosInstance";
export const getConferencias = async () => {
    const res = await api.get(`${API_BASE}/conferencias`);
    return res.data;
};
export async function crearConferencia(data) {
    const res = await api.post(`${API_BASE}/conferencias`, data);
    return res.data;
}
export async function eliminarConferencia(id) {
    const res = await fetch(`${API_BASE}/conferencias/${id}`, {
        method: "DELETE",
    });
    if (!res.ok)
        throw new Error("Error al eliminar la conferencia");
}
export async function editarConferencia(id, data) {
    const res = await api.put(`${API_BASE}/conferencias/${id}`, data);
    return res.data;
}
