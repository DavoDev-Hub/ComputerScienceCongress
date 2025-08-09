import { api } from "@/services/axiosInstance"

export interface QrResponse {
    id_qr: number
    fecha_generado: string
    fecha_expiracion: string
    estado: boolean
    qrPayload: string
}

export const getQRActividad = async (id_actividad: number) => {
    const { data } = await api.get<QrResponse>(`/user/qr/actividad/${id_actividad}`)
    return data
}

export const generarQRActividad = async (id_actividad: number) => {
    const { data } = await api.post<QrResponse>(`/user/qr/actividad/${id_actividad}/generar`)
    return data
}

export const getQRConferencia = async (id_conferencia: number) => {
    const { data } = await api.get<QrResponse>(`/user/qr/conferencia/${id_conferencia}`)
    return data
}

export const generarQRConferencia = async (id_conferencia: number) => {
    const { data } = await api.post<QrResponse>(`/user/qr/conferencia/${id_conferencia}/generar`)
    return data
}

