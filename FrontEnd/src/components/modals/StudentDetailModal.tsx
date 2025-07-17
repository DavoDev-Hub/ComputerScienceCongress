import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { BookOpen, Gamepad2 } from "lucide-react";

import type { AlumnoConAsistencias } from "../../types/alumno";

interface Props {
    alumno: AlumnoConAsistencias | null;
    isOpen: boolean;
    onClose: () => void;
}

export const StudentDetailModal = ({ alumno, isOpen, onClose }: Props) => {
    if (!alumno) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Asistencias de {alumno.nombre}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Matrícula: {alumno.matricula} | Semestre: {alumno.semestre}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-96 pr-4">
                    <div className="space-y-6">
                        {/* Conferencias */}
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
                                <BookOpen size={20} />
                                Conferencias asistidas ({alumno.detalle.conferencias.length})
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-5">
                                {alumno.detalle.conferencias.map((conf) => (
                                    <li key={conf.id}>
                                        {conf.titulo} — {new Date(conf.fecha).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actividades */}
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-700">
                                <Gamepad2 size={20} />
                                Actividades asistidas ({alumno.detalle.actividades.length})
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-5">
                                {alumno.detalle.actividades.map((act) => (
                                    <li key={act.id}>
                                        {act.titulo} — {new Date(act.fecha).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
export default StudentDetailModal
