import { api } from "@/services/axiosInstance";

export interface MyAttendanceDTO {
    id: number;
    id_actividad: number | null;
    id_conferencia: number | null;
    fecha_asistencia: string;
}

export const fetchMyAttendance = async () => {
    const { data } = await api.get<MyAttendanceDTO[]>("/user/asistencias");
    return data;
};

