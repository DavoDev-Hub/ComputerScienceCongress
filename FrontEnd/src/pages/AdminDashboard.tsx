// src/pages/AdminDashboard.tsx
import { ActivityCard } from "../components/ActivityCard"
import { useEffect, useState } from "react"
import { getActividades } from "../services/api"
import type { Actividad } from "../types/activity"

export default function AdminDashboard() {
    const [actividades, setActividades] = useState<Actividad[]>([])

    useEffect(() => {
        getActividades().then(setActividades)
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Actividades</h1>
            {actividades.map((actividad) => (
                <ActivityCard
                    key={actividad.id}
                    nombre={actividad.nombre}
                    horaInicio={actividad.horaInicio}
                    horaFin={actividad.horaFin}
                    inscritos={actividad.inscritos ?? 0}
                    cupo={actividad.cupo}
                    tipo="actividad"
                    onEdit={() => console.log("Editar", actividad.id)}
                    onDelete={() => console.log("Eliminar", actividad.id)}
                    onView={() => console.log("Ver asistentes", actividad.id)}
                />
            ))}
        </div>
    )
}

