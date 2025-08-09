import { useRef, useState } from "react"
import QrScanner from "react-qr-barcode-scanner"
import { toast } from "sonner"
import { createAsistencia } from "@/services/adminServices/apiAsistencia"
import type { Asistencia } from "@/types/adminTypes/asistencia"
import { CheckCircle } from "lucide-react"

type ScanInfo = { kind: "actividad" | "conferencia"; id: number }

function QRScanner({ onScanSuccess }: { onScanSuccess?: (info?: ScanInfo) => void }) {
    const [, setScanning] = useState(true)
    const lastScannedRef = useRef<string | null>(null)
    const busyRef = useRef(false)
    const [justRegistered, setJustRegistered] = useState<ScanInfo | null>(null)

    const handleScan = async (data: string | null) => {
        if (!data) return
        if (data === lastScannedRef.current) return
        if (busyRef.current) return

        lastScannedRef.current = data
        busyRef.current = true
        setScanning(false)

        try {
            const parsed = JSON.parse(data)

            const id_alumno = Number(parsed?.id_alumno)
            const id_actividad =
                parsed?.id_actividad != null && parsed.id_actividad !== ""
                    ? Number(parsed.id_actividad)
                    : undefined
            const id_conferencia =
                parsed?.id_conferencia != null && parsed.id_conferencia !== ""
                    ? Number(parsed.id_conferencia)
                    : undefined

            // XOR: exactamente uno de los dos
            if (!id_alumno || (!!id_actividad === !!id_conferencia)) {
                throw new Error("Contenido del QR inválido")
            }

            const payload: Asistencia = {
                id_alumno,
                id_actividad,
                id_conferencia,
                fecha_asistencia: new Date().toISOString(),
            }

            const resp = await createAsistencia(payload)
            // resp: { message: "Registrado", id_asistencia, id_alumno, id_actividad|null, id_conferencia|null, fecha_asistencia }
            toast.success(resp?.message ?? "Registrado")

            const info: ScanInfo = {
                kind: resp?.id_actividad ? "actividad" : "conferencia",
                id: resp?.id_actividad ?? resp?.id_conferencia,
            }
            setJustRegistered(info)
            onScanSuccess?.(info)
        } catch (error: any) {
            const msg = error?.response?.data?.error ?? error?.message ?? "QR inválido o asistencia fallida"
            toast.error(msg)
            console.error("[QRScanner] Error:", error?.response?.data ?? error)
        } finally {
            setTimeout(() => {
                lastScannedRef.current = null
                busyRef.current = false
                setScanning(true)
                setJustRegistered(null)
            }, 1500)
        }
    }

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <div className="rounded-lg overflow-hidden border aspect-[4/4]">
                <QrScanner
                    onUpdate={(err, result) => {
                        if (result) handleScan(result.getText())
                        if (err) console.warn(err)
                    }}
                    facingMode="environment"
                />
            </div>

            {/* Pill azul “Registrado” al pie del scanner */}
            {justRegistered && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs shadow">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Registrado
                    </span>
                </div>
            )}
        </div>
    )
}

export default QRScanner

