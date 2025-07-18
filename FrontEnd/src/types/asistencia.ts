export interface Asistencia {
    id: number
    id_alumno: number
    id_actividad?: number
    id_conferencia?: number
    fecha_asistencia: string
}

export interface Attendance {
    id: number;
    student: {
        name: string;
        matricula: string;
        email: string;
    };
    activity: {
        title: string;
        type: "academic" | "recreational";
        time: string;
    };
    timestamp: string;
    status: "success" | "pending";
}
