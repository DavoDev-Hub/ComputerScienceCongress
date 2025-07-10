import React from 'react'

type ActivityCardProps = {
    nombre: string
    horaInicio: string
    horaFin: string
    inscritos: number
    cupo: number
    tipo: 'conferencia' | 'actividad'
    onEdit: () => void
    onDelete: () => void
    onView: () => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    nombre,
    horaInicio,
    horaFin,
    inscritos,
    cupo,
    tipo,
    onEdit,
    onDelete,
    onView
}) => {
    const icon = tipo === 'conferencia' ? '📘' : '🎮'

    return (
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
            <div className="flex items-center gap-3">
                <div className="text-xl">{icon}</div>
                <div>
                    <h3 className="font-semibold">{nombre}</h3>
                    <p className="text-sm text-gray-500">
                        {horaInicio} - {horaFin} · {inscritos}/{cupo} inscritos
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

