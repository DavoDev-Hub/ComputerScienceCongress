import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, MapPin } from 'lucide-react';
import { DialogConfirmDelete } from '../dialogs/DialogConfirmDelete';
export const ActivityCard = ({ nombre, fecha, descripcion, lugar, horaInicio, horaFin, cupo, tipo, onEdit, onDelete, }) => {
    const formattedDate = new Date(fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const formattedHoraInicio = new Date(horaInicio).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    });
    const formattedHoraFin = new Date(horaFin).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return (_jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx(Badge, { className: "bg-uaa-blue", children: tipo }), _jsxs("div", { className: "text-right text-sm text-gray-500", children: [_jsx("p", { children: formattedDate }), _jsxs("p", { children: [formattedHoraInicio, " - ", formattedHoraFin] })] })] }), _jsx(CardTitle, { className: "text-lg", children: nombre })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-gray-600 mb-4", children: descripcion }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(MapPin, { className: "h-4 w-4 mr-2" }), lugar] }), _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Users, { className: "h-4 w-4 mr-2" }), "0/", cupo, " inscritos"] }), _jsx(Progress, { value: 50, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between gap-2 mt-4", children: [_jsx(Button, { variant: "outline", onClick: onEdit, children: "Editar" }), _jsx(DialogConfirmDelete, { onConfirm: onDelete, trigger: _jsx(Button, { variant: "destructive", size: "sm", children: "Eliminar" }) })] })] })] }));
};
