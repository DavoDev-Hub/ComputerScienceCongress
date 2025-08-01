import { api } from "./axiosInstance";
const API_BASE = `${import.meta.env.VITE_API_URL}/admin`;
export const getDashboardData = async () => {
    const res = await api.get(`${API_BASE}/dashboard`);
    return res.data;
};
