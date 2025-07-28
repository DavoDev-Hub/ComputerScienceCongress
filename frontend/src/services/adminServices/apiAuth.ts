import axios from "axios"
const API_BASE = "http://localhost:3000/admin"


export const loginAdmin = async (correo: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_BASE}/admin/login`, { correo, password },
            { withCredentials: true }
        )

        return response.data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error || "Credenciales inválidas")
        }
        throw new Error("Error al conectar con el servidor")
    }
}

