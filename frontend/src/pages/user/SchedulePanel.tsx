import { useEffect, useMemo, useState } from "react"
import CalendarView, { type ScheduleItem } from "@/components/userComponents/CalendarView"

import { fetchMyEnrollments } from "@/services/userServices/apiActivity"
import { fetchConferences } from "@/services/userServices/apiConference"

import type { ActivityDTO } from "@/types/userTypes/activity"
import type { ConferenceDTO } from "@/types/userTypes/conference"

export default function SchedulePanel() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activities, setActivities] = useState<ActivityDTO[]>([])
    const [conferences, setConferences] = useState<ConferenceDTO[]>([])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                setError(null)
                const [myEnrollments, confs] = await Promise.all([
                    fetchMyEnrollments(),
                    fetchConferences(),
                ])
                setActivities(myEnrollments.map((i) => i.actividad))
                setConferences(confs)
            } catch (e: any) {
                setError(e?.response?.data?.error ?? "Error al cargar el horario")
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const items: ScheduleItem[] = useMemo(() => {
        const actItems: ScheduleItem[] = activities.map((a) => ({
            id: `act-${a.id}`,
            title: a.nombre,
            dateISO: a.fecha ?? "",
            startISO: a.horaInicio ?? undefined,
            endISO: a.horaFin ?? undefined,
            location: a.lugar ?? undefined,
            icon: a.tipo === "academico" ? "BookOpen" : "Gamepad2",
            kind: a.tipo === "academico" ? "academica" : "recreativa",
        }))

        const confItems: ScheduleItem[] = conferences.map((c) => ({
            id: `conf-${c.id}`,
            title: c.nombre,
            dateISO: c.fecha ?? "",
            startISO: c.horaInicio ?? undefined,
            endISO: c.horaFin ?? undefined,
            location: c.lugar ?? undefined,
            icon: "Presentation",
            kind: "conferencia",
        }))

        return [...actItems, ...confItems]
    }, [activities, conferences])

    if (loading) return <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Cargando horario…</div>
    if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

    return <CalendarView items={items} />
}

