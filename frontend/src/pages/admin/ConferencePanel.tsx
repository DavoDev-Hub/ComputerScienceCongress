import { useState, useEffect } from "react"
import type { Conferencia } from "@/types/adminTypes/conference"
import { getConferencias, eliminarConferencia } from "@/services/adminServices/apiConference"
import { ConferenceCard } from "@/components/adminComponents/cards/ConferenceCard"
import { ModalCrearConferencia } from "@/components/adminComponents/modals/modalConferenceAdd"
import { toast } from "sonner"

function ConferencePanel() {
    const [conferencias, setConferencias] = useState<Conferencia[]>([])
    const [editingConferencias, setEditingConferencias] = useState<Conferencia | null>(null)

    const fetchConferencias = async () => {
        const data = await getConferencias()
        setConferencias(data)
    }

    useEffect(() => {
        fetchConferencias()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await eliminarConferencia(id)
            toast.success("Conferencia eliminada exitosamente")
            setConferencias((prev) => prev.filter((conf) => conf.id !== Number(id)))

        } catch (error) {
            toast.error("Error al eliminar la conferencia")
        }
    }


    return (
        <div className="min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Panel de administración de conferencias</h2>
                    <p className="text-gray-600">Gestiona todas las conferencias del congreso</p>
                </div>
                <ModalCrearConferencia onSuccess={fetchConferencias} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {conferencias.map((conferencia) => (
                    <ConferenceCard
                        key={conferencia.id}
                        nombre={conferencia.nombre}
                        ponente={conferencia.ponente}
                        descripcion={conferencia.descripcion}
                        fecha={conferencia.fecha}
                        lugar={conferencia.lugar}
                        horaInicio={conferencia.horaInicio}
                        horaFin={conferencia.horaFin}
                        onEdit={() => setEditingConferencias(conferencia)}
                        onDelete={() => handleDelete(String(conferencia.id))}
                    />
                ))}
            </div>

            {editingConferencias && (
                <ModalCrearConferencia
                    onSuccess={() => {
                        fetchConferencias()
                        setEditingConferencias(null)
                    }}
                    initialData={editingConferencias}
                />
            )}
        </div >
    )
}


export default ConferencePanel

