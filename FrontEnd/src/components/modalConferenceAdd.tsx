import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "./ui/select"
import { crearConferencia, editarConferencia } from "../services/apiConference"
import { toast } from "sonner"


interface ModalCrearConferenciaProps {
    onSuccess: () => void
    initialData?: any
}


