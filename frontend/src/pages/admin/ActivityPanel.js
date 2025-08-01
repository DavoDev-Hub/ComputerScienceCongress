import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getActividades, eliminarActividad } from "@/services/adminServices/apiActivity";
import { ActivityCard } from "@/components/adminComponents/cards/ActivityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModalCrearActividad } from "@/components/adminComponents/modals/modalActivityAdd";
import { toast } from "sonner";
function ActivityPanel() {
    const [actividades, setActividades] = useState([]);
    const [editingActividad, setEditingActividad] = useState(null);
    const fetchActividades = async () => {
        const data = await getActividades();
        setActividades(data);
    };
    useEffect(() => {
        fetchActividades();
    }, []);
    const filteredActividades = (tipo) => actividades.filter((actividad) => tipo === "all" || actividad.tipo === tipo);
    const handleDelete = async (id) => {
        try {
            await eliminarActividad(id.toString());
            toast.success("Actividad eliminada exitosamente");
            setActividades((prev) => prev.filter((act) => act.id !== id));
        }
        catch (error) {
            toast.error("Error al eliminar la actividad");
        }
    };
    return (_jsxs("div", { className: "min-h-screen overflow-x-hidden space-y-6 px-4 sm:px-6 mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900", children: "Panel de administraci\u00F3n de actividades" }), _jsx("p", { className: "text-gray-600", children: "Gestiona todas las actividades del congreso" })] }), _jsx(ModalCrearActividad, { onSuccess: fetchActividades })] }), _jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-4", children: [_jsx(TabsTrigger, { value: "all", children: "Todas" }), _jsx(TabsTrigger, { value: "academico", children: "Acad\u00E9micas" }), _jsx(TabsTrigger, { value: "recreativo", children: "Recreativas" })] }), ["all", "academico", "recreativo"].map((tipo) => (_jsx(TabsContent, { value: tipo, children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredActividades(tipo).map((actividad) => (_jsx(ActivityCard, { nombre: actividad.nombre, descripcion: actividad.descripcion, fecha: actividad.fecha, lugar: actividad.lugar, horaInicio: actividad.horaInicio, horaFin: actividad.horaFin, cupo: actividad.cupo, tipo: actividad.tipo, onEdit: () => setEditingActividad(actividad), onDelete: () => handleDelete(actividad.id) }, actividad.id))) }) }, tipo)))] }), editingActividad && (_jsx(ModalCrearActividad, { onSuccess: () => {
                    fetchActividades();
                    setEditingActividad(null);
                }, initialData: editingActividad }))] }));
}
export default ActivityPanel;
