import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteAsistencia } from "@/services/adminServices/apiAsistencia";
export const StudentDetailModal = ({ alumno, isOpen, onClose, onUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loadingIds, setLoadingIds] = useState([]);
    if (!alumno)
        return null;
    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta asistencia?"))
            return;
        setLoadingIds((prev) => [...prev, id]);
        try {
            await deleteAsistencia(id);
            onUpdated?.();
        }
        catch (error) {
            alert("Error al eliminar la asistencia.");
            console.error(error);
        }
        finally {
            setLoadingIds((prev) => prev.filter((item) => item !== id));
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-2xl", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-xl", children: ["Asistencias de ", alumno.nombre] }), _jsxs(DialogDescription, { className: "text-sm text-gray-500", children: ["Matr\u00EDcula: ", alumno.matricula, " | Semestre: ", alumno.semestre] })] }), _jsx("div", { className: "flex justify-end mt-2", children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsEditing((prev) => !prev), children: isEditing ? "Cancelar edición" : "Editar asistencias" }) }), _jsx(ScrollArea, { className: "max-h-96 pr-4 mt-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-semibold text-blue-700", children: [_jsx(BookOpen, { size: 20 }), "Conferencias asistidas (", alumno.detalle.conferencias.length, ")"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-gray-700 ml-5", children: alumno.detalle.conferencias.map((conf) => (_jsxs("li", { className: "flex items-center justify-between", children: [_jsxs("span", { children: [conf.titulo, " \u2014", " ", new Date(conf.fecha).toLocaleDateString()] }), isEditing && (_jsx(Button, { size: "icon", variant: "ghost", disabled: loadingIds.includes(conf.id), onClick: () => handleDelete(conf.id), children: _jsx(Trash2, { className: "text-red-600", size: 18 }) }))] }, conf.id))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-semibold text-pink-700", children: [_jsx(Gamepad2, { size: 20 }), "Actividades asistidas (", alumno.detalle.actividades.length, ")"] }), _jsx("ul", { className: "list-disc list-inside text-sm text-gray-700 ml-5", children: alumno.detalle.actividades.map((act) => (_jsxs("li", { className: "flex items-center justify-between", children: [_jsxs("span", { children: [act.titulo, " \u2014", " ", new Date(act.fecha).toLocaleDateString()] }), isEditing && (_jsx(Button, { size: "icon", variant: "ghost", disabled: loadingIds.includes(act.id), onClick: () => handleDelete(act.id), children: _jsx(Trash2, { className: "text-red-600", size: 18 }) }))] }, act.id))) })] })] }) })] }) }));
};
export default StudentDetailModal;
