export type Actividad = {
    id?: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    lugar: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    cupo: number;
};

export type ActivityCardProps = {
    nombre: string
    fecha: string
    descripcion: string
    lugar: string
    horaInicio: string
    horaFin: string
    cupo: number
    tipo: 'academico' | 'recreativo'
    onEdit: () => void
    onDelete: () => void
}
