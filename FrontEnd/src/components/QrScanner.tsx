import { useEffect, useRef } from "react"
import QrScanner from "qr-scanner"
import { createAsistencia } from "../services/apiAsistencia"
import type { Asistencia } from "../types/asistencia"

interface CustomQrScannerProps {
    onSuccess?: () => void
    onError?: (error: string) => void
}

const CustomQrScanner: React.FC<CustomQrScannerProps> = ({ onSuccess, onError }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const scannerRef = useRef<QrScanner | null>(null)

    useEffect(() => {
        if (!videoRef.current) return

        const scanner = new QrScanner(
            videoRef.current,
            async (result) => {
                try {
                    const asistencia = JSON.parse(atob(result.data)) as Asistencia
                    await createAsistencia(asistencia)
                    if (scanner) {
                        scanner.stop().catch((e) => console.warn("Error al detener escáner:", e))
                    }
                    onSuccess?.()
                } catch (err) {
                    console.error("Error al registrar asistencia:", err)
                    onError?.("QR inválido o datos corruptos")
                }
            },
            {
                highlightScanRegion: true,
                returnDetailedScanResult: true,
            }
        )

        scannerRef.current = scanner

        scanner.start().catch((err) => {
            console.error("No se pudo iniciar el escáner:", err)
            onError?.("No se pudo acceder a la cámara")
        })

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch((e) => console.warn("Error al detener escáner:", e))
            }
        }
    }, [])

    return <video ref={videoRef} className="w-full max-w-md rounded-md border" />
}

export default CustomQrScanner

