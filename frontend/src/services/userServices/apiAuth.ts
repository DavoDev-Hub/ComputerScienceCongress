import axios from "axios"

const API_BASE = `${import.meta.env.VITE_API_URL}/user/auth`
import { RegisterUserData } from "@/types/userTypes/authTypes"

export const loginUser = async (correo: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_BASE}/login`,
            { correo, password },
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


export const registerUser = async (data: RegisterUserData) => {
    try {
        const response = await axios.post(`${API_BASE}/register`, data, {
            withCredentials: true
        })
        return response.data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error || "Error en el registro")
        }
        throw new Error("Error al conectar con el servidor")
    }
}

