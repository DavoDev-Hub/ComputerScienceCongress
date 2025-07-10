import React from 'react'

type ActivityCardProps = {
    nombre: string
    fecha: string
    horaInicio: string
    horaFin: string
    cupo: number
    tipo: 'academico' | 'recreativo'
    onEdit: () => void
    onDelete: () => void
    onView: () => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    nombre,
    fecha,
    horaInicio,
    horaFin,
    cupo,
    tipo,
    onEdit,
    onDelete,
    onView
}) => {

    const icon = tipo === 'academico' ? '📘' : '🎮'

    const formattedDate = new Date(fecha).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })

    const formattedHoraInicio = new Date(horaInicio).toLocaleTimeString("es-MX", {
        hour: '2-digit',
        minute: '2-digit'
    })

    const formattedHoraFin = new Date(horaFin).toLocaleTimeString("es-MX", {
        hour: '2-digit',
        minute: '2-digit'
    })


    return (
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
            <div className="flex items-center gap-3">
                <div className="text-xl">{icon}</div>
                <div>
                    <h3 className="font-semibold">{nombre}</h3>
                    <p className="text-sm text-gray-500">
                        {formattedDate} | {formattedHoraInicio} - {formattedHoraFin} | "0"/{cupo} inscritos
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={onEdit} className="btn">Editar</button>
                <button onClick={onView} className="btn">Ver Asistentes</button>
                <button onClick={onDelete} className="btn bg-red-500 text-white">Eliminar</button>
            </div>
        </div>
    )
}

