// src/services/api.ts
import axios from "axios"
import type { Actividad } from "../types/activity"

const API_BASE = "http://localhost:3000/api"

export const getActividades = async (): Promise<Actividad[]> => {
    const res = await axios.get(`${API_BASE}/actividades`)
    return res.data
}

