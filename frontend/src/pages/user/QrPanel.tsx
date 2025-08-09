import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar, Clock, QrCode } from "lucide-react"

import { fetchMyEnrollments } from "@/services/userServices/apiActivity"
import { fetchConferences } from "@/services/userServices/apiConference"
import {
    getQRActividad, generarQRActividad,
    getQRConferencia, generarQRConferencia,
    type QrResponse
} from "@/services/userServices/apiQR"

import type { ConferenceDTO } from "@/types/userTypes/conference"
import { useQRCode } from "@/hooks/useQRCode"

type ItemKind = "actividad" | "conferencia"

interface QRItem {
    kind: ItemKind
    id: number
    title: string
    date?: string | null
    start?: string | null
    location?: string | null
    qr?: QrResponse | null
}

export default function QRPanel() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [items, setItems] = useState<QRItem[]>([])

    const [open, setOpen] = useState(false)
    const [activeQR, setActiveQR] = useState<{ title: string, dataURL: string } | null>(null)
    const [generating, setGenerating] = useState(false)

    const { toDataURL } = useQRCode()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                setError(null)

                const [ins, confs] = await Promise.all([
                    fetchMyEnrollments(),  // [{ actividad }]
                    fetchConferences(),    // ConferenceDTO[]
                ])

                const acts: QRItem[] = ins.map(({ actividad }) => ({
                    kind: "actividad",
                    id: actividad.id,
                    title: actividad.nombre,
                    date: actividad.fecha ?? null,
                    start: actividad.horaInicio ?? null,
                    location: actividad.lugar ?? null,
                    qr: null,
                }))

                const cf: QRItem[] = confs.map((c: ConferenceDTO) => ({
                    kind: "conferencia",
                    id: c.id,
                    title: c.nombre,
                    date: c.fecha ?? null,
                    start: c.horaInicio ?? null,
                    location: c.lugar ?? null,
                    qr: null,
                }))

                const withQR = await Promise.all(
                    [...acts, ...cf].map(async (it) => {
                        try {
                            const qr = it.kind === "actividad"
                                ? await getQRActividad(it.id)
                                : await getQRConferencia(it.id)
                            return { ...it, qr }
                        } catch {
                            return it
                        }
                    })
                )

                setItems(withQR)
            } catch (e: any) {
                setError(e?.response?.data?.error ?? "Error al cargar mis QR")
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const sorted = useMemo(() => {
        return [...items].sort((a, b) => {
            const da = a.date ? new Date(a.date).getTime() : 0
            const db = b.date ? new Date(b.date).getTime() : 0
            return da - db
        })
    }, [items])

    const formatDate = (iso?: string | null) =>
        iso ? new Date(iso).toLocaleDateString() : "Fecha por definir"

    const formatTime = (iso?: string | null) =>
        iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"

    const isExpired = (qr?: QrResponse | null) =>
        !qr ? true : new Date(qr.fecha_expiracion) <= new Date()

    const openQRModal = async (title: string, payload: string) => {
        const dataURL = await toDataURL(payload)
        setActiveQR({ title, dataURL })
        setOpen(true)
    }

    const handleShow = async (it: QRItem) => {
        if (!it.qr || isExpired(it.qr)) return
        await openQRModal(it.title, it.qr.qrPayload)
    }

    const handleGenerate = async (it: QRItem) => {
        try {
            setGenerating(true)
            const qr = it.kind === "actividad"
                ? await generarQRActividad(it.id)
                : await generarQRConferencia(it.id)

            setItems((prev) =>
                prev.map((x) => (x.kind === it.kind && x.id === it.id ? { ...x, qr } : x))
            )

            await openQRModal(it.title, qr.qrPayload)
        } catch (e: any) {
            alert(e?.response?.data?.error ?? "No se pudo generar el QR")
        } finally {
            setGenerating(false)
        }
    }

    if (loading) return <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Cargando mis QR…</div>
    if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

    return (
        <>
            <div className="text-center space-y-1 mb-6">
                <h2 className="text-3xl font-bold text-[#002E5D] dark:text-gray-100">Mis Códigos QR</h2>
                <p className="text-gray-600 dark:text-gray-400">Genera y muestra tus QR para registrar asistencia</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((it) => {
                    const expired = isExpired(it.qr)
                    const statusText = expired ? "Expirado" : "Activo"
                    return (
                        <Card key={`${it.kind}-${it.id}`} className="bg-white/80 dark:bg-[#1F1F1F] backdrop-blur-xl border-white/20 dark:border-gray-800 shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-[#002E5D] dark:text-gray-100 flex items-center justify-between">
                                    <span className="text-lg truncate">{it.title}</span>
                                    <Badge variant={expired ? "destructive" : "default"} className={!expired ? "bg-green-500" : ""}>
                                        {statusText}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                        <span>{formatDate(it.date)} • {formatTime(it.start)}</span>
                                    </div>
                                    {it.location && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                            <span>{it.location}</span>
                                        </div>
                                    )}
                                    {it.qr && (
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            Expira: {new Date(it.qr.fecha_expiracion).toLocaleString()}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-[#002E5D] text-[#002E5D] dark:border-blue-300 dark:text-blue-300 rounded-2xl"
                                        disabled={!it.qr || expired}
                                        onClick={() => handleShow(it)}
                                    >
                                        <QrCode className="w-4 h-4 mr-2" />
                                        Mostrar QR
                                    </Button>
                                    <Button
                                        className="flex-1 rounded-2xl"
                                        onClick={() => handleGenerate(it)}
                                        disabled={generating}
                                    >
                                        {generating ? "Generando…" : "Generar QR"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {sorted.length === 0 && (
                <div className="text-center py-12">
                    <QrCode className="w-24 h-24 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No tienes códigos QR</h3>
                    <p className="text-gray-500 dark:text-gray-400">Inscríbete a actividades para generar tus códigos QR</p>
                </div>
            )}

            {/* Modal con la imagen QR */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{activeQR?.title ?? "Código QR"}</DialogTitle>
                    </DialogHeader>

                    <div className="flex justify-center py-4">
                        {activeQR?.dataURL ? (
                            <img
                                src={activeQR.dataURL}
                                alt="QR"
                                className="w-56 h-56 rounded-lg border"
                            />
                        ) : (
                            <div className="text-sm text-gray-500">Generando QR…</div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

