import React from 'react'




type ActivityCardProps = {
    nombre: string
    fecha: string
    hora: string
    inscritos: number
    cupo: number
    tipo: 'academico' | 'recreativo'
    onEdit: () => void
    onDelete: () => void
    onView: () => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    nombre,
    fecha,
    hora,
    inscritos,
    cupo,
    tipo,
    onEdit,
    onDelete,
    onView
}) => {
    const icon = tipo === 'academico' ? '📘' : '🎮'

    return (
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
            <div className="flex items-center gap-3">
                <div className="text-xl">{icon}</div>
                <div>
                    <h3 className="font-semibold">{nombre}</h3>
                    <p className="text-sm text-gray-500">
                        {fecha} - {hora} · {inscritos}/{cupo} inscritos
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

