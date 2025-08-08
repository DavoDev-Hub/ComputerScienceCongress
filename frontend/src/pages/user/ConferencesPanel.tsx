import { useEffect, useMemo, useState } from "react"
import ConferencesView from "@/components/userComponents/ConferencesView"
import { fetchConferences } from "@/services/userServices/apiConference"
import { mapConferenceToUI, type ConferenceDTO, type ConferenceUI } from "@/types/userTypes/conference"

export default function ConferencesPanel() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [confDTO, setConfDTO] = useState<ConferenceDTO[]>([])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                setError(null)
                const confs = await fetchConferences()
                setConfDTO(confs)
            } catch (e: any) {
                setError(e?.response?.data?.error ?? "Error al cargar conferencias")
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const conferencesUI = useMemo<ConferenceUI[]>(
        () => confDTO.map(mapConferenceToUI),
        [confDTO]
    )

    if (loading) return <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Cargando conferencias…</div>
    if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

    return (
        <ConferencesView
            conferences={conferencesUI}
            title="Conferencias y Congresos"
            subtitle="Inscripción automática al iniciar sesión"
        />
    )
}

