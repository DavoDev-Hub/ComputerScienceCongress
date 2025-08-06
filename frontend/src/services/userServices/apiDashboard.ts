import axios from "axios";
import { Activity, Conference } from "@/types/userTypes/dashboardTypes";
const API_BASE = `${import.meta.env.VITE_API_URL}/user`

export interface DashboardResponse {
    actividades: Activity[];
    conferencias: Conference[];
}

export const getStudentDashboard = async (): Promise<DashboardResponse> => {
    const response = await axios.get("/api/user/dashboard", { withCredentials: true });
    return response.data;
};

