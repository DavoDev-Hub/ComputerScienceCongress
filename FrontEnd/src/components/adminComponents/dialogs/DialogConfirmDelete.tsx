import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import React from "react"

interface DialogConfirmDeleteProps {
    onConfirm: () => void
    trigger: React.ReactNode
}

export function DialogConfirmDelete({ onConfirm, trigger }: DialogConfirmDeleteProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>¿Eliminar actividad?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-500">
                    Esta acción no se puede deshacer. Se eliminará permanentemente la actividad y sus datos relacionados.
                </p>
                <DialogFooter className="gap-2 pt-4">
                    <DialogClose>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
