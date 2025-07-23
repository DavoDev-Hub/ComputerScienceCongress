import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteAsistencia } from "@/services/adminServices/apiAsistencia";
import { AlumnoConAsistencias } from "@/types/adminTypes/alumno";

interface Props {
    alumno: AlumnoConAsistencias | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdated?: () => void;
}

export const StudentDetailModal = ({ alumno, isOpen, onClose, onUpdated }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loadingIds, setLoadingIds] = useState<number[]>([]);

    if (!alumno) return null;

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar esta asistencia?")) return;
        setLoadingIds((prev) => [...prev, id]);
        try {
            await deleteAsistencia(id);
            onUpdated?.();
        } catch (error) {
            alert("Error al eliminar la asistencia.");
            console.error(error);
        } finally {
            setLoadingIds((prev) => prev.filter((item) => item !== id));
        }
    };

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

                <div className="flex justify-end mt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? "Cancelar edición" : "Editar asistencias"}
                    </Button>
                </div>

                <ScrollArea className="max-h-96 pr-4 mt-4">
                    <div className="space-y-6">
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
                                <BookOpen size={20} />
                                Conferencias asistidas ({alumno.detalle.conferencias.length})
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-5">
                                {alumno.detalle.conferencias.map((conf) => (
                                    <li key={conf.id} className="flex items-center justify-between">
                                        <span>
                                            {conf.titulo} —{" "}
                                            {new Date(conf.fecha).toLocaleDateString()}
                                        </span>
                                        {isEditing && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                disabled={loadingIds.includes(conf.id!)}
                                                onClick={() => handleDelete(conf.id!)}
                                            >
                                                <Trash2 className="text-red-600" size={18} />
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-700">
                                <Gamepad2 size={20} />
                                Actividades asistidas ({alumno.detalle.actividades.length})
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-5">
                                {alumno.detalle.actividades.map((act) => (
                                    <li key={act.id} className="flex items-center justify-between">
                                        <span>
                                            {act.titulo} —{" "}
                                            {new Date(act.fecha).toLocaleDateString()}
                                        </span>
                                        {isEditing && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                disabled={loadingIds.includes(act.id!)}
                                                onClick={() => handleDelete(act.id!)}
                                            >
                                                <Trash2 className="text-red-600" size={18} />
                                            </Button>
                                        )}
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

export default StudentDetailModal;

