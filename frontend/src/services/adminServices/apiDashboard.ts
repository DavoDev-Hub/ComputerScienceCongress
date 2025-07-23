import axios from "axios"
import { DashboardData } from "@/types/adminTypes/dashboard"

const API_BASE = "http://localhost:3000/admin"

export const getDashboardData = async (): Promise<DashboardData> => {
    const res = await axios.get(`${API_BASE}/dashboard`)
    return res.data
}

