import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export function DialogConfirmDelete({ onConfirm, trigger }) {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: trigger }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "\u00BFEliminar actividad?" }) }), _jsx("p", { className: "text-sm text-gray-500", children: "Esta acci\u00F3n no se puede deshacer. Se eliminar\u00E1 permanentemente la actividad y sus datos relacionados." }), _jsxs(DialogFooter, { className: "gap-2 pt-4", children: [_jsx(DialogClose, { children: _jsx(Button, { variant: "outline", children: "Cancelar" }) }), _jsx(Button, { className: "bg-red-600 text-white hover:bg-red-700", onClick: onConfirm, children: "Confirmar" })] })] })] }));
}
