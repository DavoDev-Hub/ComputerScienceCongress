import { api } from "@/services/axiosInstance"
import type { ConferenceDTO } from "@/types/userTypes/conference"

export const fetchConferences = async () => {
    const { data } = await api.get<ConferenceDTO[]>("/user/conferencias")
    return data
}

