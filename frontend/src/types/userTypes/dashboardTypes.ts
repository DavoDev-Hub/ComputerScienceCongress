export interface Activity {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    lugar?: string;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
    cupo: number;
}

export interface Conference {
    id: number;
    nombre: string;
    ponente?: string;
    descripcion: string;
    lugar?: string;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
}

