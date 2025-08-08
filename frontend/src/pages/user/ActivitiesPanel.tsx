import { useEffect, useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { ActivitiesView } from "@/components/userComponents/ActivitiesView"
import { fetchActivities, fetchMyEnrollments, enrollToActivity } from "@/services/userServices/apiActivity"
import { ActivityDTO, UIActivity, mapDTOToUI } from "@/types/userTypes/activity"

export default function ActivitiesPage() {
    const [loading, setLoading] = useState(true)
    const [academyDTO, setAcademyDTO] = useState<ActivityDTO[]>([])
    const [recreDTO, setRecreDTO] = useState<ActivityDTO[]>([])
    const [enrollments, setEnrollments] = useState<number[]>([])

    // modal
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selected, setSelected] = useState<UIActivity | null>(null)
    const [submitting, setSubmitting] = useState(false)

    // cargar datos iniciales
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const [acad, recre, my] = await Promise.all([
                    fetchActivities("academic"),
                    fetchActivities("recreational"),
                    fetchMyEnrollments(),
                ])
                setAcademyDTO(acad)
                setRecreDTO(recre)
                setEnrollments(my.map(i => i.actividad.id))
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    // map DTO -> UI
    const academicActivities = useMemo<UIActivity[]>(
        () => academyDTO.map(mapDTOToUI),
        [academyDTO]
    )
    const recreationalActivities = useMemo<UIActivity[]>(
        () => recreDTO.map(mapDTOToUI),
        [recreDTO]
    )

    const isEnrolled = (id: string) => enrollments.includes(Number(id))

    // abrir modal
    const onEnroll = (activity: UIActivity) => {
        setSelected(activity)
        setConfirmOpen(true)
    }

    // confirmar inscripción
    const confirmEnroll = async () => {
        if (!selected) return
        try {
            setSubmitting(true)
            await enrollToActivity(Number(selected.id))
            // refrescar estados (inscripciones y contadores)
            const [my, updatedAcad, updatedRecre] = await Promise.all([
                fetchMyEnrollments(),
                fetchActivities("academic"),
                fetchActivities("recreational"),
            ])
            setEnrollments(my.map(i => i.actividad.id))
            setAcademyDTO(updatedAcad)
            setRecreDTO(updatedRecre)
            setConfirmOpen(false)
            setSelected(null)
        } catch (err: any) {
            // muestra mensaje del backend (409: cupo/ya tiene del tipo/empalme)
            alert(err?.response?.data?.error ?? "No se pudo inscribir")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Cargando actividades…</div>

    return (
        <>
            {/* Tabs tipo “navbar pequeña” como en admin */}
            <Tabs defaultValue="academic" className="space-y-8">
                <TabsList className="mx-auto grid grid-cols-2 w-full max-w-md">
                    <TabsTrigger value="academic">Académicas</TabsTrigger>
                    <TabsTrigger value="recreational">Recreativas</TabsTrigger>
                </TabsList>

                <TabsContent value="academic">
                    <ActivitiesView
                        activities={academicActivities}
                        title="Actividades Académicas"
                        subtitle="Talleres y seminarios para tu desarrollo profesional"
                        onEnroll={onEnroll}
                        isEnrolled={isEnrolled}
                        showEnrollButton
                    />
                </TabsContent>

                <TabsContent value="recreational">
                    <ActivitiesView
                        activities={recreationalActivities}
                        title="Actividades Recreativas"
                        subtitle="Deportes, música y diversión para tu tiempo libre"
                        onEnroll={onEnroll}
                        isEnrolled={isEnrolled}
                        showEnrollButton
                    />
                </TabsContent>
            </Tabs>

            {/* Modal de confirmación */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar inscripción</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <p>
                            Te vas a inscribir a: <b>{selected?.title}</b>
                        </p>
                        <p>
                            <b>Importante:</b> no podrás desinscribirte de esta actividad. Asegúrate de que es la que deseas.
                        </p>
                        <p>Recuerda: solo puedes inscribirte a 1 académica y 1 recreativa.</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={submitting}>
                            Cancelar
                        </Button>
                        <Button onClick={confirmEnroll} disabled={submitting}>
                            {submitting ? "Inscribiendo…" : "Confirmar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

