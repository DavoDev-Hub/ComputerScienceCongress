import { DashboardData } from "@/types/adminTypes/dashboard"
import { api } from "./axiosInstance"
const API_BASE = "http://localhost:3000/admin"

export const getDashboardData = async (): Promise<DashboardData> => {
    const res = await api.get(`${API_BASE}/dashboard`)
    return res.data
}

