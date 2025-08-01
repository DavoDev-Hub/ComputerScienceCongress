import axios from "axios";
const API_BASE = `${import.meta.env.VITE_API_URL}/admin`;
export const loginAdmin = async (correo, password) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, { correo, password }, { withCredentials: true });
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || "Credenciales inválidas");
        }
        throw new Error("Error al conectar con el servidor");
    }
};
export const logoutAdmin = async () => {
    return await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
};
export const checkSession = async () => {
    const response = await axios.get(`${API_BASE}/auth/check`, {
        withCredentials: true
    });
    return response.data;
};
