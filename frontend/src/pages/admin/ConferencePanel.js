import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getConferencias, eliminarConferencia } from "@/services/adminServices/apiConference";
import { ConferenceCard } from "@/components/adminComponents/cards/ConferenceCard";
import { ModalCrearConferencia } from "@/components/adminComponents/modals/modalConferenceAdd";
import { toast } from "sonner";
function ConferencePanel() {
    const [conferencias, setConferencias] = useState([]);
    const [editingConferencias, setEditingConferencias] = useState(null);
    const fetchConferencias = async () => {
        const data = await getConferencias();
        setConferencias(data);
    };
    useEffect(() => {
        fetchConferencias();
    }, []);
    const handleDelete = async (id) => {
        try {
            await eliminarConferencia(id);
            toast.success("Conferencia eliminada exitosamente");
            setConferencias((prev) => prev.filter((conf) => conf.id !== Number(id)));
        }
        catch (error) {
            toast.error("Error al eliminar la conferencia");
        }
    };
    return (_jsxs("div", { className: "min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900", children: "Panel de administraci\u00F3n de conferencias" }), _jsx("p", { className: "text-gray-600", children: "Gestiona todas las conferencias del congreso" })] }), _jsx(ModalCrearConferencia, { onSuccess: fetchConferencias })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6", children: conferencias.map((conferencia) => (_jsx(ConferenceCard, { nombre: conferencia.nombre, ponente: conferencia.ponente, descripcion: conferencia.descripcion, fecha: conferencia.fecha, lugar: conferencia.lugar, horaInicio: conferencia.horaInicio, horaFin: conferencia.horaFin, onEdit: () => setEditingConferencias(conferencia), onDelete: () => handleDelete(String(conferencia.id)) }, conferencia.id))) }), editingConferencias && (_jsx(ModalCrearConferencia, { onSuccess: () => {
                    fetchConferencias();
                    setEditingConferencias(null);
                }, initialData: editingConferencias }))] }));
}
export default ConferencePanel;
